"use client";

import { useState, useMemo, useEffect } from "react";
import { Job } from "@/lib/google-sheets";
import JobsCard from "@/components/JobsCard";
import JobSidebar from "@/components/Sidebar";
import { JOB_CARD_COLORS } from "@/lib/job-card-colors";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Bookmark } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Fuse from "fuse.js";
import { Input } from "./ui/input";

const CITY_LIST = ["karachi", "lahore", "islamabad", "peshawar", "quetta"];

// Helper to get a unique key for a job
const getJobKey = (job: Job) => `${job.company}__${job.title}__${job.location}`;

export default function JobsPageClient({ jobs }: { jobs: Job[] }) {
  // Remove duplicate jobs by unique key
  const dedupedJobs = useMemo(() => {
    const seen = new Set<string>();
    return jobs.filter(job => {
      const key = getJobKey(job);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [jobs]);

  // Assign a color to each job deterministically
  const jobsWithColors = useMemo(() => {
    return dedupedJobs.map((job, idx) => ({
      ...job,
      color: JOB_CARD_COLORS[idx % JOB_CARD_COLORS.length],
    }));
  }, [dedupedJobs]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fuse.js setup for fuzzy search
  const fuse = useMemo(() => new Fuse(jobsWithColors, {
    keys: ["title", "company", "tags"],
    threshold: 0.4,
  }), [jobsWithColors]);

  // Fuzzy search jobs
  const searchedJobs = useMemo(() => {
    if (!searchTerm.trim()) return jobsWithColors;
    return fuse.search(searchTerm).map(result => result.item);
  }, [searchTerm, fuse, jobsWithColors]);

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

  const handleCityChange = (city: string, checked: boolean) => {
    setSelectedCities((prev) =>
      checked ? [...prev, city] : prev.filter((c) => c !== city)
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

  // Extract available cities from tags
  const availableCities = useMemo(() => {
    const tagSet = new Set<string>();
    jobsWithColors.forEach((job) => {
      (job.tags || '')
        .split(',')
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)
        .forEach((tag) => tagSet.add(tag));
    });
    return CITY_LIST.filter(city => tagSet.has(city));
  }, [jobsWithColors]);

  // Filter jobs by search, tags, and cities
  const filteredJobs = useMemo(() => {
    return searchedJobs.filter((job) => {
      // Tag filter
      const tagMatch =
        selectedTags.length === 0 ||
        (job.tags || "")
          .split(",")
          .map((t) => t.trim())
          .some((tag) => selectedTags.includes(tag));
      // City filter
      const cityMatch =
        selectedCities.length === 0 ||
        (job.tags || "")
          .split(",")
          .map((t) => t.trim().toLowerCase())
          .some((tag) => selectedCities.includes(tag));
      return tagMatch && cityMatch;
    });
  }, [searchedJobs, selectedTags, selectedCities]);

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
        selectedCities={selectedCities}
        onCityChange={handleCityChange}
        availableCities={availableCities}
      />
      <main className="flex-1 p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
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
              <SheetTitle>Bookmarked Jobs</SheetTitle>
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
        <Input
          type="text"
          placeholder="Search jobs…"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="mb-4 w-full max-w-md px-4 py-2 border rounded-full"
        />
        <div className="w-full">
          <JobsCard jobs={filteredJobs} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} />
        </div>
      </main>
    </div>
  );
} 