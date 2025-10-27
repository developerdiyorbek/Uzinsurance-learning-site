import AdminDashboardProvider from "@/components/providers/AdminProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";
import AppSidebar from "./_components/AppSidebar";
import AppNavbar from "./_components/AppNavbar";

async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <AdminDashboardProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full lg:mr-2">
            <AppNavbar />
            <section className="mt-4 mx-auto mb-12 w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
              {children}
            </section>
          </main>
        </SidebarProvider>
      </AdminDashboardProvider>
    </>
  );
}

export default Layout;
