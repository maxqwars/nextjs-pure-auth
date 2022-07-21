import type { NextPage } from "next";
import { YouProfile } from "../components";

const Home: NextPage = () => {
  return (
    <>
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-one-third">
            <YouProfile></YouProfile>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
