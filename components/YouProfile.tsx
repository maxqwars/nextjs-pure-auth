import React from "react";
import { useSession } from "../hooks";
import Link from "next/link";

type Props = {};

const YouProfile = (props: Props) => {
  const session = useSession();

  console.log(session);

  return (
    <div className="box">
      {session.status === "loading" && <p>Loading...</p>}
      {session.status === "unauthenticated" && (
        <div className="block">
          <div className="block">
            <h4 className="is-size-4">You unauthenticated</h4>
          </div>
          <div className="block">
            <div className="buttons">
              <Link href="/login">
                <a className="button is-link is-rounded">Login</a>
              </Link>
              <Link href="/register">
                <a className="button is-link is-rounded">Register</a>
              </Link>
            </div>
          </div>
        </div>
      )}
      {session.status === "authenticated" && (
        <div className="block">
          <h4 className="is-size-4">{`You name ${session.data?.name}`}</h4>
          <h5 className="is-size-5">{`You email ${session.data?.email}`}</h5>
        </div>
      )}
    </div>
  );
};

export default YouProfile;
