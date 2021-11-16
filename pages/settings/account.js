import axios from "axios";
import { getSession } from "next-auth/client";
import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/NavBar";
import styles from "./account.module.scss";
import Head from "next/head";
import { Avatar, Badge } from "@mui/material";
import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import ChangePassword from "../../components/modals/ChangePassword";

function Account({ updateSession, userData }) {
  const imageRef = useRef();
  const router = useRouter();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState();
  const [toggle, setToggle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setEmail(userData.email);
    setName(userData.firstName);
    setLastName(userData.setLastName);
  }, [userData.firstName, userData.lastName, userData.email]);

  const handleEdit = () => {
    setToggle(!toggle);
  };

  const handleUpload = async () => {
    let tempImageUrl = "";
    const cloudinaryGetUrl = async () => {
      const data = new FormData();
      data.append("image", image);
      try {
        await axios(`/api/image`, {
          method: "POST",
          data: data,
          "content-type": "multipart/form-data",
        }).then(async (response) => {
          tempImageUrl = await response.data[0];
          console.log(response.data[0]);
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    await cloudinaryGetUrl();

    const updateAvatar = async () => {
      try {
        axios
          .patch("/api/user/uploadImage", { avatar: tempImageUrl })
          .then((response) => {
            setImage("");
            router.reload();
          });
      } catch (err) {
        console.log(err);
      }
    };
    await updateAvatar();
  };

  useEffect(() => {
    if (!toggle) {
      setName(userData.firstName);
      setLastName(userData.setLastName);
    }
  }, [name, email, toggle]);

  const handleRequest = async () => {
    await axios.patch("/api/user/update", {
      firstName: name,
      lastName: lastName,
    });
    router.reload();
  };

  return (
    <div>
      <Navbar />

      <Head>
        <title>Account Settings</title>
        <meta name="description" content="Login-Samaan" />
        <link rel="icon" href={userData.avatar} />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
      </Head>
      <div className={styles.bodyContainer}>
        <Sidebar index={1} />
        <div className={styles.modalfix}>
          <ChangePassword
            onClose={() => setShowPassword(false)}
            show={showPassword}
          />
          <div className={styles.container}>
            <div className={styles.userImage}>
              <Badge
                className={styles.badge}
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Avatar
                    className={styles.smallAvatar}
                    style={{ height: "22px", width: "22px" }}
                    iconalt="Remy Sharp"
                    src="/settings/pencil.png"
                  />
                }
              >
                <Avatar
                  style={{ height: "100px", width: "100px" }}
                  className={styles.avatar}
                  alt="Travis Howard"
                  src={userData.avatar}
                />
                <p
                  onClick={() => imageRef.current.click()}
                  className={styles.imageText}
                >
                  Edit Image
                </p>
              </Badge>
              <p>Edit Profile Photo</p>
              <button
                className={styles.button}
                onClick={handleUpload}
                style={{ display: image ? "block" : "none", width: 200 }}
              >
                Upload Image
              </button>
              <input
                ref={imageRef}
                style={{ display: "none" }}
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                name="avatar"
              />
            </div>
            <div className={styles.mainContainer}>
              <div className={styles.personal}>
                <h3>Personal Information</h3>
                <p onClick={handleEdit}>edit</p>
                <div className={styles.inputs}>
                  <div className={styles.flex}>
                    <div>
                      <label>First Name</label>
                      <input
                        value={toggle ? name : userData.firstName}
                        disabled={!toggle}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Last Name</label>
                      <input
                        value={toggle ? lastName : userData.lastName}
                        disabled={!toggle}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <span style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      className={styles.button}
                      onClick={handleRequest}
                      style={
                        toggle
                          ? { display: "inline-block" }
                          : { display: "none" }
                      }
                    >
                      Save
                    </button>
                  </span>
                  <div>
                    <label>Email</label>
                    <input
                      value={email}
                      disabled={!toggle}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.personal}>
                <h3>Manage Account</h3>

                <div className={styles.inputs}>
                  <div>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <button
                        className={styles.button}
                        style={{
                          width: "100%",
                          padding: "20px 15px",
                          borderRadius: 25,
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                        onClick={() => setShowPassword(true)}
                      >
                        Change Password
                      </button>
                    </span>
                  </div>

                  <div>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <button
                        className={styles.button}
                        style={{
                          width: "100%",
                          borderRadius: 25,
                          fontSize: "1rem",
                          fontWeight: "bold",
                          padding: "20px 15px",
                        }}
                      >
                        Deactivate Account
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
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

  const fetchUserData = await axios.get(
    `${process.env.MY_DOMAIN}/api/user/${session.user.id}`
  );

  const userData = fetchUserData.data;
  return {
    props: { session, userData },
  };
}
