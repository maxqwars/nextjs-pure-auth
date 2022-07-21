import { NextApiRequest, NextApiResponse } from "next";
import { extractTokenFromCookies } from "../../../functions";
import AuthKit from "../../../utils/AuthKit";

export default async function whoamiApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jwtToken = extractTokenFromCookies(req);

  console.log(jwtToken);

  if (jwtToken !== null) {
    const decoded = AuthKit.decodeToken(jwtToken);
    res.json(decoded);
    return;
  }

  res.json({
    data: null,
  });

  return;
}
