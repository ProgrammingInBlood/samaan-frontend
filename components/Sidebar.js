import styles from "./styles/Sidebar.module.scss";
import { useSession } from "next-auth/client";
import { Avatar } from "@material-ui/core";
import { signOut } from "next-auth/client";
import { useRouter } from "next/router";
import Image from "next/image";

function Sidebar({ index }) {
  const [session, loading] = useSession();
  console.log(session);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.profileInfo}>
          <Avatar
            style={{ height: "80px", width: "80px" }}
            alt="User Profile"
            // sx={{ width: 345, height: 345 }}
            src={session?.user?.image}
          />
          <div style={{ paddingLeft: 10 }}>
            <p style={{ fontSize: 18 }}>
              {session?.user?.name} {session?.user?.lastName}
            </p>
            <p style={{ textTransform: "lowercase" }}>{session?.user?.email}</p>
          </div>
        </div>
        <ul>
          <li
            className={index == 1 ? styles.active : ""}
            onClick={() => router.push("/settings/account")}
          >
            <Image
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
          <li>
            <Image
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
          <li
            className={index == 6 ? styles.active : ""}
            onClick={() => router.push("/settings/address")}
          >
            <Image
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
        </ul>
        <div className={styles.button}>
          <button onClick={() => signOut()}>Log out</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
