/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./slider.module.css";
import { useState, useEffect } from "react";
import { ReactComponent as NoImage } from "../../assets/img/image_no_icon_216618.svg";

interface SliderProps {
  images: any;
}

function Slider({ images }: SliderProps) {
  const [imagesState, setImagesState] = useState<any>({
    0: true,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [prevImageId, setPrevImageId] = useState<number>();
  const [mainImage, setMainImage] = useState<any>();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [sliderItems, setSliderItems] = useState<any>();

  const minSwipeDistance = 50;

  const onTouchStart = (e: any) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const id = Number(prevImageId);
    if (isLeftSwipe) {
      if (id < Object.keys(images).length - 1) {
        setImagesState({
          ...imagesState,
          [id + 1]: true,
          [id]: false,
        });
        setPrevImageId(id + 1);
        setMainImage(images?.[id + 1]?.props.src);
      }
    } else {
      if (id > 0) {
        setImagesState({
          ...imagesState,
          [id - 1]: true,
          [id]: false,
        });
        setPrevImageId(id - 1);
        setMainImage(images?.[id - 1].props.src);
      }
    }
  };

  useEffect(() => {
    if (!mainImage && images?.length !== 0) {
      setMainImage(images?.[0]?.props.src);
      setPrevImageId(0);
    }

    if (mainImage && images?.length === 0) {
      setMainImage(undefined);
      setSliderItems(undefined);
    }
  }, [images]);

  function renderSliderItems() {
    if (images?.length !== 0) {
      const newSliderItems = [];
      for (let i = 0; i < Object.keys(images).length; i++) {
        newSliderItems.push(
          <div
            className={`${styles.item} ${
              imagesState[i] ? styles.item_active : ""
            }`}
            key={i}
          ></div>
        );
      }
      setSliderItems(newSliderItems);
    }
  }

  useEffect(() => {
    if (images && Number(prevImageId) < Object.keys(images).length) {
      renderSliderItems();
    }
  }, [imagesState, images]);

  return (
    <div className={styles.slider}>
      {mainImage ? (
        <img
          className={styles.image}
          src={mainImage}
          alt=""
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
      ) : (
        <NoImage className={styles.image} />
      )}
      <div className={styles.slider_nav}>{sliderItems}</div>
    </div>
  );
}

export default Slider;
