import { Field, useFormikContext } from "formik";
import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { useShopsQuery } from "@/redux/services/products-api";
import { Loader } from "lucide-react";
import ReactQuill from "react-quill-new";
// import "react-quill/dist/quill.snow.css";
import CheckboxSelector from "@/common/checkbox-selector";
import { Button } from "../ui/button";

export default function Basicform({ tab, setTab }) {
  const { values, setFieldValue } = useFormikContext();
  const { data: shopData, isLoading } = useShopsQuery();
  console.log("values", values);

  return (
    <>
      <div className="py-4 grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <Label>Product Name</Label>
          <Field
            as={Input}
            name="productData.name"
            type="text"
            value={values?.productData?.name}
            className="mt-2"
            placeholder="Product Name"
          />
        </div>
        <div className="col-span-6">
          <Label>Shop</Label>
          {isLoading ? (
            <Loader className="animate-spin" />
          ) : (
            <Select
              value={values.shop}
              onValueChange={(value) => {
                setFieldValue("shop", value);
              }}
            >
              <SelectTrigger className="w-full mt-2">
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
        <div className="col-span-12 mt-2">
          <Label>Description</Label>
          {/* <ReactQuill
          theme="snow"
          value={values?.productData?.description}
          className="mt-2 "
          onChange={(value) => setFieldValue("productData.description", value)}
        /> */}
          <Field
            as={Textarea}
            name="productData.description"
            type="text"
            value={values?.productData?.description}
            className="mt-2"
            placeholder="Product Name"
          />
        </div>
        <div className="col-span-6 mt-2">
          <Label>Category</Label>

          <Select
            value={values.productData.category}
            className="w-full"
            onValueChange={(value) => {
              setFieldValue("productData.category", value);
            }}
          >
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"Electronics"}>Electronics</SelectItem>
                <SelectItem value={"Clothing"}>Clothing</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-6 mt-2">
          <Label>Product Tags</Label>
          <CheckboxSelector />
        </div>
        <div className="col-span-12 mt-3">
          <p className="text-md font-poppins text-primary font-semibold">
            Vendor Details
          </p>
        </div>
        <div className="col-span-6">
          <Label>Firstname</Label>
          <Field
            as={Input}
            type="text"
            value={values?.productData?.vendorData.first_name}
            className="mt-2"
            placeholder="Jon"
          />
        </div>
        <div className="col-span-6">
          <Label>Lastname</Label>
          <Field
            as={Input}
            type="text"
            value={values?.productData?.vendorData.last_name}
            className="mt-2"
            placeholder="Doe"
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <Button
          onClick={() => setTab(String(Number(tab) - 1))}
          size="lg"
          disabled={tab == "0"}
          className={"rounded-2xl"}
        >
          Previous
        </Button>
        <Button
          onClick={() => setTab(String(Number(tab) + 1))}
          type={tab == "variant" ? "submit" : "button"}
          size="lg"
          className={"rounded-2xl"}
        >
          Next
        </Button>{" "}
      </div>
    </>
  );
}
