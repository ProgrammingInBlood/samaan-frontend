import styles from "../styles/login.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/client";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import MoonLoader from "react-spinners/MoonLoader";
import Head from "next/head";

import { css } from "@emotion/react";
function Login({ session }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);

  //LOGIN VALUES
  const [loginemail, setLoginEmail] = useState("");
  const [loginpassword, setLoginPassword] = useState("");
  const [loginmessage, setLoginMessage] = useState("");

  useEffect(() => {
    setLoginMessage("");
  }, [loginemail, loginpassword]);

  useEffect(() => {
    if (session) {
      router.replace("/");
    } else {
      setLoading(false);
    }
  }, []);
  if (loading) {
    return <Loading />;
  }

  async function submitLogin(e) {
    e.preventDefault();
    setSpinner(true);
    setLoginMessage("");

    const status = await signIn("credentials", {
      redirect: false,
      email: loginemail,
      password: loginpassword,
    });

    if (!status.error) {
      setSpinner(false);
      router.replace("/");
    }

    if (status.error && status.ok === true) {
      setSpinner(false);
      setLoginMessage(status.error);
    }
  }

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login-Samaan" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
      </Head>
      <div className={styles.login}>
        <div className={styles.title}>
          <h1>Login to Samaan</h1>
          <p>Welcome back</p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.button}>
            <Image
              src="/icons/google.png"
              height="24"
              width="24"
              layout="fixed"
            />{" "}
            <span> Google</span>
          </button>
          <button className={styles.button}>
            <Image src="/icons/fb.png" height="24" width="24" layout="fixed" />{" "}
            <span> Facebook</span>
          </button>
        </div>
        <div className={styles.fields}>
          <p className={styles.text}>Username</p>
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <p className={styles.text}>Password</p>
          <input
            type="password"
            className={styles.input}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <div className={styles.loginDiv}>
          <MoonLoader
            loading={spinner}
            size={30}
            color="#212121"
            css={override}
          />
          <p style={{ color: "red", textAlign: "center" }}>{loginmessage}</p>

          <p>Forgot Password ?</p>
          <button onClick={submitLogin}>Sign in</button>
        </div>
        <p onClick={() => router.push("/signup")} className={styles.signup}>
          Not a user? Sign up?
        </p>
      </div>
    </div>
  );
}

export default Login;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

