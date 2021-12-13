import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { url } = req.query;
  if (!url) {
    res.json("Not query");
    res.status(405).end();
  }

  if (typeof url !== "string") {
    url = url[0];
  }

  try {
    let result = await getPageApi(url);

    res.status(200).json(result);
  } catch (error) {
    res.json(error);
    res.status(400).end();
  }
}

const getPageApi = async (url: string) => {
  try {
    let response = await axios.get(url);

    let data = response.data;

    return data;
  } catch (error: any) {
    return error.message;
  }
};
