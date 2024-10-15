"use client";
import { Button } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ currentPage, itemCount, pageSize }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    let newPageCount = page;
    if (page > pageSize) {
      newPageCount = pageSize;
    }
    if (page < 1) {
      newPageCount = 1;
    }

    const params = new URLSearchParams(searchParams);
    params.set("page", newPageCount.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <h3>
        Page {currentPage} of {pageCount}{" "}
      </h3>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 10)}>
        <MdOutlineKeyboardDoubleArrowLeft size={25} />
      </Button>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}>
        <MdChevronLeft size={25} />
      </Button>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}>
        <MdChevronRight size={25} />
      </Button>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 10)}>
        <MdOutlineKeyboardDoubleArrowRight size={25} />
      </Button>
    </div>
  );
};

export default Pagination;
