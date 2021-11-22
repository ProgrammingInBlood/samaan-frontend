import Image from "next/image";
import Navbar from "../../components/NavBar";
import styles from "./Details.module.scss";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { getProductsDetails } from "../../redux/actions/productAction";
import { addToCart } from "../../redux/actions/cartActions";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import Loading from "../../components/Loading";
import { useRouter } from "next/router";
import Head from "next/head";

function Details() {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const easing = [0.6, -0.05, 0.01, 0.99];
  const [image, setImage] = useState("");

  const fadeInUp = {
    initial: {
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
  };
  const dispatch = useDispatch();
  const productsDetails = useSelector((state) => state.getProductsDetails);
  const { products, loading, error } = productsDetails;

  useEffect(() => {
    if (products && router.query.id !== products._id) {
      dispatch(getProductsDetails(router.query.id));
    }
    if (products && products?.images?.length > 0) {
      setImage(products?.images[0]);
    }
  }, [dispatch, products, router, router.query.id]);
  console.log(image);
  function decreaseQty() {
    setQty(parseInt(qty) > 1 ? parseInt(qty) - 1 : parseInt(qty));
  }
  function increaseQty() {
    setQty(
      parseInt(qty) > 0 && qty < products.orderPerUser
        ? parseInt(qty) + 1
        : parseInt(qty)
    );
  }

  const addToCartHandler = () => {
    dispatch(addToCart(products._id, parseInt(qty)));
    router.push("/cart", null, { shallow: true });
  };

  const calculateDiscount = (price, salePrice) => {
    return parseInt(((price - salePrice) / price) * 100);
  };

  return (
    <motion.div
      variants={fadeInUp}
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
    >
      {loading ? (
        <Loading />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className={styles.container}>
            <Head>
              <title>Samaan - Ecommerce</title>
              <meta name="description" content="Samaan - Ecommerce" />
              <link rel="icon" href="/favicon.ico" />
              <meta
                name="viewport"
                content="width=device-width, user-scalable=no"
              ></meta>
            </Head>
            <Navbar />
            <div className={styles.main}>
              <div className={styles.images}>
                <div className={styles.image}>
                  <ul>
                    {products?.images?.map((image) => (
                      <li className={styles.img} key={image}>
                        <Image
                          alt="product-image"
                          priority={true}
                          src={products?.images ? image : "/product-1.jpeg"}
                          width="50"
                          height="50"
                          objectFit="cover"
                          onClick={() => setImage(image)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.mainImage}>
                  <Image
                    alt="product-image"
                    priority={true}
                    src={image ? image : "/product-1.jpeg"}
                    width="500"
                    height="500"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className={styles.detailsContainer}>
                <div className={styles.details}>
                  <h2 className="info-subtitle">{products.brand}</h2>
                  <h1 className="info-title">{products.name}</h1>
                  <div className={styles.price}>
                    <h3>₹{products.price}</h3>
                    <del>₹89,990</del>
                    <h2>
                      {calculateDiscount(parseInt(products.price), 89990)}% off
                    </h2>
                  </div>

                  <div className={styles.description}>
                    <h4>Description</h4>

                    <div className={styles.descriptionText}>
                      {products.description}
                    </div>
                  </div>
                </div>
                {products.countInStock > 0 ? (
                  <div className={styles.counter}>
                    <div className={styles.count}>
                      <div className="count-content">
                        <span
                          onClick={decreaseQty}
                          style={{ cursor: "pointer" }}
                        >
                          -
                        </span>
                        <select
                          value={qty}
                          onChange={(e) => setQty(parseInt(e.target.value))}
                        >
                          {[...Array(products.orderPerUser).keys()].map(
                            (count) => (
                              <option key={count + 1} value={count + 1}>
                                {count + 1}
                              </option>
                            )
                          )}
                        </select>
                        <span
                          onClick={increaseQty}
                          style={{ cursor: "pointer" }}
                        >
                          +
                        </span>
                      </div>

                      <div className="price">
                        <span
                          className={styles.button}
                          onClick={addToCartHandler}
                        >
                          Add to Cart &nbsp;{" "}
                          <AddShoppingCartIcon fontSize="small" />
                        </span>
                        <span href="" className={styles.button}>
                          <FavoriteBorderIcon fontSize="medium" />
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default Details;

export async function getServerSideProps(context) {
  const { req } = context;
  console.log(req);
  const session = await await getSession({ req });

  return {
    props: { session }, // will be passed to the page component as props
  };
}
