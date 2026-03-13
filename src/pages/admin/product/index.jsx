import Paginate from "@/common/paginate";
import { SearchInput } from "@/common/search-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useDebounce } from "@/hooks/useDebounce";
import { useProductsQuery, useShopsQuery } from "@/redux/services/products-api";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export default function Products() {
  const pathname = useLocation().pathname;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [shop, setShop] = useState("wonadropshiping.myshopify.com");
  const { data: shopData, isLoading: isShopLoading } = useShopsQuery();

  const [search, setSearch] = useState("");
  const {
    data: products,
    isLoading,
    isFetching,
  } = useProductsQuery({
    shop,
    page: searchParams.get("page") || 1,
    search: useDebounce(search, 500),
  });
  const productData = products?.data?.products ?? [];
  const pagination = products?.data?.pagination;

  return (
    <div className="p-4">
      <div></div>
      <div>
        <Card className={"py-5 px-4"}>
          <CardTitle>
            <div className="flex md:flex-nowrap flex-wrap items-start justify-between">
              <p className="text-xl text-primary font-poppins lg:pl-0 md:pl-7 font-bold capitalize">
                {pathname?.split("/")[1]?.toString()}
              </p>

              <div className="flex flex-col items-end gap-8">
                <Link to="/add-product">
                  <Button
                    className={"w-fit font-poppins font-medium cursor-pointer"}
                  >
                    Add Product
                  </Button>
                </Link>
                <div className="flex items-center gap-4">
                  <SearchInput setSearch={setSearch} search={search} />

                  <div>
                    {isShopLoading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <Select
                        value={shop}
                        onValueChange={(value) => {
                          setShop(value);
                        }}
                      >
                        <SelectTrigger className="w-full ">
                          <SelectValue placeholder="Select a shop" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {shopData?.data?.shopifyAccount?.map((shop) => (
                              <SelectItem value={shop.shopDomain}>
                                {shop.shopName}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
          <CardContent className={"px-0 overflow-x-auto"}>
            {isLoading || isFetching ? (
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
                    ))
                  )}
                </TableBody>
              </Table>
            )}
            {productData?.data?.products?.length > 9 && (
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
