import React, { useState, createContext } from "react";
import { ShopData } from "./ShopData";

export const ShopContext = createContext();

export const ShopProvider = (props) => {
  const [data, setData] = useState(ShopData);

  return <ShopContext.Provider value={{ contextData: [data, setData] }}>{props.children}</ShopContext.Provider>;
};
