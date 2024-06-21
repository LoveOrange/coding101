import React from "react";
import { IdealImage } from "@theme/IdealImage";

interface ImageProps {
  path: string;
  // alt?: string;
}

export const MyImage = (path: string) => {
  return (
    <div className="image-container">
      {/* <h1>{alt}</h1> */}
      <IdealImage img={require(path)} />
    </div>
  );
};
