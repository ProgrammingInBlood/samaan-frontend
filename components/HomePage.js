import styles from "./styles/HomePage.module.scss";
import ProductBox from "./utils/ProductBox";
import Slider from "./utils/Slider";
import ProductSlider from "./utils/ProductSlider";
import Image from "next/image";

function HomePage({ getProducts }) {
  return (
    <div className={styles.title}>
      <Slider />

      <div className={styles.banners}>
        <div className={styles.banner}>
          <img
            className={styles.image}
            src="https://images.bewakoof.com/uploads/grid/app/6th-Aug-Desktop-banner-Half-DOTD-Men-1628241980.jpg"
          />
        </div>
        <div className={styles.banner}>
          <img
            className={styles.image}
            src="https://images.bewakoof.com/uploads/grid/app/desktop-strips-1625745009.png"
          />
        </div>
      </div>

      <div className={styles.productSection}>
        <h1 className="title">Top Offers</h1>
        <div className={styles.products}>
          <ProductSlider getProducts={getProducts} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
