"use client";

import { isValidUser } from "@/lib/utils";
import useUser from "@/hooks/useUser";
import UserInfo from "./UserInfo";
import NoUserCard from "./NoUserCard";

function CheckUserComponent() {
  const user = useUser();

  // console.log("CheckUserComponent - user:", user);

  if (user && isValidUser(user)) {
    return <UserInfo user={user} />;
  }

  return <NoUserCard />;
}

export default CheckUserComponent;
