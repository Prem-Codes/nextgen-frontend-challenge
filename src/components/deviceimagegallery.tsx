import React, { useState, ReactElement } from "react";
import style from "./deviceimagegallery.module.scss";
import leftarrow from "../assets/icons/arrow-left.svg";
import rightarrow from "../assets/icons/arrow-right.svg";
type IImage = {
  imageUrls: { image: string; imageAlt: string }[];
};

// Carousel component
export const DeviceImageGallery = (imageUrl: IImage): ReactElement => {
  const [state, setState] = useState({
    activeIndex: 0,
  });

  const goToSlide = (index: number) => {
    setState({
      activeIndex: index,
    });
  };

  const goToPrevSlide = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    let index = state.activeIndex;
    const slides = imageUrl.imageUrls;
    const slidesLength = slides.length;

    if (index < 1) {
      index = slidesLength;
    }

    --index;

    setState({
      activeIndex: index,
    });
  };

  const goToNextSlide = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    let index = state.activeIndex;
    const slides = imageUrl.imageUrls;
    const slidesLength = slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    }

    ++index;

    setState({
      activeIndex: index,
    });
  };
  return (
    <div className={style.carouselcontainer}>
      <div className={style.carousel}>
        <div className="CarouselLeftArrow">
          <a
            href="#"
            className={style.carousel__arrow}
            onClick={goToPrevSlide}
            style={{ left: "32px" }}
          >
            <img className={style.arrows} src={leftarrow} alt="Left" />
          </a>
        </div>

        <ul className={style.carousel__slides}>
          {imageUrl.imageUrls.map((slide, index) => (
            <li
              key={index}
              className={style.carousel__slide}
              style={{ display: index == state.activeIndex ? "block" : "" }}
            >
              <img
                className={style.carouselslidecontent}
                src={`/static/devices/${slide.image}`}
              />
            </li>
          ))}
        </ul>

        <div className="CarouselRightArrow">
          <a
            href="#"
            className={style.carousel__arrow}
            onClick={goToNextSlide}
            style={{ right: "32px" }}
          >
            <img
              className={style.arrows}
              style={{ float: "right" }}
              src={rightarrow}
              alt="Right"
            />
          </a>
        </div>

        <ul className={style.carousel__indicators}>
          {imageUrl.imageUrls.map((_slide, index) => (
            <li key={index}>
              <a
                onClick={() => goToSlide(index)}
                className={style.carousel__indicator}
                style={{ display: index == state.activeIndex ? "block" : "" }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
