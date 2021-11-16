import styles from "./Cart.module.scss";
import CartItems from "../../components/utils/CartItems";
import Navbar from "../../components/NavBar";
import { useDispatch, useSelector } from "react-redux";

//actions
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import { getSession } from "next-auth/client";
import axios from "axios";
import router from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

function Cart() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const { cartItems } = cart;
    setCartItems(cartItems);
  }, [cart]);

  const qtyHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getSubTotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };

  let cartArray = [];

  cartItems.map((item) => {
    let data = {
      quantity: item.qty,
      name: item.name,
      images: [item.images],
      amount: Math.round(item.price * 100),
      currency: "inr",
    };

    cartArray.push(data);
  });

  const redirectToCheckout = async () => {
    const { data } = await axios.post("/api/checkout", {
      items: cartArray,
    });

    if (data) {
      await router.push(data.url);
    }
  };

  return (
    <div>
      <Navbar />
      <Head>
        <title>Cart</title>
        <meta name="description" content="Samaan - Ecommerce" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
      </Head>
      <div className={styles.container}>
        <div className={styles.cartItems}>
          {cartItems.length === 0 ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>Your Cart Is Empty</p>
            </div>
          ) : (
            <div>
              <p>
                My Bag <span> {cartItems.length} item (s)</span>
              </p>
              {cartItems.map((item) => {
                return (
                  <CartItems
                    key={item.product}
                    item={item}
                    removeFromCartHandler={removeFromCartHandler}
                    qtyHandler={qtyHandler}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className={styles.checkout}>
          <p>
            Get flat Rs 150 Discount on your First Purchase above Rs.699 and
            Free shipping. Coupon code - NEW150
          </p>
          <div className={styles.invoice}>
            <div className={styles.price}>
              <p>Price Summary </p>
            </div>
            <div className={styles.price}>
              <p>Total MRP (Incl. of taxes) </p>
              <p>
                {cartItems.length === 0 ? "₹0" : `₹${getSubTotal().toFixed(2)}`}
              </p>
            </div>
            <div className={styles.price}>
              <p>Delivery Fee </p>
              <p>FREE</p>
            </div>
            <div className={styles.price}>
              <p>Bag Discount </p>
              <p>₹ 1024</p>
            </div>
            <div className={styles.price}>
              <p>Subtotal </p>
              <p>₹ {getSubTotal().toFixed(2)}</p>
            </div>
            <p className={styles.green} style={{ textAlign: "center" }}>
              You are saving ₹ 3090 on this order
            </p>

            <div className={styles.finalCheckout}>
              <div className={styles.text}>
                <p>Total</p>
                <p>₹{getSubTotal().toFixed(2)}</p>
              </div>
              <div>
                <button onClick={redirectToCheckout}>
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mobile}>
        <div className={styles.finalCheckouts}>
          <div className={styles.text}>
            <p>Total</p>
            <p>₹{getSubTotal().toFixed(2)}</p>
          </div>
          <div>
            <button onClick={redirectToCheckout}>Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await await getSession({ req });
  return {
    props: { session }, // will be passed to the page component as props
  };
}
