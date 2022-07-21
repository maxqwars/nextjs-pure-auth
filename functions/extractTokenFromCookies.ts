import { NextApiRequest } from "next";

export default function extractTokenFromCookies(
  req: NextApiRequest
): string | null {
  const rawCookies: string = req.headers.cookie || "";
  const cookiesArray: string[] = rawCookies.split(";");

  return (
    cookiesArray
      .find((item) => {
        return item.match("jwt_token");
      })
      ?.split("=")[1] || null
  );
}
