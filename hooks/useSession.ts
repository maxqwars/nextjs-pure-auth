import { useState, useEffect } from "react";
import { UserDto } from "../typings/UserDto";

type Session = {
  status: "loading" | "authenticated" | "unauthenticated";
  data: null | UserDto;
};

export default function useSession() {
  const [session, setSession] = useState<Session>({
    status: "loading",
    data: null,
  });

  useEffect(() => {
    fetch(`${location.protocol}//${location.host}/api/auth/whoami`)
      .then((req) => req.json())
      .then((data: UserDto) => {
        console.log("useSession data", data);

        if (data.email !== null && data.name !== null) {
          setSession({
            status: "authenticated",
            data,
          });
        } else {
          setSession({
            status: "unauthenticated",
            data: null,
          });
        }
      });
  }, [setSession]);

  return session;
}
