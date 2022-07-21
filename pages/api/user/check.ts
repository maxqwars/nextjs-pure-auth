import { NextApiRequest, NextApiResponse } from "next";
import { UserDto } from "../../../typings/UserDto";
import { LoginUserDto } from "../../../typings/LoginUserDto";
import UserKit from "../../../utils/UserKit";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: LoginUserDto;
}

export default async function checkUserApi(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<UserDto | string>
) {
  const { email, password } = req.body;
  const candidate = await UserKit.findUserByEmail(email);

  if (candidate === null) {
    res.send("User not found!");
    return;
  } else {
    const passwordsMatched = UserKit.comparePasswordAndHash(
      password,
      candidate.hash,
      candidate.salt
    );

    if (passwordsMatched) {
      res.json({
        email: candidate.email || "",
        name: candidate.name || "",
      });
      return;
    }

    res.send("Passwords not match");
    return;
  }
}
