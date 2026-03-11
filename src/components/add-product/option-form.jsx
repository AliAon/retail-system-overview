import { ErrorMessage, Field, useFormikContext } from "formik";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import OptionValueForm from "./option-value-form";

export default function Optionform({ tab, setTab }) {
  const { values, setFieldValue, validateForm, setTouched, errors } =
    useFormikContext();
  const [option, setOption] = useState("");
  const handleAddOption = () => {
    setFieldValue("productData.option", [
      ...values.productData.option,
      {
        option,
        values: [],
      },
    ]);
    setOption("");
  };

  return (
    <>
      <div className="py-4 grid grid-cols-12 ">
        <div className="col-span-12">
          <Label>Add New Option</Label>
        </div>
        <div className="sm:col-span-6 col-span-12 flex items-center gap-x-4 mt-2">
          <div className=" flex-1">
            <Input
              onChange={(e) => {
                setOption(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  e.preventDefault();
                  handleAddOption();
                }
              }}
              type="text"
              value={option}
              placeholder="Option Name"
            />
          </div>
          <Button
            disabled={option == ""}
            type="button"
            onClick={handleAddOption}
          >
            Add Option
          </Button>
        </div>
        <div className="col-span-12">
          {!Array.isArray(errors?.productData?.option) && (
            <ErrorMessage
              name="productData.option"
              component="span"
              className="text-xs text-red-500"
            />
          )}
        </div>
      </div>

      <OptionValueForm />

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
            if (errors?.productData?.option) {
              setTouched({
                productData: {
                  option: true,
                },
              });
              if (Array.isArray(errors?.productData?.option)) {
                setTouched({
                  productData: {
                    option: [{ values: true }],
                  },
                });
              }
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
