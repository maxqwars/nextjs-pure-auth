import { NextApiRequest, NextApiResponse } from "next";
import AuthKit from "../../../utils/AuthKit";
import { LoginUserDto } from "../../../typings/LoginUserDto";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: LoginUserDto;
}

export default async function LoginApi(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<string>
) {
  const dto = req.body;
  const result = await AuthKit.createSession(dto);
  res.send(result || "Failed");
}
