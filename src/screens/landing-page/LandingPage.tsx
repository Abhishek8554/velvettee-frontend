/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '../../components/header/Header';
import styles from './LandingPage.module.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProductCard from '../../components/product-card/ProductCard';
import Footer from '../../components/footer/Footer';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Carousel from '../../components/carousel/Carousel';

const LandingPage = () => {
    const products = [
        {
            id: 1,
            imageUrl: 'product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 2,
            imageUrl: 'product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 3,
            imageUrl: 'product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 4,
            imageUrl: 'product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 5,
            imageUrl: 'product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 6,
            imageUrl: 'product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 7,
            imageUrl: 'product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 8,
            imageUrl: 'product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 9,
            imageUrl: 'product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 10,
            imageUrl: 'product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
    ];
    return (
        <div className={styles.wrapper}>
            <Header />
            <section className={styles.carousel_container}>
                <Carousel />
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
                    {products.map((product) => (
                        <Link to={`/product-detail/${product.id}`}>
                            <ProductCard
                                id={product.id.toString()}
                                imageUrl={product.imageUrl}
                                originalPrice={product.originalPrice}
                                sellingPrice={product.sellingPrice}
                                productDescription={product.productDescription}
                                productName={product.productName}
                                product={product}
                            />
                        </Link>
                    ))}
                </div>
            </section>

            <section className={styles.bottom_ad}>
                <img src="MicrosoftTeams-image (1).png " alt="" />
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
