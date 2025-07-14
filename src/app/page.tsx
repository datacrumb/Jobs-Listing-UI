import JobsCard from "@/components/JobsCard";
import JobsFilters from "@/components/JobsFilters";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full bg-[#f6f7fb]">
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {/* Top bar and job cards will go here */}
        <JobsFilters />
        <div className="text-2xl font-bold mb-8">Recommended jobs</div>
        <div className="w-full">
          <JobsCard />
        </div>
      </main>
    </div>
  );
}
