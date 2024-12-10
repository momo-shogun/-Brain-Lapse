import { TypeIcon } from "@/components/custom/TypeIcon";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2, Trash2 } from "lucide-react";

function ContentLayout({ data }: { data?: CardProps[] }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mx-10">
      {data.map((content, index) => (
        <Card
          link={content.link}
          type={content.type}
          tag={content.tag}
          title={content.title}
          createdAt={content.createdAt}
        />
      ))}
    </div>
  );
}

<Card key={index}>
  <CardHeader className="">
    <div className="">
      <TypeIcon type={content.type} />
      <CardTitle>{content.title}</CardTitle>
    </div>
    <div className="">
      <Button size="icon">
        <Share2 />
      </Button>
      <Button size="icon">
        <Trash2 />
      </Button>
    </div>
  </CardHeader>
  <CardContent>
    <p></p>
  </CardContent>
</Card>;
