import PageHeader from "@/components/shared/PageHeader";
import { Metadata } from "next";
import UsersTable from "./_components/UsersTable";

export const metadata: Metadata = {
  title: "Customers",
};

async function Page() {
  return (
    <>
      <PageHeader title="Foydalanuvchilar" />
      <UsersTable />
    </>
  );
}

export default Page;
