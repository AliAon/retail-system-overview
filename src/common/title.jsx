import React from "react";
import { useLocation } from "react-router-dom";

export default function Title() {
  const pathname = useLocation().pathname;

  return (
    <p className="text-xl text-primary font-poppins lg:pl-0 md:pl-7 font-bold capitalize">
      {pathname?.split("/")[1]?.toString().replace("-", " ")}
    </p>
  );
}
