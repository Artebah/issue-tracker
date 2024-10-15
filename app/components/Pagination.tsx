import { Button } from "@radix-ui/themes";
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
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      <h3>
        Page {currentPage} of {pageCount}{" "}
      </h3>
      <Button variant="soft" color="gray" disabled={currentPage === 1}>
        <MdOutlineKeyboardDoubleArrowLeft size={25} />
      </Button>
      <Button variant="soft" color="gray" disabled={currentPage === 1}>
        <MdChevronLeft size={25} />
      </Button>
      <Button variant="soft" color="gray" disabled={currentPage === pageCount}>
        <MdOutlineKeyboardDoubleArrowRight size={25} />
      </Button>
      <Button variant="soft" color="gray" disabled={currentPage === pageCount}>
        <MdChevronRight size={25} />
      </Button>
    </div>
  );
};

export default Pagination;
