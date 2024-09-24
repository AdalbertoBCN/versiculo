import { Skeleton } from "@/components/ui/skeleton";

export default function TextSkeleton() {
  return (
    <div className="">
      <div className="mb-4 text-lg">
        
        <div className="flex gap-2 mb-2">
          <Skeleton className="h-5 w-1/6" />
          <Skeleton className="h-5 w-1/6" />
          <Skeleton className="h-5 w-1/6" />
        </div>

        <Skeleton className="h-5 w-1/6" />

        <Skeleton className="h-5 w-1/6" />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <p className="flex flex-wrap items-start gap-2">
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
          </p>
        </div>

        <div className="space-y-2">
          <p className="flex flex-wrap items-start gap-2">
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
          </p>
        </div>

        <div className="space-y-2">
          <p className="flex flex-wrap items-start gap-2">
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
            <Skeleton className="h-5 w-1/6" />
          </p>
        </div>
      </div>
    </div>
  );
}
