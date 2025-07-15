import { fetchJobsFromSheet } from "@/lib/google-sheets";
import JobsPageClient from "@/components/JobsPageClient";

export const revalidate = 60;

export default async function Home() {
  const jobs = await fetchJobsFromSheet();
  return <JobsPageClient jobs={jobs} />;
}
