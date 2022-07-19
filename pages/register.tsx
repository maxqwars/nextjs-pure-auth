import type { NextPage } from "next";
import Head from "next/head";
import { RegisterUserForm } from "../components";

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>Register page | create new user</title>
      </Head>
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-one-third">
            <RegisterUserForm></RegisterUserForm>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
