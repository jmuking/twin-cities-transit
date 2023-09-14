import React from "react";
import { render } from "@testing-library/react";
import TransitSelect from "./TransitSelect";
import { SelectType } from "../../types/SelectTypes";

test("renders TransitSelect", () => {
  render(<TransitSelect type={SelectType.ROUTE} />);
});
