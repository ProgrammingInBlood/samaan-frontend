import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./ChangePassword.module.scss";

function ChangePassword({ show, onClose }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setPassword("");
    setConfirmPassword("");
    setOldPassword("");
    setError("");
  }, [show]);

  if (!show) {
    return null;
  }

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError("New Passwords does not matched");
      return;
    } else {
      axios
        .post("/api/changePassword", {
          oldPassword: oldPassword,
          password: password,
        })
        .then((res) => {
          if (res.data.success) {
            setError(res.data.message);
          } else {
            setError(res.data.message);
          }
        });
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.modal}>
          <h1>Change Password</h1>
        </div>
        <input
          onChange={(e) => setOldPassword(e.target.value)}
          type="text"
          value={oldPassword}
          placeholder="Old Password"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          vaslue={password}
          placeholder="New Password"
        />
        <input
          style={{
            border: password !== confirmPassword ? "1px solid red" : "",
          }}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
        />
        <p className={styles.error}>{error}</p>
        <div className={styles.buttons}>
          <button className={styles.button1} onClick={handleSubmit}>
            Change Password
          </button>
          <button className={styles.button2} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
