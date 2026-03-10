import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormikContext } from "formik";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function CheckboxSelector() {
  const options = ["earbuds", "wireless", "bluetooth"];
  const { values, setFieldValue } = useFormikContext();

  const productTags =
    typeof values?.productData?.productTags === "string"
      ? values.productData.productTags.split(",").map((tag) => tag.trim())
      : values?.productData?.productTags || [];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative w-full cursor-pointer">
          <Input
            readOnly
            className="mt-2 w-full text-left pr-8 cursor-pointer"
            value={productTags.join(", ")}
            placeholder="Select tags"
          />
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60 pointer-events-none" />
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)]"
      >
        <ul className="max-h-28 overflow-y-auto">
          {options.map((option) => (
            <li key={option} className="flex gap-2 mb-2">
              <Checkbox
                id={option}
                checked={productTags.includes(option)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFieldValue("productData.productTags", [
                      ...productTags,
                      option,
                    ]);
                  } else {
                    setFieldValue(
                      "productData.productTags",
                      productTags.filter((tag) => tag !== option),
                    );
                  }
                }}
              />
              <Label htmlFor={option}>{option}</Label>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
