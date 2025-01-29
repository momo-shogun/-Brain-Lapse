import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/AppSidebar";
import Header from "@/components/custom/Header";
import ContentLayout from "./content/ContentLayout";

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
      </SidebarProvider>
    </>
  );
}

export default Dashboard;
