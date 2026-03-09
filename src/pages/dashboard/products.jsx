import Paginate from "@/common/paginate";
import { SearchInput } from "@/common/search-input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProductsQuery } from "@/redux/services/products-api";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Products() {
  const pathname = useLocation().pathname;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: products, isLoading } = useProductsQuery({
    shop: "wonadropshiping.myshopify.com",
  });
  const productData = products?.data;

  return (
    <div className="p-4">
      <div></div>
      <div>
        <Card className={"py-5 px-4"}>
          <CardTitle>
            <div className="flex md:flex-nowrap flex-wrap items-center justify-between">
              <p className="text-xl text-primary font-segoe-ui lg:pl-0 md:pl-7 font-bold capitalize">
                {pathname?.split("/")[1]?.toString()}
              </p>
              <SearchInput />
            </div>
          </CardTitle>
          <CardContent className={"px-0 overflow-x-auto"}>
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <Table className={"font-poppins"}>
                <TableHeader className={"bg-gray-100 border rounded"}>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Product Type</TableHead>
                    <TableHead>Varients</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Scope</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productData?.map((product) => (
                    <TableRow>
                      <TableCell className="font-medium truncate line-clamp-1 w-36">
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          src={product?.image?.src ?? "/placholder.png"}
                          alt=""
                        />
                        <p className="font-poppins font-medium">
                          {" "}
                          {product?.title}
                        </p>
                      </TableCell>
                      <TableCell className={"capitalize"}>
                        {product?.status}
                      </TableCell>
                      <TableCell className={"capitalize "}>
                        {product?.product_type}
                      </TableCell>
                      <TableCell className={"capitalize "}>
                        {product?.variants?.length}
                      </TableCell>
                      <TableCell className={"capitalize"}>
                        {product?.published_scope}
                      </TableCell>
                      <TableCell className={"capitalize"}>
                        {product?.vendor}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <div className="py-4">
              <Paginate
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-2 w-full">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-4 items-center justify-center">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      ))}
    </div>
  );
}
