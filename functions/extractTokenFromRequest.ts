import { NextApiRequest } from "next";

export default function extractTokenFromRequest(
  req: NextApiRequest
): string | null {
  const rawCookiesString: string = req.headers.cookie || "";
  const cookiesArray: string[] = rawCookiesString.split(";");

  return (
    cookiesArray
      .find((item) => {
        return item.match("jwt_token");
      })
      ?.split("=")[1] || null
  );
}
