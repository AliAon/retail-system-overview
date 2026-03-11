import { ErrorMessage, Field, useFormikContext } from "formik";
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
  const { values, setFieldValue, validateForm, setTouched } =
    useFormikContext();
  const { data: shopData, isLoading } = useShopsQuery();

  return (
    <>
      <div className="py-4 grid grid-cols-12 gap-4">
        <div className="sm:col-span-6 col-span-12">
          <Label>Product Name</Label>
          <Field
            as={Input}
            name="productData.name"
            type="text"
            value={values?.productData?.name}
            className="mt-2"
            placeholder="Product Name"
          />
          <ErrorMessage
            name="productData.name"
            component="span"
            className="text-xs text-red-500"
          />
        </div>
        <div className="sm:col-span-6 col-span-12">
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
          <ErrorMessage
            name="shop"
            component="span"
            className="text-xs text-red-500"
          />
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
            placeholder="Product Description"
          />
          <ErrorMessage
            name="productData.description"
            component="span"
            className="text-xs text-red-500"
          />
        </div>
        <div className="sm:col-span-6 col-span-12  mt-2">
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
        <div className="sm:col-span-6 col-span-12 mt-2">
          <Label>Product Tags</Label>
          <CheckboxSelector />
        </div>
        <div className="col-span-12 mt-3">
          <p className="text-md font-poppins text-primary font-semibold">
            Vendor Details
          </p>
        </div>
        <div className="sm:col-span-6 col-span-12">
          <Label>Firstname</Label>
          <Field
            as={Input}
            type="text"
            name="productData.vendorData.first_name"
            value={values?.productData?.vendorData.first_name}
            className="mt-2"
            placeholder="eg. Jon"
          />
          <ErrorMessage
            name="productData.vendorData.first_name"
            component="span"
            className="text-xs text-red-500"
          />
        </div>
        <div className="sm:col-span-6 col-span-12">
          <Label>Lastname</Label>
          <Field
            as={Input}
            type="text"
            name="productData.vendorData.last_name"
            value={values?.productData?.vendorData.last_name}
            className="mt-2"
            placeholder="eg. Doe"
          />
          <ErrorMessage
            name="productData.vendorData.last_name"
            component="span"
            className="text-xs text-red-500"
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <Button
          onClick={() => setTab(String(Number(tab) - 1))}
          size="lg"
          type="button"
          disabled={tab == "0"}
          className={"rounded-2xl"}
        >
          Previous
        </Button>
        <Button
          onClick={async () => {
            const errors = await validateForm();
            if (
              errors?.shop ||
              errors?.productData?.name ||
              errors?.productData?.description ||
              errors?.productData?.vendorData?.first_name ||
              errors?.productData?.vendorData?.last_name
            ) {
              await setTouched({
                shop: true,
                productData: {
                  name: true,
                  description: true,
                  vendorData: {
                    first_name: true,
                    last_name: true,
                  },
                },
              });
              return;
            }
            setTab(String(Number(tab) + 1));
          }}
          type="button"
          size="lg"
          className={"rounded-2xl"}
        >
          Next
        </Button>{" "}
      </div>
    </>
  );
}
