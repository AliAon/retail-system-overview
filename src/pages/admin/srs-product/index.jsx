import Paginate from "@/common/paginate";
import { SearchInput } from "@/common/search-input";
import Title from "@/common/title";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/hooks/useDebounce";
import { useSrsproductsQuery } from "@/redux/services/products-api";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SRSProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const {
    data: srsData,
    isLoading: isSrsLoading,
    isFetching,
  } = useSrsproductsQuery({
    page: searchParams.get("page") || 1,
    search: useDebounce(search, 500),
  });
  const productData = srsData?.data?.products ?? [];
  const pagination = srsData?.data?.pagination;

  return (
    <div className="p-4">
      <div></div>
      <div>
        <Card className={"py-5 px-4"}>
          <CardTitle>
            <div className="flex md:flex-nowrap flex-wrap items-start justify-between">
              <Title />

              <div className="flex flex-col items-end gap-8">
                {/* <Link to="/add-product">
                  <Button
                    className={"w-fit font-poppins font-medium cursor-pointer"}
                  >
                    Add Product
                  </Button>
                </Link> */}
                <div className="flex items-center gap-4">
                  <SearchInput setSearch={setSearch} search={search} />
                </div>
              </div>
            </div>
          </CardTitle>
          <CardContent className={"px-0 overflow-x-auto"}>
            {isSrsLoading || isFetching ? (
              <TableSkeleton />
            ) : (
              <Table className={"font-poppins"}>
                <TableHeader className={"bg-gray-100 border rounded"}>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Varients</TableHead>
                    <TableHead>Season</TableHead>
                    <TableHead>Year</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productData?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <p className="font-poppins text-center py-1 font-medium">
                          {" "}
                          No Data
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    productData?.map((product) => (
                      <TableRow>
                        <TableCell className="font-medium truncate line-clamp-1 w-36">
                          {(product?.image == "" || !product?.image) && (
                            <img
                              className="w-10 h-10 rounded-full object-cover"
                              src={"/placholder.png"}
                              alt=""
                            />
                          )}
                          {product?.image && (
                            <img
                              className="w-10 h-10 rounded-full object-cover"
                              src={product?.image ?? "/placholder.png"}
                              alt=""
                            />
                          )}
                          <p className="font-poppins font-medium">
                            {" "}
                            {product?.name}
                          </p>
                        </TableCell>
                        <TableCell className={"capitalize"}>
                          {product?.category}
                        </TableCell>
                        <TableCell className={"capitalize "}>
                          {product?.brand ? product?.brand : "-"}
                        </TableCell>
                        <TableCell className={"capitalize "}>
                          {product?.variants?.length}
                        </TableCell>
                        <TableCell className={"capitalize"}>
                          {product?.season}
                        </TableCell>
                        <TableCell className={"capitalize"}>
                          {product?.year}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
            {pagination?.totalProducts > 9 && (
              <div className="py-4">
                <Paginate
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPage={pagination?.totalPages}
                />
              </div>
            )}
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
          <Skeleton className="h-4 w-37.5" />
          <Skeleton className="h-4 w-50" />
          <Skeleton className="h-4 w-25" />
          <Skeleton className="h-4 w-50" />
          <Skeleton className="h-4 w-50" />
          <Skeleton className="h-4 w-30" />
          <Skeleton className="h-4 w-25" />
          <Skeleton className="h-4 w-50" />
          <Skeleton className="h-4 w-25" />
        </div>
      ))}
    </div>
  );
}
