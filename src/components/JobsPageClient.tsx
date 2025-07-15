"use client";

import { useState, useMemo } from "react";
import { Job } from "@/lib/google-sheets";
import JobsCard from "@/components/JobsCard";
import JobSidebar from "@/components/Sidebar";
import { JOB_CARD_COLORS } from '@/lib/job-card-colors';

export default function JobsPageClient({ jobs }: { jobs: Job[] }) {
  // Assign a random color to each job
  const jobsWithColors = useMemo(() => {
    return jobs.map(job => ({
      ...job,
      color: JOB_CARD_COLORS[Math.floor(Math.random() * JOB_CARD_COLORS.length)],
    }));
  }, [jobs]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  const handleTagChange = (tag: string, checked: boolean) => {
    setSelectedTags((prev) =>
      checked ? [...prev, tag] : prev.filter((t) => t !== tag)
    );
  };

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

  return (
    <div className="flex min-h-screen w-full bg-[#f6f7fb]">
      <JobSidebar
        tags={allTags}
        selectedTags={selectedTags}
        onTagChange={handleTagChange}
      />
      <main className="flex-1 p-6 md:p-10">
        <div className="text-2xl font-bold mb-8">Recommended jobs</div>
        <div className="w-full">
          <JobsCard jobs={filteredJobs} />
        </div>
      </main>
    </div>
  );
} 