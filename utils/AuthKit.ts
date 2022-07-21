import { UserDto } from "../typings/UserDto";
import { LoginUserDto } from "../typings/LoginUserDto";
import UserKit from "./UserKit";
import { PrismaClient, Session } from "@prisma/client";
import jwt from "jsonwebtoken";

class AuthKit {
  private _prisma = new PrismaClient();
  private _serverSecret = process.env.SECRET || "secret";

  async createSession(dto: LoginUserDto): Promise<string | null> {
    const { email, password } = dto;
    const candidate = await UserKit.findUserByEmail(email);

    if (candidate === null) return null;

    if (candidate !== null) {
      const passwordsMatched = UserKit.comparePasswordAndHash(
        password,
        candidate.hash,
        candidate.salt
      );

      if (passwordsMatched) {
        const signKey = this._serverSecret;
        const payload: UserDto = {
          name: candidate.name,
          email: candidate.email,
        };

        const jwtToken = jwt.sign(payload, signKey);

        await this._prisma.session.create({
          data: {
            sessionToken: jwtToken,
            expires: new Date(Date.now() + 1000000000),
            user: { connect: { id: candidate.id } },
          },
        });

        console.log("Token and session created");

        return jwtToken;
      } else {
        return null;
      }
    }

    return null;
  }

  async getAllSessions(email: string): Promise<Session[] | null> {
    const user = await UserKit.findUserByEmail(email);

    if (user === null) {
      return null;
    } else {
      const sessions = await this._prisma.session.findMany({
        where: { userId: user.id },
      });

      console.log(`List of ${user.email} sessions:`, sessions);

      return sessions;
    }
  }

  decodeToken(token: string): UserDto | null {
    const decoded = jwt.decode(token);
    if (decoded !== null) return decoded as UserDto;
    return null;
  }
}

export default new AuthKit();
