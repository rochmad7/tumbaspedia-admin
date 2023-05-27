import ContentLoader from "react-content-loader";
import React from "react";

const MyLoader = () => (
  <ContentLoader
    speed={2}
    width={40}
    height={40}
    viewBox="0 0 40 40"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="20" cy="20" r="16">
      <animate attributeName="r" values="16;10;16" dur="1.5s" repeatCount="indefinite" />
      <animate attributeName="fill-opacity" values="1;.3;1" dur="1.5s" repeatCount="indefinite" />
    </circle>
  </ContentLoader>
);

export default MyLoader;
