"use client";

import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider as ReactQueryClentProvider } from "@tanstack/react-query";

const useQueryClient = () => {
  const [queryClient] = React.useState(() => new QueryClient());
  return queryClient;
};

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();

  return <ReactQueryClentProvider client={queryClient}>{children}</ReactQueryClentProvider>;
};

export default QueryClientProvider;
