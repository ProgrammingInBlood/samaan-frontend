import styles from "../styles/login.module.scss";
import Image from "next/image";
import router from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/client";
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";
import Head from "next/head";

function SignUp() {
  //REGISTER VALUES
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [spinner, setSpinner] = useState(false);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  function submitRegister(e) {
    if (password === confirmPassword) {
      setSpinner(true);
      try {
        axios
          .post("/api/signup", {
            firstName: name,
            lastName: lastname,
            email: email,
            password: password,
          })
          .then(function (response) {
            setSpinner(false);
            setMessage(response.data.message);
            console.log(response);
          });
      } catch (err) {
        setMessage("Something went wrong ! Try again");
      }
    } else {
      setMessage("Entered Password didn't matched");
    }
  }

  useEffect(() => {
    if (password === confirmPassword) {
      setMessage("");
    }
  }, [password, confirmPassword]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="Samaan - Ecommerce" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
      </Head>
      <div className={styles.login}>
        <div className={styles.title}>
          <h1>Welcome to Samaan</h1>
          <p>The future of shopping</p>
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
          <div className={styles.flex}>
            <span>
              <p className={styles.text}>First Name</p>
              <input
                type="text"
                className={styles.input}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </span>
            <span>
              <p className={styles.text}>Last Name</p>
              <input
                type="text"
                className={styles.input}
                onChange={(e) => setLastName(e.target.value)}
                value={lastname}
              />
            </span>
          </div>

          <p className={styles.text}>Email</p>
          <input
            type="email"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <p className={styles.text}>Password</p>
          <input
            type="password"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <p className={styles.text}>Confirm Password</p>
          <input
            style={
              password === confirmPassword
                ? { border: "1px solid rgb(202, 202, 202)" }
                : { border: "1px solid red" }
            }
            type="password"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className={styles.loginDiv}>
          <MoonLoader
            loading={spinner}
            size={30}
            color="#212121"
            css={override}
          />
          <p style={{ textAlign: "center" }}>{message}</p>
          <p>Forgot Password ?</p>
          <button onClick={submitRegister}>Sign up</button>
        </div>
        <p onClick={() => router.push("/login")} className={styles.signup}>
          Already a user? Log in?
        </p>
      </div>
    </div>
  );
}

export default SignUp;

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
