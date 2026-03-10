import { useFormikContext } from "formik";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Cross, Trash, X } from "lucide-react";

export default function OptionValueForm() {
  const { values } = useFormikContext();
  return (
    <ul>
      {values?.productData?.option?.map((option, index) => (
        <OptionValue option={option} key={index} index={index} />
      ))}
    </ul>
  );
}

const OptionValue = ({ option, index }) => {
  const [value, setValue] = useState([]);
  const { values, setFieldValue } = useFormikContext();

  const handleValue = (index) => {
    if (!value.trim()) return;
    const currentValues = values.productData.option[index].values || [];
    setFieldValue("productData.option." + index + ".values", [
      ...currentValues,
      value,
    ]);
    setValue("");
  };

  const handleRemoveValue = (index, value) => {
    const currentValues = values.productData.option[index].values || [];
    setFieldValue("productData.option." + index + ".values", [
      ...currentValues.filter((val) => val !== value),
    ]);
  };
  const handleRemoveOption = (index) => {
    setFieldValue("productData.option", [
      ...values.productData.option.filter(
        (val) => val.option !== option.option,
      ),
    ]);
  };

  return (
    <li className="mb-3">
      <Card>
        <CardContent className={"relative"}>
          <h2 className="text-sm mb-1 font-poppins font-bold">
            {option.option} options
          </h2>
          {/* values */}
          <ul className="flex items-center gap-2 my-2">
            {option.values.map((value) => (
              <li className="bg-gray-300 rounded-2xl px-3 py-1 relative">
                <button>
                  <span className="text-sm">{value}</span>
                </button>
                <X
                  size={20}
                  onClick={() => handleRemoveValue(index, value)}
                  className="absolute -top-2 -right-1 bg-primary text-white  p-1 rounded-full"
                />
              </li>
            ))}
          </ul>
          <div className="flex mb-2 items-center gap-4">
            <Input
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  e.preventDefault();
                  handleValue(index);
                }
              }}
              value={value}
              type="text"
              placeholder="Enter value"
            />
            <Button
              type="button"
              disabled={value == ""}
              onClick={() => handleValue(index)}
            >
              Add Value
            </Button>
          </div>
          <Button
            className={
              "absolute right-3 -top-3 bg-transparent hover:bg-transparent cursor-pointer"
            }
            type="button"
            onClick={() => handleRemoveOption(index)}
          >
            <Trash color="red" />
          </Button>
        </CardContent>
      </Card>
    </li>
  );
};
