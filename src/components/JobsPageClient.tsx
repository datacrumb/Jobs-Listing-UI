"use client";

import { useState, useMemo, useEffect } from "react";
import { Job } from "@/lib/google-sheets";
import JobsCard from "@/components/JobsCard";
import JobSidebar from "@/components/Sidebar";
import { JOB_CARD_COLORS } from "@/lib/job-card-colors";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Bookmark } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function JobsPageClient({ jobs }: { jobs: Job[] }) {
  // Assign a color to each job deterministically
  const jobsWithColors = useMemo(() => {
    return jobs.map((job, idx) => ({
      ...job,
      color: JOB_CARD_COLORS[idx % JOB_CARD_COLORS.length],
    }));
  }, [jobs]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Unique key for a job
  const getJobKey = (job: Job) => `${job.company}__${job.title}__${job.location}`;

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedJobs');
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  // Save bookmarks to localStorage when changed
  useEffect(() => {
    localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleTagChange = (tag: string, checked: boolean) => {
    setSelectedTags((prev) =>
      checked ? [...prev, tag] : prev.filter((t) => t !== tag)
    );
  };

  const onToggleBookmark = (job: Job) => {
    const key = getJobKey(job);
    setBookmarks((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    jobsWithColors.forEach((job) => {
      (job.tags || '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
        .forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [jobsWithColors]);

  const filteredJobs = useMemo(() => {
    if (selectedTags.length === 0) {
      return jobsWithColors;
    }
    return jobsWithColors.filter((job) =>
      (job.tags || '')
        .split(',')
        .map((t) => t.trim())
        .some((tag) => selectedTags.includes(tag))
    );
  }, [jobsWithColors, selectedTags]);

  // Get bookmarked jobs
  const bookmarkedJobs = useMemo(() => {
    return jobsWithColors.filter((job) => bookmarks.includes(getJobKey(job)));
  }, [jobsWithColors, bookmarks]);

  return (
    <div className="flex min-h-screen w-full bg-[#f6f7fb]">
      <JobSidebar
        tags={allTags}
        selectedTags={selectedTags}
        onTagChange={handleTagChange}
      />
      <main className="flex-1 p-6 md:p-10">
        <div className="flex items-center justify-between mb-8">
          <div className="text-2xl font-bold">Recommended jobs</div>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900">
                <Bookmark size={20} fill={bookmarks.length > 0 ? 'currentColor' : 'none'} />
                Bookmarks
                {bookmarks.length > 0 && (
                  <span className="ml-2 bg-white text-black rounded-full px-2 py-0.5 text-xs font-bold">{bookmarks.length}</span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-md">
              <div className="text-xl font-bold mb-4">Bookmarked Jobs</div>
              {bookmarkedJobs.length === 0 ? (
                <div className="text-gray-500">No bookmarks yet.</div>
              ) : (
                <ScrollArea className="h-[80vh] pr-2">
                  <JobsCard jobs={bookmarkedJobs} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} columns={1} />
                </ScrollArea>
              )}
            </SheetContent>
          </Sheet>
        </div>
        <div className="w-full">
          <JobsCard jobs={filteredJobs} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} />
        </div>
      </main>
    </div>
  );
} 