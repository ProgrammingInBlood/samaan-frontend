import styles from "./styles/ProductBox.module.scss";

import Image from "next/image";
import router from "next/router";

function ProductBox({ name, src, price, id }) {
  return (
    <div
      className={styles.container}
      onClick={() => router.push(`product/${id}`)}
    >
      <div className={styles.imageBox}>
        <Image
          priority={true}
          src={src}
          height={200}
          width={200}
          layout="responsive"
          objectFit="cover"
        />
      </div>

      <p>{name}</p>
      <h1>₹{price}</h1>
    </div>
  );
}

export default ProductBox;