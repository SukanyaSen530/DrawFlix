import React from "react";

import "./transparent-loader.scss";

const TransparentLoader = () => {
  return (
    <section className="loader-backdrop">
      <p className="loader-content"></p>
    </section>
  );
};

export default TransparentLoader;
