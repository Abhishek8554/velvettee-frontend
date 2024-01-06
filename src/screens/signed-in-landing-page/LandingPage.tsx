import { Carousel } from 'react-responsive-carousel';
import Header from '../../components/header/Header';
import styles from './LandingPage.module.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProductCard from '../../components/product-card/ProductCard';
import Footer from '../../components/footer/Footer';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className={styles.wrapper}>
            <Header showLogout={true} />
            <section className={styles.carousel_container}>
                <Carousel
                    infiniteLoop
                    autoPlay
                    emulateTouch
                    swipeable
                    showThumbs={false}
                    className={styles.carousel}
                    showArrows
                    showStatus={false}
                    renderArrowPrev={(clickHandler) => {
                        return (
                            <span
                                onClick={clickHandler}
                                className={`${styles.arrow} ${styles.prev}`}
                            >
                                <ChevronLeftIcon />
                            </span>
                        );
                    }}
                    renderArrowNext={(clickHandler) => {
                        return (
                            <span
                                onClick={clickHandler}
                                className={`${styles.arrow} ${styles.next}`}
                            >
                                <ChevronLeftIcon />
                            </span>
                        );
                    }}
                >
                    <div className={styles.carousel_item}>
                        <img src="/public/carouselImage.svg" />
                    </div>
                    <div className={styles.carousel_item}>
                        <img src="/public/carouselImage.svg" />
                    </div>
                    <div className={styles.carousel_item}>
                        <img src="/public/carouselImage.svg" />
                    </div>
                    <div className={styles.carousel_item}>
                        <img src="/public/carouselImage.svg" />
                    </div>
                </Carousel>
            </section>
            <section className={styles.top_deals_container}>
                <div className={styles.explore_all}>
                    <h1>Top Deals</h1>
                    <a className={styles.explore_all_btn}>
                        Explore All{' '}
                        <span>
                            {' '}
                            <ChevronRightIcon className="h-5 w-5" />
                        </span>
                    </a>
                </div>
                <div className={styles.cards_wrapper}>
                    <Link to="/product-details">
                        <ProductCard
                            id="1"
                            imageUrl="/public/product.jpeg"
                            originalPrice={1000}
                            sellingPrice={100}
                            productDescription="Detail of product1: Lorem Ipsum Lorem Ipsum"
                            productName="Shirt"
                        />
                    </Link>
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"

                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                    <ProductCard
                        id="1"
                        imageUrl="/public/product.jpeg"
                        originalPrice={1000}
                        sellingPrice={100}
                        productDescription="Detail of product: Lorem Ipsum Lorem Ipsum"
                        productName="Shirt"
                    />
                </div>
            </section>

            <section className={styles.bottom_ad}>
                <img src="/public/MicrosoftTeams-image (1).png " alt="" />
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
