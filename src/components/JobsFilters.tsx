'use client'

import React from 'react'
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Briefcase, Calendar } from "lucide-react";
import { useState } from "react";

const jobTypes = ["Designer", "Developer", "Manager"];
const locations = ["Remote", "On-site", "Hybrid"];
const experiences = ["Junior", "Middle", "Senior"];
const periods = ["Per month", "Per year"];

const JobsFilters = () => {
    const [salary, setSalary] = useState([1200, 20000]);
    const [jobType, setJobType] = useState(jobTypes[0]);
    const [location, setLocation] = useState(locations[0]);
    const [experience, setExperience] = useState(experiences[0]);
    const [period, setPeriod] = useState(periods[0]);

    return (
        <Card className="mb-8 bg-[#18191c] border-0 shadow-none rounded-2xl px-6 py-4 flex flex-col md:flex-row items-center gap-4 md:gap-0 md:justify-between">
            <div className="flex flex-1 flex-col md:flex-row items-center gap-4 md:gap-0 md:divide-x md:divide-gray-700">
                {/* Job Type */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-white flex items-center gap-2 px-6 focus:outline-none">
                            <Search className="w-5 h-5" />
                            <span className="font-semibold">{jobType}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {jobTypes.map((type) => (
                            <DropdownMenuItem key={type} onClick={() => setJobType(type)}>{type}</DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* Location */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-white flex items-center gap-2 px-6 focus:outline-none">
                            <MapPin className="w-5 h-5" />
                            <span className="font-normal">Work Location</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {locations.map((loc) => (
                            <DropdownMenuItem key={loc} onClick={() => setLocation(loc)}>{loc}</DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* Experience */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-white flex items-center gap-2 px-6 focus:outline-none">
                            <Briefcase className="w-5 h-5" />
                            <span className="font-normal">Experience</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {experiences.map((exp) => (
                            <DropdownMenuItem key={exp} onClick={() => setExperience(exp)}>{exp}</DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* Period */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-white flex items-center gap-2 px-6 focus:outline-none">
                            <Calendar className="w-5 h-5" />
                            <span className="font-normal">{period}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {periods.map((p) => (
                            <DropdownMenuItem key={p} onClick={() => setPeriod(p)}>{p}</DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {/* Salary Range */}
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 min-w-[260px] md:pl-6 w-full md:w-auto">
                <span className="text-white text-sm font-normal whitespace-nowrap">Salary range</span>
                <div className="flex flex-col items-end w-full">
                    <Slider
                        min={1200}
                        max={20000}
                        step={100}
                        value={salary}
                        onValueChange={setSalary}
                        className="w-full md:w-48 rounded-full"
                    />
                    <div className="text-xs text-white mt-1">${salary[0].toLocaleString()} - ${salary[1].toLocaleString()}</div>
                </div>
            </div>
        </Card>
    )
}

export default JobsFilters