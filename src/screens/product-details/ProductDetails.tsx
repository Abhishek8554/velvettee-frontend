/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import styles from './ProductDetails.module.scss';
import Button, { ButtonTypes } from '../../components/Button';
import Carousel from 'react-multi-carousel';
import ProductCard from '../../components/product-card/ProductCard';
import 'react-multi-carousel/lib/styles.css';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/Auth';

const CustomRightArrow = ({ onClick }: any) => {
    return (
        <div
            className={`${styles.arrow} ${styles.arrow_right}`}
            onClick={() => onClick()}
        >
            <ChevronRightIcon />
        </div>
    );
};
const CustomLeftArrow = ({ onClick }: any) => {
    return (
        <div
            className={`${styles.arrow} ${styles.arrow_left}`}
            onClick={() => onClick()}
        >
            <ChevronLeftIcon />
        </div>
    );
};
export default function ProductDetails() {
    const auth = useAuthStore();
    const navigate = useNavigate();

    const sizes = [28, 30, 32, 34, 36, 38];

    const imagePath = '/public/product.jpeg';

    const [currentImage, setCurrentImage] = useState<string>(imagePath);
    const [selectedSize, setSelectedSize] = useState<number>(28);
    const [quantity, setQuantity] = useState<number>(1);
    const products = [
        {
            id: 1,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 2,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 3,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 4,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 5,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 6,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 7,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 8,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 9,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
        {
            id: 10,
            imageUrl: '/public/product.jpeg',
            originalPrice: 1000,
            sellingPrice: 100,
            productDescription: 'Detail of product: Lorem Ipsum Lorem Ipsum',
            productName: 'shirt',
        },
    ];

    const onAddToCart = () => {
        if (auth.token) {
            // Continue and add to cart
        } else {
            navigate('/signup');
        }
    };

    const onWishlist = () => {
        if (auth.token) {
            // Continue and add to wishlist
        } else {
            navigate('/signup');
        }
    };

    return (
        <div className={styles.wrapper}>
            <Header />
            <hr />

            <div className="mb-8">
                <div className="container mx-auto my-8 flex">
                    <nav className="text-sm">
                        <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                        >
                            Home
                        </a>
                        <span className="mx-2">/</span>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                        >
                            Category
                        </a>
                        <span className="mx-2">/</span>
                        <span className="text-gray-800 font-semibold">
                            Product Name
                        </span>
                    </nav>
                </div>

                <div
                    className={`container mx-auto my-8 flex  ${styles.container}`}
                >
                    <div
                        className={`w-1/2 ${styles.left_container} ${styles.web_container}`}
                    >
                        <div className="flex">
                            <div className={`mb-4 w-14 ${styles.small_images}`}>
                                <img
                                    src={imagePath}
                                    onClick={() => setCurrentImage(imagePath)}
                                    alt="Product Thumbnail"
                                    className={
                                        imagePath == currentImage
                                            ? 'w-14 h-auto  border-primary border-4'
                                            : 'w-14 h-auto'
                                    }
                                />
                                <img
                                    src={imagePath}
                                    onClick={() => setCurrentImage(imagePath)}
                                    alt="Product Thumbnail"
                                    className={
                                        imagePath == currentImage
                                            ? 'w-14 h-auto  border-primary border-2'
                                            : 'w-14 h-auto'
                                    }
                                />
                                <img
                                    src={imagePath}
                                    onClick={() => setCurrentImage(imagePath)}
                                    alt="Product Thumbnail"
                                    className={
                                        imagePath == currentImage
                                            ? 'w-14 h-auto  border-primary border-2'
                                            : 'w-14 h-auto'
                                    }
                                />
                                <img
                                    src={imagePath}
                                    onClick={() => setCurrentImage(imagePath)}
                                    alt="Product Thumbnail"
                                    className={
                                        imagePath == currentImage
                                            ? 'w-14 h-auto border-primary border-2'
                                            : 'w-14 h-auto'
                                    }
                                />
                            </div>

                            <div className="flex-1">
                                <img
                                    src={currentImage}
                                    alt="Enlarged Photo 1"
                                    className="w-full ml-4 h-auto mb-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className={`w-1/2 ${styles.left_container} ${styles.mobile_container}`}
                    >
                        <Carousel
                            additionalTransfrom={0}
                            autoPlaySpeed={3000}
                            centerMode={false}
                            containerClass="carousel-container w-full"
                            dotListClass=""
                            draggable
                            focusOnSelect={false}
                            infinite
                            keyBoardControl
                            minimumTouchDrag={80}
                            pauseOnHover
                            renderButtonGroupOutside={false}
                            renderDotsOutside={false}
                            responsive={{
                                desktop: {
                                    breakpoint: {
                                        max: 3000,
                                        min: 1024,
                                    },
                                    items: 1,
                                    partialVisibilityGutter: 40,
                                },
                                mobile: {
                                    breakpoint: {
                                        max: 464,
                                        min: 0,
                                    },
                                    items: 1,
                                    partialVisibilityGutter: 30,
                                },
                                tablet: {
                                    breakpoint: {
                                        max: 1024,
                                        min: 464,
                                    },
                                    items: 1,
                                    partialVisibilityGutter: 30,
                                },
                            }}
                            rewind={false}
                            rewindWithAnimation={false}
                            rtl={false}
                            shouldResetAutoplay
                            showDots
                            slidesToSlide={1}
                            swipeable
                            arrows={false}
                        >
                            <div className={styles.carousel_image_container}>
                                <img src={imagePath} />
                            </div>
                            <div className={styles.carousel_image_container}>
                                <img src={imagePath} />
                            </div>
                            <div className={styles.carousel_image_container}>
                                <img src={imagePath} />
                            </div>
                            <div className={styles.carousel_image_container}>
                                <img src={imagePath} />
                            </div>
                            <div className={styles.carousel_image_container}>
                                <img src={imagePath} />
                            </div>
                            <div className={styles.carousel_image_container}>
                                <img src={imagePath} />
                            </div>
                        </Carousel>
                    </div>

                    <div
                        className={`w-1/2 mt-4 ml-12 ${styles.right_container}`}
                    >
                        <h1 className="text-2xl font-bold mb-4 text-black">
                            Product Company Name
                        </h1>
                        <p className="text-gray-600 mb-4 text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>

                        <div className="mb-4">
                            <span className="font-bold text-2xl text-primary">
                                {' '}
                                &#8377;{' '}
                            </span>
                            <span className="font-bold text-2xl">
                                {' '}
                                47,00,000
                            </span>
                            <span className="text-sm ml-2">
                                <s> &#8377; 47,00,000 </s>
                            </span>
                            <span className="text-xl text-bold ml-2 font-bold text-primary">
                                {' '}
                                (50% Off){' '}
                            </span>
                        </div>

                        <div className="text-l text-primary font-bold mb-8">
                            <p>Inclusive of all taxes</p>
                        </div>

                        <div className="text-xs font-bold mb-8">
                            <p> MORE COLOR </p>
                            <div className="flex mt-3">
                                <img
                                    src={imagePath}
                                    onClick={() => setCurrentImage(imagePath)}
                                    alt="Product Thumbnail"
                                    className={
                                        imagePath == currentImage
                                            ? 'w-14 h-auto border border-primary border-4'
                                            : 'w-14 h-auto'
                                    }
                                />
                                <img
                                    src={imagePath}
                                    onClick={() => setCurrentImage(imagePath)}
                                    alt="Product Thumbnail"
                                    className={
                                        imagePath == currentImage
                                            ? 'w-14 ml-4 h-auto border border-primary border-2'
                                            : 'w-14 h-auto'
                                    }
                                />
                                <img
                                    src={imagePath}
                                    onClick={() => setCurrentImage(imagePath)}
                                    alt="Product Thumbnail"
                                    className={
                                        imagePath == currentImage
                                            ? 'w-14 ml-4 h-auto border border-primary border-2'
                                            : 'w-14 h-auto'
                                    }
                                />
                                <img
                                    src={imagePath}
                                    onClick={() => setCurrentImage(imagePath)}
                                    alt="Product Thumbnail"
                                    className={
                                        imagePath == currentImage
                                            ? 'w-14 ml-4 h-auto border border-primary border-2'
                                            : 'w-14 h-auto'
                                    }
                                />
                            </div>
                        </div>

                        <div className="font-bold text-xs mb-8">
                            <p> SELECT SIZE </p>
                            <div className="flex mt-3">
                                {sizes.map((each) => {
                                    return (
                                        <button
                                            key={each}
                                            onClick={() =>
                                                setSelectedSize(each)
                                            }
                                            className={`circle flex mr-3 justify-center items-center ${
                                                selectedSize === each &&
                                                'circle-active'
                                            }`}
                                        >
                                            <span className="text-xs font-light">
                                                {each}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <p className="my-4">Qty </p>
                        <div className="flex w-fit justify-center quantity-conatiner mb-8">
                            <button
                                className="quantity-circle flex mr-5 justify-center items-end"
                                disabled={quantity == 1}
                                onClick={() => setQuantity(quantity - 1)}
                            >
                                &minus;
                            </button>

                            <span className="text-xs font-bold">
                                {quantity}
                            </span>

                            <button
                                className="quantity-circle flex ml-5 justify-center items-end"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                &#43;
                            </button>
                        </div>

                        <div className="action-buttons flex mb-8">
                            <div className="w-fit mr-3">
                                <Button
                                    text="ADD TO CART"
                                    className="font-bold"
                                    Icon={ShoppingCartIcon}
                                    onClick={onAddToCart}
                                />
                            </div>
                            <div className="w-fit">
                                <Button
                                    text="WISHLIST"
                                    type={ButtonTypes.OUTLINE}
                                    className="font-bold bg-white border-0  "
                                    Icon={HeartIcon}
                                    onClick={onWishlist}
                                />
                            </div>
                        </div>

                        <div className="">
                            <div className="text-xl text-primary font-bold mb-4">
                                <p> Product Details </p>
                            </div>

                            <div>
                                <ul className="list-disc text-s ml-6">
                                    <li className="mb-2">Material</li>
                                    <li className="mb-2">Regular Fit</li>
                                    <li className="mb-2">Machine Wash</li>
                                    <li className="mb-2">
                                        Manufactured by : Lorem Ipsum Lorem
                                        Ipsum Lorem Ipsum Lorem Ipsum Lorem
                                        Ipsum Lorem Ipsum Lorem Ipsum
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />
            </div>

            <div className={`container mx-auto mb-8`}>
                <p className="text-l font-bold"> Similar styles </p>

                <div className="mt-8">
                    <Carousel
                        additionalTransfrom={0}
                        arrows
                        autoPlaySpeed={3000}
                        centerMode={false}
                        className=""
                        containerClass="carousel-container w-full"
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        // infinite
                        // itemClass="ml-2"
                        keyBoardControl
                        minimumTouchDrag={80}
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            desktop: {
                                breakpoint: {
                                    max: 3000,
                                    min: 1024,
                                },
                                items: 4,
                                partialVisibilityGutter: 40,
                            },
                            mobile: {
                                breakpoint: {
                                    max: 464,
                                    min: 0,
                                },
                                items: 1,
                                partialVisibilityGutter: 30,
                            },
                            tablet: {
                                breakpoint: {
                                    max: 1024,
                                    min: 464,
                                },
                                items: 2,
                                partialVisibilityGutter: 30,
                            },
                        }}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                        customLeftArrow={<CustomLeftArrow />}
                        customRightArrow={<CustomRightArrow />}
                    >
                        {products.map((product) => (
                            <Link
                                className="mx-4 inline-block"
                                to={`/product-detail/${product.id}`}
                            >
                                <ProductCard
                                    id={product.id.toString()}
                                    imageUrl={product.imageUrl}
                                    originalPrice={product.originalPrice}
                                    sellingPrice={product.sellingPrice}
                                    productDescription={
                                        product.productDescription
                                    }
                                    productName={product.productName}
                                />
                            </Link>
                        ))}
                    </Carousel>
                </div>
            </div>

            <hr />
            <Footer />
        </div>
    );
}
