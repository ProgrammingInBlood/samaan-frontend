import Image from "next/image";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./styles/Slider.module.scss";

function Slider() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={false}
        showDots={true}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div className={styles.imageBox}>
          <img
            alt="image"
            className={styles.image}
            src="https://images.bewakoof.com/uploads/grid/app/bazaar-hero-banner-men-1626189046.jpg"
          />
        </div>
        <div className={styles.imageBox}>
          <img
            alt="image"
            className={styles.image}
            src="https://images.bewakoof.com/uploads/grid/app/vest-hero-banner-men-1626965578.jpg"
          />
        </div>
        <div className={styles.imageBox}>
          <img
            alt="image"
            className={styles.image}
            src="https://images.bewakoof.com/uploads/grid/app/loki-marvel-hero-banner-1626697278.jpg"
          />
        </div>
        <div className={styles.imageBox}>
          <img
            alt="image"
            className={styles.image}
            src="https://images.bewakoof.com/uploads/grid/app/Hero-Banner-Tshirt-Men-1-1626853726.jpg"
          />
        </div>
        <div className={styles.imageBox}>
          <img
            alt="image"
            className={styles.image}
            src="https://images.bewakoof.com/uploads/grid/app/azadi-hero-banner-live-men-1628260941.jpg"
          />
        </div>
        <div className={styles.imageBox}>
          <img
            alt="image"
            className={styles.image}
            src="https://images.bewakoof.com/uploads/grid/app/b2g1-hero-banner-men-1626697277.jpg"
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Slider;
