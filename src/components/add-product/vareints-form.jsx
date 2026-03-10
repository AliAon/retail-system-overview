import React from "react";
import { Button } from "../ui/button";
import { Field, useFormikContext } from "formik";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Vareintform({ tab, setTab }) {
  const { values } = useFormikContext();
  return (
    <>
      <div className="py-4 grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <Label>Sku</Label>
          <Field
            as={Input}
            name="productData.variants[0].sku"
            type="text"
            value={values?.productData?.variants[0]?.sku}
            className="mt-2"
            placeholder="Enter Sku"
          />
        </div>
        <div className="col-span-6">
          <Label>Price</Label>
          <Field
            as={Input}
            name="productData.variants[0].price"
            type="text"
            value={values?.productData?.variants[0]?.price}
            className="mt-2"
            placeholder="Enter Price"
          />
        </div>
        <div className="col-span-6">
          <Label>Weight</Label>
          <Field
            as={Input}
            name="productData.variants[0].weight"
            type="text"
            value={values?.productData?.variants[0]?.weight}
            className="mt-2"
            placeholder="Enter Weight"
          />
        </div>
        <div className="col-span-6">
          <Label>Inventory Quantity</Label>
          <Field
            as={Input}
            name="productData.variants[0].inventory_quantity"
            type="text"
            value={values?.productData?.variants[0]?.inventory_quantity}
            className="mt-2"
            placeholder="Enter Weight"
          />
        </div>
        <div className="col-span-12">
          <Label>Featured Image</Label>
          <Input id="picture" type="file" />
          <p className="text-xs text-gray-500">Select a image to upload.</p>
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
