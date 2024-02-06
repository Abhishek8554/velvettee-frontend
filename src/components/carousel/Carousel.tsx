import { useRef, useState } from 'react';
import SwiperClass from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Carousel.module.scss';

import 'swiper/swiper-bundle.css';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';
// import 'swiper/css/autoplay.css';

const Carousel = () => {
    const swiperRef = useRef<SwiperClass>();
    const [activeIndex, setActiveIndex] = useState(0);
    const calculateProgressPercentage = (init?: boolean) => {
        if (swiperRef && swiperRef.current) {
            if (!init) {
                if (activeIndex > swiperRef.current.slides.length - 2) {
                    setActiveIndex(0);
                } else {
                    setActiveIndex(activeIndex + 1);
                }
            }
        }
    };
    const nextSlide = () => {
        swiperRef.current?.slideNext();
    };

    const prevSlide = () => {
        swiperRef.current?.slidePrev();
    };
    const onSwiperInit = (swiper: SwiperClass) => {
        swiperRef.current = swiper;
        calculateProgressPercentage(true);
    };
    return (
        <div className={styles.wrapper}>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                onSlideChangeTransitionStart={() => {
                    calculateProgressPercentage(false);
                }}
                autoplay={{
                    delay: 3000,
                }}
                modules={[Autoplay]}
                loop={true}
                onSlideChange={() => {}}
                onSwiper={onSwiperInit}
            >
                <SwiperSlide>
                    <div className={styles.slide}>
                        <img src="image.png" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.slide}>
                        <img src="image.png" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.slide}>
                        <img src="image.png" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.slide}>
                        <img src="image.png" />
                    </div>
                </SwiperSlide>
            </Swiper>
            <div className={styles.controls}>
                <div className={styles.top}>
                    <button
                        className={styles.arrow_buttons}
                        onClick={prevSlide}
                    >
                        <ChevronLeftIcon />
                    </button>
                    <div className={styles.progress_bar}>
                        {swiperRef &&
                            swiperRef.current &&
                            swiperRef.current.slides &&
                            swiperRef.current.slides.length && (
                                <div
                                    className={styles.progress}
                                    style={{
                                        width: `${
                                            ((activeIndex + 1) /
                                                swiperRef.current?.slides
                                                    .length) *
                                            100
                                        }%`,
                                    }}
                                ></div>
                            )}
                    </div>
                    <button
                        className={styles.arrow_buttons}
                        onClick={nextSlide}
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.thumbs}>
                        {swiperRef &&
                            swiperRef.current &&
                            swiperRef.current.slides &&
                            swiperRef.current.slides.length &&
                            swiperRef.current?.slides.map((x, index) => (
                                <span
                                    className={`${styles.thumb} ${
                                        index === activeIndex
                                            ? styles.active
                                            : ''
                                    }`}
                                >
                                    {/* {index} */}
                                </span>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
