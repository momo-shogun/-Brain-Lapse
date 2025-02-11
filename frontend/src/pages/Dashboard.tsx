import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/AppSidebar";
import Header from "@/components/custom/Header";
import ContentLayout from "./content/ContentLayout";
import { Toaster } from "@/components/ui/toaster";

function Dashboard() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <Header />
          <div className="sm:p-4">
            <ContentLayout />
          </div>
        </main>
        <Toaster />
      </SidebarProvider>
    </>
  );
}

export default Dashboard;
