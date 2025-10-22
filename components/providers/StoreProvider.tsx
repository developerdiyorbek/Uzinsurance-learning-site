"use client";

import { store } from "@/lib/store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

function StoreProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
