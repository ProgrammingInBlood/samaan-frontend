import Head from "next/head";

import HomePage from "../components/HomePage";
import Navbar from "../components/NavBar";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { getProducts as listProducts } from "../redux/actions/productAction";

import { getSession } from "next-auth/client";


export default function Home({ session }) {

  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.getProducts);

  const easing = [0.6, -0.05, 0.01, 0.99];
  const [login, setLogin] = useState(false);
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

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <motion.div
      variants={fadeInUp}
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
    >
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
      <HomePage getProducts={getProducts} />
    </motion.div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;

  const session = await await getSession({ req });

  return {
    props: { session }, // will be passed to the page component as props
  };
}
