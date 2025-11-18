import UserNavbar from "./_components/UserNavbar";
import UserSidebar from "./_components/UserSidebar";
import { PropsWithChildren } from "react";

async function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <UserNavbar />

      <div className="flex relative">
        <UserSidebar />

        <main className="flex-1 lg:ml-72 mt-16 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden">
          <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 lg:py-8">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
}

export default Layout;
