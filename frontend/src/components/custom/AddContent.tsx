import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video, Twitter, FileText, Image, Plus } from "lucide-react";

const contentTypes = [
  { type: "video", icon: Video, label: "Video" },
  { type: "tweet", icon: Twitter, label: "Tweet" },
  { type: "document", icon: FileText, label: "Document" },
  { type: "image", icon: Image, label: "Image" },
];

export function AddContentModal() {
  const handleContentTypeClick = (type: string) => {
    console.log(`Selected content type: ${type}`);
    // Here you would implement the logic for adding the specific content type
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-violet-300/60 text-violet-600 hover:bg-violet-300/90 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <Plus size={20} />
          Add Content
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Content</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          
        </div>
      </DialogContent>
    </Dialog>
  );
}
