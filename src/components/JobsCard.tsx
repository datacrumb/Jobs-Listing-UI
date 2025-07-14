import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Bookmark } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";

const jobs = [
    // 16 static jobs, varied
    { date: "20 May, 2023", company: "Amazon", logo: "/logo/amazon.png", title: "Senior UI/UX Designer", tags: ["Part time", "Senior level", "Distant", "Project work"], rate: "$250/hr", location: "San Francisco, CA", color: "bg-[#fde7d2]" },
    { date: "4 Feb, 2023", company: "Google", logo: "/logo/amazon.png", title: "Junior UI/UX Designer", tags: ["Full time", "Junior level", "Distant", "Project work", "Flexible Schedule"], rate: "$150/hr", location: "California, CA", color: "bg-[#d2f7ee]" },
    { date: "29 Jan, 2023", company: "Dribbble", logo: "/logo/amazon.png", title: "Senior Motion Designer", tags: ["Part time", "Senior level", "Full Day", "Shift work"], rate: "$260/hr", location: "New York, NY", color: "bg-[#e6d2f7]" },
    { date: "11 Apr, 2023", company: "Twitter", logo: "/logo/amazon.png", title: "UX Designer", tags: ["Full time", "Middle level", "Distant", "Project work"], rate: "$120/hr", location: "California, CA", color: "bg-[#d2e7f7]" },
    { date: "2 Apr, 2023", company: "Airbnb", logo: "/logo/amazon.png", title: "Graphic Designer", tags: ["Part time", "Senior level"], rate: "$300/hr", location: "New York, NY", color: "bg-[#f7d2e7]" },
    { date: "18 Jan, 2023", company: "Apple", logo: "/logo/amazon.png", title: "Graphic Designer", tags: ["Part time", "Distant"], rate: "$140/hr", location: "San Francisco, CA", color: "bg-[#fde7d2]" },
    { date: "10 Mar, 2023", company: "Meta", logo: "/logo/amazon.png", title: "Product Designer", tags: ["Full time", "Senior level", "Remote"], rate: "$220/hr", location: "Austin, TX", color: "bg-[#e0f7fa]" },
    { date: "5 May, 2023", company: "Netflix", logo: "/logo/amazon.png", title: "Visual Designer", tags: ["Part time", "Middle level"], rate: "$180/hr", location: "Los Angeles, CA", color: "bg-[#ffe0b2]" },
    { date: "12 Feb, 2023", company: "Spotify", logo: "/logo/amazon.png", title: "Interaction Designer", tags: ["Full time", "Junior level"], rate: "$160/hr", location: "Seattle, WA", color: "bg-[#f3e5f5]" },
    { date: "8 Mar, 2023", company: "Slack", logo: "/logo/amazon.png", title: "Brand Designer", tags: ["Part time", "Remote"], rate: "$210/hr", location: "Remote", color: "bg-[#e1bee7]" },
    { date: "15 Apr, 2023", company: "Uber", logo: "/logo/amazon.png", title: "UI Designer", tags: ["Full time", "Senior level"], rate: "$230/hr", location: "Chicago, IL", color: "bg-[#b2dfdb]" },
    { date: "22 May, 2023", company: "Microsoft", logo: "/logo/amazon.png", title: "UX Researcher", tags: ["Part time", "Research"], rate: "$170/hr", location: "Redmond, WA", color: "bg-[#c8e6c9]" },
    { date: "30 Mar, 2023", company: "Tesla", logo: "/logo/amazon.png", title: "Motion Designer", tags: ["Full time", "Remote"], rate: "$240/hr", location: "Palo Alto, CA", color: "bg-[#fff9c4]" },
    { date: "7 Feb, 2023", company: "Adobe", logo: "/logo/amazon.png", title: "Creative Director", tags: ["Senior level", "Full Day"], rate: "$350/hr", location: "San Jose, CA", color: "bg-[#ffe082]" },
    { date: "19 Jan, 2023", company: "Dropbox", logo: "/logo/amazon.png", title: "Content Designer", tags: ["Part time", "Content"], rate: "$130/hr", location: "Remote", color: "bg-[#b3e5fc]" },
    { date: "25 Apr, 2023", company: "Figma", logo: "/logo/amazon.png", title: "Design Engineer", tags: ["Full time", "Engineering"], rate: "$260/hr", location: "Remote", color: "bg-[#dcedc8]" },
];

export default function JobsCard() {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                {jobs.map((job, idx) => (
                    <Card key={idx} className="relative rounded-2xl shadow-sm border border-gray-200 bg-white p-2">
                        <CardContent className={`rounded-2xl ${job.color} px-6 py-4 mt-0 mb-0 h-[300px] flex flex-col justify-between`}>
                            {/* Save/Bookmark icon */}
                            <button className="absolute top-4 right-4 text-gray-400 hover:text-black bg-white p-2 rounded-full">
                                <Bookmark size={20} />
                            </button>
                            {/* Date */}
                            <div className="text-xs font-semibold bg-white rounded-full px-3 py-1 w-fit mb-3">
                                {job.date}
                            </div>
                            {/* Company logo and name */}
                            <div className="flex items-center gap-2 mb-2">
                                <Avatar className="w-7 h-7">
                                    <AvatarImage src={job.logo} alt={job.company} />
                                </Avatar>
                                <span className="text-sm font-medium text-gray-700">{job.company}</span>
                            </div>
                            {/* Job Title */}
                            <div className="text-2xl font-bold mb-3 text-gray-900 leading-tight">
                                {job.title}
                            </div>
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-2">
                                {job.tags.map((tag, i) => (
                                    <Badge
                                        key={i}
                                        className={`rounded-full ${job.color} text-gray-700 font-medium px-3 py-1 text-xs border border-gray-400 py-2`}
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="bg-white rounded-b-2xl flex items-center justify-between pb-4">
                            <div>
                                <div className="text-base font-bold text-gray-900">{job.rate}</div>
                                <div className="text-xs text-gray-500">{job.location}</div>
                            </div>
                            <Button className="rounded-full px-6 py-2 text-base font-semibold bg-black text-white hover:bg-gray-900">
                                Details
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className="flex justify-center mt-8 w-full">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">4</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
