import Head from "next/head";

interface ITitle {
  title: string;
}

const MetaTitle = ({ title = "Translate" }: ITitle) => {
  return (
    <Head>
      <title>{`${title}`} </title>
    </Head>
  );
};

export default MetaTitle;
