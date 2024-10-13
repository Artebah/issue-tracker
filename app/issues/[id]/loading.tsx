import { Box, Flex, Card, Skeleton } from "@radix-ui/themes";
import React from "react";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex className="gap-3 my-2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose mt-5 dark:text-white ">
        <Skeleton />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
