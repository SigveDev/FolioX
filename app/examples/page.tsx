import LandingPageHeader from "@/components/landingpage/header";
import LandingPageFooter from "@/components/landingpage/footer";
import ExamplesViewer from "./examples-viewer";

export default function ExamplesPage() {
  // Data and categories are static, so can be defined here
  const examples = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "UX Designer",
      domain: "sarahchen.foliox.app",
      image: "/placeholder.svg?height=300&width=400",
      category: "UX Design",
      views: "2.1k",
      likes: 89,
      plan: "pro",
      featured: true,
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      title: "Frontend Developer",
      domain: "marcus.foliox.app",
      image: "/placeholder.svg?height=300&width=400",
      category: "Development",
      views: "1.8k",
      likes: 67,
      plan: "free",
    },
    {
      id: 3,
      name: "Emily Watson",
      title: "Brand Designer",
      domain: "emilywatson.foliox.app",
      image: "/placeholder.svg?height=300&width=400",
      category: "Branding",
      views: "3.2k",
      likes: 124,
      plan: "pro",
    },
    {
      id: 4,
      name: "David Kim",
      title: "Product Designer",
      domain: "davidkim.foliox.app",
      image: "/placeholder.svg?height=300&width=400",
      category: "Product Design",
      views: "1.5k",
      likes: 45,
      plan: "free",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      title: "Graphic Designer",
      domain: "lisathompson.foliox.app",
      image: "/placeholder.svg?height=300&width=400",
      category: "Graphic Design",
      views: "2.7k",
      likes: 98,
      plan: "pro",
    },
    {
      id: 6,
      name: "Alex Johnson",
      title: "Web Developer",
      domain: "alexjohnson.foliox.app",
      image: "/placeholder.svg?height=300&width=400",
      category: "Development",
      views: "1.9k",
      likes: 56,
      plan: "free",
    },
  ];

  const categories = [
    "All",
    "UX Design",
    "Development",
    "Branding",
    "Product Design",
    "Graphic Design",
  ];

  return (
    <div className="min-h-screen bg-background">
      <LandingPageHeader activeSection="examples" />
      <div className="container py-16 mx-auto px-8">
        <ExamplesViewer examples={examples} categories={categories} />
      </div>
      <LandingPageFooter />
    </div>
  );
}
