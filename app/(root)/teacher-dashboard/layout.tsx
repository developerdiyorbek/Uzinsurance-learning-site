import TeacherDashboardProvider from "@/components/providers/TeacherDashboardProvider";
import AppNavbar from "@/components/shared/AppNavbar";
import AppSidebar from "@/components/shared/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";

async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <TeacherDashboardProvider>
        <SidebarProvider>
          <AppSidebar role="teacher" />
          <main className="w-full lg:mr-2">
            <AppNavbar />
            <section className="mt-4 mx-auto mb-12 w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
              {children}
            </section>
          </main>
        </SidebarProvider>
      </TeacherDashboardProvider>
    </>
  );
}

export default Layout;
