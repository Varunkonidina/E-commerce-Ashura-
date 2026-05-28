import React, { useEffect } from "react";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import "./Slide.css";

const Slide = () => {
  useEffect(() => {
    const carousel = document.getElementById("carouselExampleAutoplaying");

    if (!carousel) return;

    const bsCarousel = window.bootstrap.Carousel.getOrCreateInstance(carousel, {
      interval: 3000, // 3 seconds
      ride: "carousel",
    });

    bsCarousel.cycle();

    return () => {
      bsCarousel.dispose();
    };
  }, []);

  return (
    <div className="carousel-container ">
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
      >
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img src={slide1} className="carousel-img" alt="slide1" />
          </div>

          <div className="carousel-item">
            <img src={slide2} className="carousel-img" alt="slide2" />
          </div>

          <div className="carousel-item">
            <img src={slide3} className="carousel-img" alt="slide3" />
          </div>

        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
};

export default Slide;