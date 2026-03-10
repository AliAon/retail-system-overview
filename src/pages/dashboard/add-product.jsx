import Basicform from "@/components/add-product/basic-form";
import Optionform from "@/components/add-product/option-form";
import Vareintform from "@/components/add-product/vareints-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AddProduct() {
  const pathname = useLocation().pathname;
  const [tab, setTab] = React.useState("0");

  return (
    <div className="p-4">
      <div></div>
      <div>
        <Card className={"py-5 px-4"}>
          <CardTitle>
            <div className="flex md:flex-nowrap flex-wrap items-start justify-between">
              <p className="text-xl text-primary font-poppins lg:pl-0 md:pl-7 font-bold capitalize">
                {pathname?.split("/")[1]?.toString().replace("-", " ")}
              </p>
            </div>
          </CardTitle>
          <CardContent className={"px-0 overflow-x-auto"}>
            <Formik
              initialValues={{
                shop: "wonadropshiping.myshopify.com",
                productData: {
                  name: "Nova Wireless Earbuds",
                  description:
                    "<h2>Nova Wireless Earbuds</h2><p>Crystal clear sound with deep bass and Bluetooth 5.3 connectivity.</p>",
                  category: "Electronics",
                  productTags: "earbuds, wireless, bluetooth",

                  vendorData: {
                    first_name: "John",
                    last_name: "Doe",
                  },

                  option: [
                    {
                      option: "Color",
                      values: ["Black", "White"],
                    },
                  ],

                  variants: [
                    {
                      sku: "NOVA-BLK",
                      price: "18.50",
                      weight: 120,
                      option: [{ value: "Black" }],
                      image:
                        "https://www.lendmeurears.com/cdn/shop/files/novablack.png?v=1723781084&width=3840",
                      inventory_quantity: 50,
                    },
                    {
                      sku: "NOVA-WHT",
                      price: "18.50",
                      weight: 120,
                      option: [{ value: "White" }],
                      image:
                        "https://www.iwantek.com/cdn/shop/articles/the-future-of-wearable-tech-why-nova-earring-earbuds-are-leading-445303.jpg?v=1751360556",
                      inventory_quantity: 40,
                    },
                  ],
                },
              }}
              onSubmit={(values) => {
                console.log("values", values);
              }}
            >
              <Form>
                <Tabs value={tab} onValueChange={setTab} defaultValue="basic">
                  <TabsList>
                    <TabsTrigger value="0" className={"px-4"}>
                      Basic
                    </TabsTrigger>
                    <TabsTrigger value="1" className={"px-4"}>
                      Option
                    </TabsTrigger>
                    <TabsTrigger value="2" className={"px-4"}>
                      Variants
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="0">
                    <Basicform setTab={setTab} tab={tab} />
                  </TabsContent>
                  <TabsContent value="1">
                    <Optionform setTab={setTab} tab={tab} />
                  </TabsContent>
                  <TabsContent value="2">
                    <Vareintform />
                  </TabsContent>
                </Tabs>
              </Form>
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
