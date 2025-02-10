import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Brain } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex gap-2 p-4 align-center justify-start text-nowrap">
            <Brain className="text-purple-500" size={30} />
            <div className=" text-black text-xl font-semibold tracking-wide">
              Brain Lapse
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="py-5 ps-14" size="lg">Tweets</SidebarMenuButton>
                <SidebarMenuButton className="py-5 ps-14" size="lg">Video</SidebarMenuButton>
                <SidebarMenuButton className="py-5 ps-14" size="lg">Document</SidebarMenuButton>
                <SidebarMenuButton className="py-5 ps-14" size="lg">Links</SidebarMenuButton>
                <SidebarMenuButton className="py-5 ps-14" size="lg">Tags</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
