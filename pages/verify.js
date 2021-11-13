
import { signIn } from "next-auth/client";
import jwt, { verify } from "jsonwebtoken";
import { useRouter } from "next/router";
import styles from "../styles/Verify.module.scss";
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";
import Image from "next/image";

function Verify({ query }) {
  const Router = useRouter();
  if (query.token) {
    const token = jwt.decode(query.token);

    async function signInFromEmail() {
      console.log(token.key);
      console.log(token.email);
      try {
        const status = await signIn("credentials", {
          redirect: false,
          email: token.email,
          password: token.key,
        });

        if (!status.error) {
          Router.replace("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
    signInFromEmail();
  }

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  return (
    <div className={styles.container}>
      <div className={styles.imageBox}>
        <Image src="/MERN-logo.png" width="150" height="60" />
      </div>
      <h3 style={styles.mainTitle}>Login Success!</h3>
      <h1 className={styles.title}>Please wait while we redirect you...</h1>
      <MoonLoader loading={true} size={30} color="#212121" css={override} />
    </div>
  );
}

export default Verify;
export async function getServerSideProps(context) {
  const { query } = context;

  let data;
  verify(query.token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) {
      data = true;
    }
  });

  if (data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { query },
  };
}
