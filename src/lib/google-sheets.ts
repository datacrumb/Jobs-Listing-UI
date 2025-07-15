import { google } from 'googleapis';

const SHEET_NAME = 'Sheet1';

export interface Job {
    title?: string;
    company?: string;
    location?: string;
    link?: string;
    salary?: string;
    tags?: string; // This will be a comma-separated string from Google Sheets
    description?: string;
    color?: string;
}

async function createGoogleSheetsClient() {
  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID } = process.env;

  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
    throw new Error('Missing required environment variables');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();

  const sheets = google.sheets({
    version: 'v4',
    auth: authClient as any,
  });

  return { sheets, sheetId: GOOGLE_SHEET_ID };
}

export async function fetchJobsFromSheet(): Promise<Job[]> {
  const { sheets, sheetId } = await createGoogleSheetsClient();

  const getRes = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${SHEET_NAME}!A1:Z`,
  });

  const values = getRes.data.values || [];
  if (values.length < 2) {
    // No data or only headers
    return [];
  }

  const headers = values[0].map((h: string) => h.trim().toLowerCase());
  const jobs: Job[] = values.slice(1).map((row) => {
    const job: any = {};
    headers.forEach((header, i) => {
      job[header] = row[i] || '';
    });
    return job;
  });

  return jobs;
}