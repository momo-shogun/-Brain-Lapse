import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video, Twitter, FileText, Image, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { contentType, TypeIcon } from "./TypeIcon";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const contentTypes: { type: contentType; icon: any; label: string }[] = [
  { type: "video", icon: Video, label: "Video" },
  { type: "tweet", icon: Twitter, label: "Tweet" },
  { type: "document", icon: FileText, label: "Document" },
  { type: "image", icon: Image, label: "Image" },
];

export function AddContentModal() {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    link: "",
    tags: [],
  });
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post("http://localhost:3000/api/v1/content", data,{
        headers:{
          'authorization' : localStorage.getItem("token")
        }
      });
      return response.data;
    },
    onSuccess: () => {
      console.log("data saved");
    },
    onError: (error: any) => {
      console.error("Error during creation: ", error);
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    mutation.mutate(formData)
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-violet-300/60 text-violet-600 hover:bg-violet-300/90 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <Plus size={20} />
          Add Content
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-describedby="">
        <DialogHeader>
          <DialogTitle>Add Content</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="type">Type</label>
            <Select onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {contentTypes.map((item) => (
                    <SelectItem key={item.type} value={item.type}>
                      <div className="flex justify-center items-center gap-2">
                        <TypeIcon type={item.type} />
                        {item.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="title">Title</label>
            <Input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="title">Link</label>
            <Input
              type="text"
              placeholder="Link"
              value={formData.link}
              onChange={(e) => handleInputChange("link", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="description">Description</label>
            <Textarea
              placeholder="Description"
              value={formData.description}
              aria-describedby="description-helper-text"
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSave}
            disabled={mutation.isPending}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
