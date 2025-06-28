import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QuickStats = async ({
  projectLength,
  viewCount,
  likes,
  pro,
}: {
  projectLength: number;
  viewCount: number;
  likes: number;
  pro: boolean;
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
            {projectLength}/{pro ? "Unlimited" : 2}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Views</span>
          <span className="font-semibold">{viewCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Likes</span>
          <span className="font-semibold">{likes}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStats;
