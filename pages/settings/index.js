import { getSession } from "next-auth/client";
import Navbar from "../../components/NavBar";
import styles from "./settings.module.scss";
import { Avatar } from "@mui/material";
import { signOut } from "next-auth/client";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
function Settings({ session }) {
  const router = useRouter();

  //get window width
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (width > 1024) {
    router.push("/settings/account");
  }

  return (
    <div>
      <Navbar />
      <Head>
        <title>Settings</title>
        <meta name="description" content="Login-Samaan" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
      </Head>
      <div
        style={{
          display: width ? "none" : "block",
        }}
      >
        <Loading />
      </div>
      <div className={styles.container}>
        <div className={styles.menu}>
          <div className={styles.profileInfo}>
            <Avatar
              style={{ height: "100px", width: "100px" }}
              alt="User Profile"
              src={session.user.image}
            />
            <p>
              {session.user.name} {session.user.lastName}
            </p>
            <p>{session.user.email}</p>
          </div>
          <ul>
            <li onClick={() => router.push("/settings/address")}>
              <Image
                alt="image"
                src="/settings/location.png"
                height="45"
                width="45"
                layout="fixed"
              />
              <div>
                <p> My Addresses </p>
                <span>Add/manage your addresses</span>
              </div>
            </li>
            <li>
              <Image
                alt="image"
                src="/settings/order.png"
                height="45"
                width="45"
                layout="fixed"
              />
              <div>
                <p> My Orders </p>
                <span>See History of your products orders</span>
              </div>
            </li>
            <li>
              <Image
                alt="image"
                src="/settings/favourite.png"
                height="45"
                width="45"
                layout="fixed"
              />
              <div>
                <p> My WishList </p>
                <span>Manage your products wishlist</span>
              </div>
            </li>
            <li>
              <Image
                alt="image"
                src="/settings/review.png"
                height="45"
                width="45"
                layout="fixed"
              />
              <div>
                <p> My Reviews </p>
                <span>See your products Reviews</span>
              </div>
            </li>
            <li>
              <Image
                alt="image"
                src="/settings/credit-card.png"
                height="45"
                width="45"
                layout="fixed"
              />
              <div>
                <p> Add Credit/Debit Cards </p>
                <span>Make your transaction easier</span>
              </div>
            </li>
            <li onClick={() => router.push("/settings/account")}>
              <Image
                alt="image"
                src="/settings/account.png"
                height="45"
                width="45"
                layout="fixed"
              />
              <div>
                <p> Account Settings </p>
                <span>Manage your account details</span>
              </div>
            </li>
          </ul>
          <div className={styles.button}>
            <button onClick={() => signOut()}>Log out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
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
