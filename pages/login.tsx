import type { NextPage } from "next";
import Head from "next/head";
import { LoginForm } from "../components";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login in system</title>
      </Head>
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-one-third">
            <LoginForm></LoginForm>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
