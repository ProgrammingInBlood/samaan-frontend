import { useState } from "react";
import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Loading from "../Loading";
import ProductBox from "./ProductBox";

function Slider({ getProducts }) {
  const [windowDimensions, setWindowDimensions] = useState(0);

  const { products, loading, error } = getProducts;
  const [things, setThings] = useState([]);

  useEffect(() => {
    setThings(products);
  }, [products, things]);

  useEffect(() => {
    setWindowDimensions(window.innerWidth);
    function handleResize(e) {
      setWindowDimensions(e.currentTarget.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowDimensions]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div>
      <div>
        {loading ? (
          <Loading />
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={false}
              showDots={false}
              ssr={true} // means to render carousel on server-side.
              infinite={false}
              autoPlay={false}
              autoPlaySpeed={5000}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              // deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {products.map((item) => (
                <ProductBox
                  id={item._id}
                  key={item._id}
                  src={item.images}
                  name={item.name}
                  price={item.price}
                />
              ))}
            </Carousel>
          </>
        )}
      </div>
    </div>
  );
}

export default Slider;
