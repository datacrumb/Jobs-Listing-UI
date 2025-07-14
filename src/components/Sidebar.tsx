"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const workingSchedules = [
    { id: 1, name: "Full time" },
    { id: 2, name: "Part time" },
    { id: 3, name: "Internship" },
    { id: 4, name: "Project work" },
    { id: 5, name: "Volunteering" },
];

const employmentTypes = [
    { id: 1, name: "Full day" },
    { id: 2, name: "Flexible schedule" },
    { id: 3, name: "Shift work" },
    { id: 4, name: "Shift method" },
];

export default function JobSidebar() {
    return (
        <Sidebar collapsible="icon" className="w-[320px] bg-white border-r border-gray-200 p-6 flex flex-col gap-8">
            <SidebarContent>
                {/* Promo Card */}
                <Card className="rounded-xl p-6 flex flex-col items-center text-center bg-black text-white">
                    <div className="mb-4 w-full h-32 bg-[url('/public/file.svg')] bg-cover rounded-lg" />
                    <h2 className="text-xl font-bold mb-2">Get Your best profession with LuckyJob</h2>
                    <Button className="bg-[#7dd3fc] hover:bg-[#7dd3fc]/80 text-black font-semibold rounded-full px-6 py-2 mt-2">Learn more</Button>
                </Card>
                {/* Filters */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Filters</h3>
                    <div className="mb-4">
                        <div className="font-medium mb-2">Working schedule</div>
                        <div className="flex flex-col gap-2">
                            {workingSchedules.map((schedule) => (
                                <label key={schedule.id} className="flex items-center gap-2">
                                    <Checkbox />
                                    <span>{schedule.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="font-medium mb-2">Employment type</div>
                        <div className="flex flex-col gap-2">
                            {employmentTypes.map((type) => (
                                <label key={type.id} className="flex items-center gap-2">
                                    <Checkbox />
                                    <span>{type.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </SidebarContent>
        </Sidebar>
    );
}