import { Skeleton } from "@radix-ui/themes";
import React from "react";

const LoadingNewIssuePage = async () => {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton />
      <Skeleton height="20rem" />
    </div>
  );
};

export default LoadingNewIssuePage;
