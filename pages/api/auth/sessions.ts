import { NextApiRequest, NextApiResponse } from "next";
import { extractTokenFromRequest } from "../../../functions";
import AuthKit from "../../../utils/AuthKit";

export default async function sessionsApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = extractTokenFromRequest(req) as string;
  const user = AuthKit.decodeToken(token);
  if (user !== null) {
    const sessions = await AuthKit.getAllSessions(user.email);
    res.json(sessions);
    return;
  }
  res.send("null");
  return;
}
