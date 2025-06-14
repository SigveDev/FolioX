import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const QuickStats = ({
  projectLength,
  viewCount,
  likes,
  pro,
  loading,
}: {
  projectLength: number;
  viewCount: number;
  likes: number;
  pro: boolean;
  loading: boolean;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Projects</span>
          <span className="font-semibold">
            {loading ? (
              <Skeleton className="h-4 w-8" />
            ) : (
              <>
                {projectLength}/{pro ? "Unlimited" : 2}
              </>
            )}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Views</span>
          <span className="font-semibold">
            {loading ? <Skeleton className="h-4 w-12" /> : viewCount}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Likes</span>
          <span className="font-semibold">
            {loading ? <Skeleton className="h-4 w-10" /> : `${likes}`}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStats;
