import AdminDashboardProvider from "@/components/providers/AdminProvider";
import AppNavbar from "@/components/shared/AppNavbar";
import AppSidebar from "@/components/shared/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";

async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <AdminDashboardProvider>
        <SidebarProvider>
          <AppSidebar role="admin" />
          <main className="w-full lg:mr-2">
            <AppNavbar role="admin" />
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
