import styles from "./styles/NavBar.module.scss";
import router, { useRouter } from "next/router";

import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useEffect, useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/client";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";

import SearchBar from "./utils/SearchBar";
import { Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
function Navbar() {
  //VARIABLES

  const Router = useRouter();
  const [session, loading] = useSession();
  const [userSession, setUserSession] = useState([]);
  const [click, setClick] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  //REDUX CART COUNT
  const cart = useSelector((state) => state.cart);

  //CHECKING AUTHRIZATION
  useEffect(() => {
    async function check() {
      const user = await session;
      setUserSession(user);
    }
    check();
  }, [session]);
  //FIXING suppressHydrationWarning

  useEffect(() => {
    const { cartItems } = cart;
    const getCartCount = () => {
      return cartItems.reduce((qty, item) => qty + item.qty, 0);
    };
    setCartCount(getCartCount());
  }, [cart]);

  //HANDLE MENU CLICK ON MOBILE VIEW
  function handleSearch() {
    setClick(!click);
  }

  function goHome() {
    Router.push("/");
  }

  //CHECKING WINDOW WIDTH

  return (
    <div className={styles.container}>
      <div
        className={styles.logo}
        onClick={goHome}
        style={{ display: click ? "none" : "block" }}
      >
        <span className={styles.mainlogo}>
          <Image
            alt="image"
            src="/sam.svg"
            width="100"
            height="50"
            layout="fixed"
            objectFit="cover"
          />
        </span>
      </div>

      <div className={styles.mobile}>
        <ul
          className={styles.mobilelist}
          style={{ display: click ? "flex" : "none" }}
        >
          <li>
            <SearchBar />
          </li>
          <li onClick={handleSearch}>
            <CloseIcon />
          </li>
        </ul>
        <ul
          className={styles.mobilelist}
          style={{ display: click ? "none" : "flex" }}
        >
          <li onClick={handleSearch}>
            <SearchIcon />
          </li>
          <li>
            <Image
              alt="image"
              src="/icons/heart.png"
              width="28px"
              height="28px"
              layout="fixed"
            />
          </li>
          <li>
            <span
              className={styles.carts}
              onClick={() => Router.push("/cart")}
              style={{ userSelect: "none" }}
            >
              <div className={styles.cartCounts}>
                <p>{cartCount}</p>
              </div>
              <Image
                alt="image"
                src="/icons/cart.png"
                width="24px"
                height="24px"
                layout="fixed"
              />
            </span>
          </li>
          <li
            onClick={() => {
              if (!session) {
                Router.push("/login");
              } else {
                Router.push("/settings");
              }
            }}
          >
            <Avatar
              src={userSession?.user?.image}
              style={{ width: 26, height: 26, marginTop: -4 }}
            />
          </li>
        </ul>
      </div>

      <ul className={styles.menu}>
        <li className={styles.list}>
          <SearchBar />
        </li>
        <li
          className={styles.list}
          style={{ display: `${userSession ? "none" : " block"}` }}
          onClick={() => Router.push("/login")}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 15,
              fontFamily: "Poppins, sans-serif",
              cursor: "pointer",
              backgroundColor: "transparent",
              padding: "5px 16px",
              borderRadius: 20,
              color: "black",
              fontWeight: 400,
            }}
          >
            <PersonIcon fontSize="small" style={{ color: "black" }} />
            &nbsp;Login
          </span>
          <div className={styles.underline}></div>
        </li>

        <li
          className={`${styles.list} ${styles.megamenu} `}
          style={{
            display: `${userSession ? "flex" : " none"}`,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              textTransform: "capitalize",
              fontSize: 15,
            }}
          >
            {`Hi, ${userSession?.user?.name}`}
            &nbsp;
            <Avatar
              src={userSession?.user?.image}
              style={{ width: 26, height: 26, marginTop: -4 }}
            />
            <span style={{ paddingLeft: "5px", paddingTop: 6 }}>
              <Image
                alt="image"
                src="/icons/down-arrow.png"
                width="18px"
                height="18px"
                layout="fixed"
              />
            </span>
          </span>
          <div className={styles.submenu} style={{ fontSize: 13 }}>
            <span
              onClick={() => Router.push("/settings/account")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>Settings&nbsp;</p>
              <Image
                alt="image"
                src="/icons/settings.png"
                width="18px"
                height="18px"
                layout="fixed"
              />
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>My Orders&nbsp;</p>
              <Image
                alt="image"
                src="/icons/shopping-bag.png"
                width="18px"
                height="20px"
                layout="fixed"
              />
            </span>
            <span
              onClick={() => {
                signOut();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>Logout&nbsp;</p>
              <ExitToAppIcon fontSize="small" />
            </span>
          </div>
        </li>
        <li className={styles.list}>
          <span style={{ display: "flex", alignItems: "center" }}>
            <span style={{ padding: "0 10px" }}>
              <Image
                alt="image"
                src="/icons/heart.png"
                width="28px"
                height="28px"
                layout="fixed"
              />
            </span>
            <span
              style={{ padding: "0 10px" }}
              className={styles.cart}
              onClick={() => Router.push("/cart")}
            >
              <div className={styles.cartCount}>
                <p>{cartCount}</p>
              </div>
              <Image
                alt="image"
                src="/icons/cart.png"
                width="24px"
                height="24px"
                layout="fixed"
              />
            </span>
          </span>
          <div className={styles.underline}></div>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
