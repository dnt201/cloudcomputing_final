import type { NextPage } from "next";
import { Fragment } from "react";

import MetaTitle from "@design/MetaTitle";
import LinkPage from "@containers/Link";

const Link: NextPage = () => {
  return (
    <Fragment>
      <MetaTitle title="UTE Translate" />
      <LinkPage />
    </Fragment>
  );
};

export default Link;
