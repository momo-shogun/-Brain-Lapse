import { useSidebar } from "@/components/ui/sidebar";
import { Brain, Plus, Share2 } from "lucide-react";
import { Button } from "../ui/button";
// import axios from "axios";
// import { URl } from "./lib/utils";
import { useState } from "react";
import { AddContentModal } from "./AddContent";

const Header = () => {
  const { isMobile, toggleSidebar } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleShowContent = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:pt-6 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex gap-2 ">
                {isMobile && (
                  <>
                    <Brain
                      onClick={toggleSidebar}
                      className="text-purple-500"
                      size={30}
                    />
                  </>
                )}

                <h1 className="text-2xl font-bold flextext-gray-900 sm:text-3xl">
                  All Notes
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button className="bg-violet-300/60 hover:bg-violet-300/90 text-violet-600">
                <Share2 size={20} />
                <span className="text-sm font-medium"> Share Brain </span>
              </Button>

              
        <AddContentModal />

            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
