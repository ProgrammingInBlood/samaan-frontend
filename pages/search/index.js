import Navbar from "../../components/NavBar";
import styles from "./Search.module.scss";
import { getSession } from "next-auth/client";

import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import SearchProducts from "../../components/utils/SearchProducts";

function Search({ session }) {
  const [data, setData] = useState([]);
  const Router = useRouter();
  const { search = "" } = Router.query;

  useEffect(() => {
    axios.get(`/api/search?search=${search}`).then((response) => {
      setData(response.data);
    });
  }, [data[0]?._id, Router]);

  return (
    <div>
      <Navbar session={session} />
      <Head>
        <title>Samaan - Ecommerce</title>
        <meta name="description" content="Samaan - Ecommerce" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
      </Head>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <p>Filters Here</p>
        </div>
        <div className={styles.searchResults}>
          <div className={styles.searchText}>
            <h2>
              Showing Results For <q>{search}</q>
            </h2>
            <p>{data?.count} items match your search </p>
          </div>

          <div className={styles.products}>
            {data?.data?.map((product) => {
              return (
                <SearchProducts
                  src={product.images}
                  name={product.name}
                  price={product.price}
                  id={product._id}
                  key={product._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await await getSession({ req });

  return {
    props: { session }, // will be passed to the page component as props
  };
}
