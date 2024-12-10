import { FileText, Link2, Twitter, Video, LucideIcon } from "lucide-react";

const fileType: Record<contentType, LucideIcon> = {
  tweet: Twitter,
  video: Video,
  document: FileText,
  image: Link2,
};

type contentType = "video" | "tweet" | "document" | "image";

export function TypeIcon({ type }: { type: contentType }) {
  const iconClass = "text-stone-400";
  const Icon = fileType[type];

  if (!Icon) {
    return null;
  }

  return <Icon size={24} className={iconClass} />;
}
