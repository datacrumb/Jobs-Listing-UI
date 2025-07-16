'use client'

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";
import { Job } from "@/lib/google-sheets";
import Link from "next/link";

type JobsCardProps = {
    jobs: Job[];
    bookmarks: string[];
    onToggleBookmark: (job: Job) => void;
    columns?: number;
};

export default function JobsCard({ jobs, bookmarks, onToggleBookmark, columns = 4 }: JobsCardProps) {
    const [page, setPage] = useState(1);

    // Unique key for a job
    const getJobKey = (job: Job) => `${job.company}__${job.title}__${job.location}`;

    const JOBS_PER_PAGE = 16;
    const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
    const paginatedJobs = jobs.slice((page - 1) * JOBS_PER_PAGE, page * JOBS_PER_PAGE);

    // Determine grid class
    const gridClass = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full`;
    const sheetGridClass = `grid grid-cols-1 gap-6 w-full`;

    // Helper to generate page numbers (show up to 5 pages, with current in the middle if possible)
    const getPageNumbers = () => {
        const pages = [];
        let start = Math.max(1, page - 2);
        let end = Math.min(totalPages, page + 2);
        if (end - start < 4) {
            if (start === 1) {
                end = Math.min(totalPages, start + 4);
            } else if (end === totalPages) {
                start = Math.max(1, end - 4);
            }
        }
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className={columns === 1 ? sheetGridClass : gridClass}>
                {paginatedJobs.map((job, idx) => {
                    const jobKey = getJobKey(job);
                    const isBookmarked = bookmarks.includes(jobKey);
                    return (
                        <Card key={idx} className="relative rounded-2xl shadow-sm border border-gray-200 bg-white p-2">
                            <CardContent className={`rounded-2xl px-2 py-4 mt-0 mb-0 h-[200px] md:h-[280px] flex flex-col justify-between`} style={{ backgroundColor: job.color }}>
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    {/* Company name */}
                                    <span className="text-sm font-medium text-gray-700">{job.company}</span>
                                    {/* Save/Bookmark icon */}
                                    <button
                                        className={`ml-2 ${isBookmarked ? 'text-black' : 'text-gray-400'} hover:text-black bg-white p-2 rounded-full`}
                                        onClick={() => onToggleBookmark(job)}
                                        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                                    >
                                        <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
                                    </button>
                                </div>
                                {/* Job Title */}
                                <div className="text-lg md:text-xl lg:text-2xl font-bold mb-3 text-gray-900 leading-tight">
                                    {job.title}
                                </div>
                                {/* Tags */}
                                {job.tags && job.tags.split(',').map(tag => tag.trim()).filter(Boolean).length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-2 pr-1">
                                        {job.tags
                                            .split(",")
                                            .slice(0, 3)
                                            .map((tag, i) => tag.trim())
                                            .filter(Boolean)
                                            .map((tag, i) => (
                                                <Badge
                                                    key={i}
                                                    className={`rounded-full bg-[${job.color}] text-black font-medium px-3 py-1 text-xs border border-gray-400 py-2 truncate max-w-[100px]`}
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="bg-white rounded-b-2xl flex items-center justify-between pb-4">
                                <div>
                                    <div className="text-xs text-gray-500">{job.location}</div>
                                </div>
                                <Button asChild className="rounded-full px-6 py-2 text-base font-semibold bg-black text-white hover:bg-gray-900">
                                    <Link href={job?.link || '#'} target="_blank">Apply</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-8 w-full">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={e => { e.preventDefault(); setPage(p => Math.max(1, p - 1)); }}
                                aria-disabled={page === 1}
                                className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                        {getPageNumbers().map((pageNum) => (
                            <PaginationItem key={pageNum}>
                                <PaginationLink
                                    href="#"
                                    isActive={pageNum === page}
                                    onClick={e => { e.preventDefault(); setPage(pageNum); }}
                                >
                                    {pageNum}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={e => { e.preventDefault(); setPage(p => Math.min(totalPages, p + 1)); }}
                                aria-disabled={page === totalPages}
                                className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
