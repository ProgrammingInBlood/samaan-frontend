import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./styles/CartItems.module.scss";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

function CartItems({ item, removeFromCartHandler, qtyHandler }) {
  const [qty, setQty] = useState(item.qty);

  useEffect(() => {
    console.log(qty);
    qtyHandler(item.product, qty);
  }, [qty]);
  function decreaseQty() {
    setQty(parseInt(qty) > 1 ? parseInt(qty) - 1 : parseInt(qty));
  }
  function increaseQty() {
    setQty(
      parseInt(qty) > 0 && qty < item.orderPerUser
        ? parseInt(qty) + 1
        : parseInt(qty)
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.productDetails}>
        <div>
          <p>{item.name}</p>
          <h3>₹{item.price}</h3>
          <div
            className="count-content"
            style={{
              height: 35,
              margin: "10px 0",
              background: "white",
              color: "black",
            }}
          >
            <span onClick={decreaseQty} style={{ cursor: "pointer" }}>
              <RemoveIcon fontSize="small" />
            </span>
            <select
              style={{ height: 35, background: "white", color: "black" }}
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value))}
            >
              {[...Array(item.orderPerUser).keys()].map((count) => (
                <option key={count + 1} value={count + 1}>
                  {count + 1}
                </option>
              ))}
            </select>
            <span onClick={increaseQty} style={{ cursor: "pointer" }}>
              <AddIcon fontSize="small" />
            </span>
          </div>
        </div>
        <Image src={item.images} width="100" height="100" objectFit="contain" />
      </div>
      <div className={styles.buttons}>
        <button onClick={() => removeFromCartHandler(item.product)}>
          Remove
        </button>
        <button>Move to WishList</button>
      </div>
    </div>
  );
}

export default CartItems;
