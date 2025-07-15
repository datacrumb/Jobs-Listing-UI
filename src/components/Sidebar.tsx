"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type JobSidebarProps = {
  tags: string[];
  selectedTags: string[];
  onTagChange: (tag: string, checked: boolean) => void;
  selectedCities: string[];
  onCityChange: (city: string, checked: boolean) => void;
  availableCities: string[];
};

const FILTER_TAGS = ["Full-Time", "Fresher", "On-site", "Entry-Level", "Part-Time"];

export default function JobSidebar({ tags, selectedTags, onTagChange, selectedCities, onCityChange, availableCities }: JobSidebarProps) {
    // Only show the specified filter tags
    const filteredTags = FILTER_TAGS.filter(tag => tags.includes(tag));
    return (
        <Sidebar className="bg-white border-r border-gray-200 p-6 flex flex-col gap-8">
            <SidebarContent>
                {/* Promo Card */}
                <Card className="rounded-xl p-6 flex flex-col items-center text-center bg-black text-white">
                    <div className="mb-4 w-full h-auto bg-cover rounded-lg" />
                    <h2 className="text-xl font-bold mb-2">Get Your best profession with LuckyJob</h2>
                    <Button className="bg-[#7dd3fc] hover:bg-[#7dd3fc]/80 text-black font-semibold rounded-full px-6 py-2 mt-2">Learn more</Button>
                </Card>
                {/* Filters */}
                <div>
                    <h3 className="text-lg font-semibold">Filter by Tags</h3>
                    <div className="mb-4">
                        <SidebarGroup className="flex flex-col gap-2">
                            <SidebarGroupLabel className="font-medium">Job Tags</SidebarGroupLabel>
                            {filteredTags.map((tag) => (
                                <label key={tag} className="flex items-center gap-2">
                                    <Checkbox
                                        checked={selectedTags.includes(tag)}
                                        onCheckedChange={(checked) => {
                                            onTagChange(tag, !!checked);
                                        }}
                                    />
                                    <span>{tag}</span>
                                </label>
                            ))}
                        </SidebarGroup>
                        <SidebarGroup className="flex flex-col gap-2">
                            <SidebarGroupLabel className="font-medium">Cities</SidebarGroupLabel>
                            {availableCities.map((city) => (
                                <label key={city} className="flex items-center gap-2">
                                    <Checkbox
                                        checked={selectedCities.includes(city)}
                                        onCheckedChange={(checked) => {
                                            onCityChange(city, !!checked);
                                        }}
                                    />
                                    <span>{city.charAt(0).toUpperCase() + city.slice(1)}</span>
                                </label>
                            ))}
                        </SidebarGroup>
                    </div>
                </div>
            </SidebarContent>
        </Sidebar>
    );
}