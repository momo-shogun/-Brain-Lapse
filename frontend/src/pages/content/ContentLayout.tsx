import { TypeIcon } from "@/components/custom/TypeIcon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Share2, Trash2 } from "lucide-react";

export interface contentProps {
  link?: string;
  type: "video" | "tweet" | "document" | "image";
  title: string;
  tag?: string[];
  description?: string;
  createdAt: string;
}
import { formatDate, URl } from "@/lib/utils";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Key, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TwitterTweetEmbed } from "react-twitter-embed";

function ContentLayout() {
  const [contentData, setContentData] = useState<contentProps[]>();
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["getContent"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      const response = await axios.get(`${URl}/content`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      return response.data.content;
    },
  });

  useEffect(() => {
    if (query.isSuccess) {
      console.log(query.data);
      setContentData(query.data);
    }
  }, [query.isSuccess, query.data]); // Re-run effect only when these values change

  if (query.isError) {
    console.error("Error during fetching:", query.error);
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:mx-10 mx-4">
        {contentData?.map(
          (content: contentProps, index: Key | null | undefined) => (
            <Card key={index} className="">
              <CardHeader className="py-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <TypeIcon type={content.type} />
                    <CardTitle>{content.title}</CardTitle>
                  </div>
                  <div className="flex">
                    <Button size="icon" variant={"ghost"}>
                      <Share2 />
                    </Button>
                    <Button size="icon" variant={"ghost"}>
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  {content.link && content.type === "video" ? (
                    <iframe
                      width="100%"
                      src={`https://www.youtube.com/embed/${content.link}`}
                    ></iframe>
                  ) : null}
                </p>
                <p>
                  {content.link && content.type === "tweet" ? (
                    <TwitterTweetEmbed tweetId={content.link} />
                  ) : null}
                </p>
                <p>
                  {content.link && content.type === "image" ? (
                    <img
                    src={content.link}
                    alt=""
                    className="aspect-square w-full rounded-lg object-cover"
                  />
                  ) : null}
                </p>
                <p>{content.description ? content.description : null}</p>
              </CardContent>
              <CardFooter>
                <p>{formatDate(content.createdAt)}</p>
              </CardFooter>
            </Card>
          )
        )}
        {query.isError && <p>Error: {query?.error?.message}</p>}
      </div>
    </>
  );
}

export default ContentLayout;
