import styles from "./styles/SearchProducts.module.scss";
import Image from "next/image";
import router from "next/router";
import { Rating } from "@mui/material";

function SearchProducts({ name, src, price, id }) {
  return (
    <div
      className={styles.container}
      onClick={() => router.push(`product/${id}`)}
    >
      <div className={styles.imageBox}>
        <Image
          alt={name}
          priority={true}
          src={src}
          height={200}
          width={200}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <div>
        <p style={{ fontWeight: 600, fontSize: 16 }}>{name}</p>
        <h1>₹{price}</h1>
        <Rating
          value={3}
          max={5}
          onChange={(value) => console.log(`Rated with value ${value}`)}
          readOnly={true}
        />

        <p>
          <span style={{ fontWeight: 600 }}>FREE Delivery </span>by Samaan
        </p>
      </div>
    </div>
  );
}

export default SearchProducts;
