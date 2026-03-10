import React from "react";
import { Button } from "../ui/button";
import { Field, useFormikContext } from "formik";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Loader } from "lucide-react";

export default function variantsform({ tab, setTab, isLoading }) {
  const { values, setFieldValue } = useFormikContext();
  const options = values?.productData?.option || [];
  const variants = options?.flatMap((item) =>
    item.values.flatMap((value) => ({
      sku: "",
      price: "",
      weight: "",
      option: [{ value: value }],
      image: "",
      inventory_quantity: 40,
    })),
  );

  return (
    <>
      {variants.map((variant, index) => (
        <Card key={index} className={"my-3"}>
          <CardHeader className={"capitalize"}>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Variant</span>
              <span className="bg-primary w-fit py-1 text-white rounded-2xl px-3 text-xs">
                {variant.option[0].value}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="pb-4 grid grid-cols-12 gap-4">
              <div className="sm:col-span-6 col-span-12">
                <Label>Sku</Label>
                <Field
                  as={Input}
                  type="text"
                  value={values?.productData?.variants?.sku}
                  onChange={(e) => {
                    setFieldValue(
                      "productData.variants." + index + ".sku",
                      e.target.value,
                    );
                    //Also set Option
                    setFieldValue(
                      "productData.variants." + index + ".option",
                      variant.option,
                    );
                  }}
                  className="mt-2"
                  placeholder="Enter Sku"
                />
              </div>
              <div className="sm:col-span-6 col-span-12">
                <Label>Price</Label>
                <Field
                  as={Input}
                  type="number"
                  value={values?.productData?.variants?.price}
                  onChange={(e) => {
                    setFieldValue(
                      "productData.variants." + index + ".price",
                      e.target.value,
                    );
                  }}
                  className="mt-2"
                  placeholder="Enter Price"
                />
              </div>
              <div className="sm:col-span-6 col-span-12">
                <Label>Weight</Label>
                <Field
                  as={Input}
                  type="number"
                  value={values?.productData?.variants?.weight}
                  onChange={(e) => {
                    setFieldValue(
                      "productData.variants." + index + ".weight",
                      e.target.value,
                    );
                  }}
                  className="mt-2"
                  placeholder="Enter Weight"
                />
              </div>
              <div className="sm:col-span-6 col-span-12">
                <Label>Inventory Quantity</Label>
                <Field
                  as={Input}
                  type="number"
                  value={values?.productData?.variants?.inventory_quantity}
                  onChange={(e) => {
                    setFieldValue(
                      "productData.variants." + index + ".inventory_quantity",
                      e.target.value,
                    );
                  }}
                  className="mt-2"
                  placeholder="Enter Inventory Quantity"
                />
              </div>
              <div className="col-span-12">
                <Label>Featured Image</Label>
                {/* <Input id="picture"type="file" /> */}
                <p className="text-xs text-gray-500">
                  Select a image to upload.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex items-center justify-between mt-5">
        <Button
          onClick={() => setTab(String(Number(tab) - 1))}
          size="lg"
          disabled={tab == "0"}
          type="button"
          className={"rounded-2xl"}
        >
          Previous
        </Button>
        <Button type="submit" size="lg" className={"rounded-2xl"}>
          {isLoading ? <Loader className="animate-spin" /> : "Save"}
        </Button>{" "}
      </div>
    </>
  );
}
