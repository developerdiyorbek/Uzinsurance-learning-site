import LearnLayoutClient from "./_components/LearnLayoutClient";
import { PropsWithChildren } from "react";

export default function LearnLayout({ children }: PropsWithChildren) {
  return <LearnLayoutClient>{children}</LearnLayoutClient>;
}
