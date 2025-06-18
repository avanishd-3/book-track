import { SkeletonCard } from "@/components/skeleton-card";

export default function Loading() {
    return (
        <div className="max-w-2xl mx-auto mt-8">
            {/* Display books in the user's library */}
            <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto px-6">
                <SkeletonCard />
            </div>
        </div>
    )
}