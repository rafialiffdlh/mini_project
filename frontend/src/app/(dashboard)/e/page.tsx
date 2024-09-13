import ECommerce from "@/components/dashboard/home/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLayout";
import OrgDashboardComponent from "@/components/OrgDashboard.component";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <>
      {/* <DefaultLayout>
        <ECommerce />
      </DefaultLayout> */}
      <OrgDashboardComponent />
    </>
  );
}
