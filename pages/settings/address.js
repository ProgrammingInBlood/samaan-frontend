import Navbar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import styles from "./address.module.scss";
function Address() {
  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.mainContent}>
        <Sidebar index={6} />
        <div className={styles.content}>
          <div className={styles.title}>
            <h1>Manage Addresses</h1>
          </div>
          <div className={styles.address}>
            <div className={styles.address_item}>
              <p>No Address added yet</p>
              <button>Add Address</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
