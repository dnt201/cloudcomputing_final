import type { NextPage } from "next";
import { Fragment } from "react";
import Home from "@containers/Home";
import MetaTitle from "@design/MetaTitle";

const Homepage: NextPage = () => {
  return (
    <Fragment>
      <MetaTitle title="UTE Translate" />
      <Home />
    </Fragment>
  );
};

export default Homepage;
