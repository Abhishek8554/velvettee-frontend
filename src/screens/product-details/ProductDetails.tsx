/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import styles from './ProductDetails.module.scss';
import Button, { ButtonTypes } from '../../components/Button';
import Carousel from 'react-multi-carousel';
import ProductCard from '../../components/product-card/ProductCard';
import 'react-multi-carousel/lib/styles.css';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeart } from '@heroicons/react/24/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuthStore from '../../stores/Auth';
import useApi from '../../hooks/useApi';
import useSnackBar from '../../stores/Snackbar';
import { SnackBarTypes } from '../../enums/SnackBarTypes';
import useWishlist from '../../stores/Wishlist';
import useCart from '../../stores/Cart';

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
    const [product, setProduct] = useState<any>(null);
    const [similarProducts, setSimilarProducts] = useState<any[] | null>(null);
    const [sizes, setSizes] = useState<number[] | []>([]);

    const imagePath = '/public/product.jpeg';
    const params = useParams();
    const api = useApi();
    const wishlist = useWishlist();
    const cart = useCart();
    const snackbar = useSnackBar();
    const [currentImage, setCurrentImage] = useState<string>(imagePath);
    const [selectedSize, setSelectedSize] = useState<number>(28);
    const [quantity, setQuantity] = useState<number>(1);
    const fetchProduct = (id: string, isSimilar = false) => {
        api.get(`/products/getproductbyid/${id}`)
            .then((product) => {
                if (!isSimilar) {
                    setProduct(product.data);
                    setSizes(product.data.size);
                } else {
                    setSimilarProducts((pre) => {
                        if (pre) {
                            return [...pre, product];
                        } else {
                            return [product];
                        }
                    });
                }
            })
            .catch((error) => {
                snackbar.open(error, SnackBarTypes.DANGER);
            });
    };
    useEffect(() => {
        fetchProduct(params.id as string);
    }, []);
    useEffect(() => {
        if (
            product &&
            product.similarProducts &&
            product.similarProducts.length
        ) {
            product.similarProducts.map((id: string) => {
                fetchProduct(id, true);
            });
        }
    }, [product]);

    const onAddToCart = () => {
        if (auth.token) {
            // Continue and add to wishlist
            if (cart.cart.find((x) => x._id === product._id)) {
                cart.remove(product._id);
            } else {
                cart.add(product);
            }
        } else {
            navigate('/signup');
        }
    };

    const onWishlist = () => {
        if (auth.token) {
            // Continue and add to wishlist
            if (wishlist.wishlist.find((x) => x._id === product._id)) {
                wishlist.remove(product._id);
            } else {
                wishlist.add(product);
            }
        } else {
            navigate('/signup');
        }
    };
    const onQuantity = (type: 'increment' | 'decrement') => {
        if (type === 'increment') {
            if (quantity === product.availableQuantity) {
                snackbar.open('Quantitly Limit Exceed', SnackBarTypes.INFO);
            } else {
                setQuantity(quantity + 1);
            }
        } else {
            setQuantity(quantity - 1);
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
                            {product?.name}
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
                            {product?.name}
                        </h1>
                        <p className="text-gray-600 mb-4 text-sm">
                            {product?.productShortDesc}
                        </p>

                        <div className="mb-4">
                            <span className="font-bold text-2xl text-primary">
                                {' '}
                                &#8377;{' '}
                            </span>
                            <span className="font-bold text-2xl">
                                {' '}
                                {product?.sellingPrice}
                            </span>
                            <span className="text-sm ml-2">
                                <s> &#8377; {product?.price} </s>
                            </span>
                            <span className="text-xl text-bold ml-2 font-bold text-primary">
                                {' '}
                                (
                                {(
                                    ((product?.price - product?.sellingPrice) /
                                        product?.price) *
                                    100
                                ).toFixed(2)}
                                % off){' '}
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
                                {sizes?.map((each) => {
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
                                onClick={() => onQuantity('decrement')}
                            >
                                &minus;
                            </button>

                            <span className="text-xs font-bold">
                                {quantity}
                            </span>

                            <button
                                className="quantity-circle flex ml-5 justify-center items-end"
                                onClick={() => onQuantity('increment')}
                            >
                                &#43;
                            </button>
                        </div>

                        <div className="action-buttons flex mb-8">
                            <div className="w-fit mr-3">
                                <Button
                                    text={
                                        cart.cart.find(
                                            (x) => x._id === product._id
                                        )
                                            ? 'REMOVE FROM CART'
                                            : 'ADD TO CART'
                                    }
                                    className="font-bold"
                                    PrefixIcon={ShoppingCartIcon}
                                    onClick={onAddToCart}
                                />
                            </div>
                            <div className="w-fit">
                                <Button
                                    text="WISHLIST"
                                    type={
                                        wishlist.wishlist.find(
                                            (x) => x._id === product._id
                                        )
                                            ? null
                                            : ButtonTypes.OUTLINE
                                    }
                                    className="font-bold bg-white border-0  "
                                    PrefixIcon={
                                        wishlist.wishlist.find(
                                            (x) => x._id === product._id
                                        )
                                            ? SolidHeart
                                            : HeartIcon
                                    }
                                    onClick={onWishlist}
                                />
                            </div>
                        </div>

                        <div className="">
                            <div className="text-xl text-primary font-bold mb-4">
                                <p> Product Details </p>
                            </div>

                            <div>{product?.productLongDesc}</div>
                        </div>
                    </div>
                </div>

                <hr />
            </div>
            {similarProducts && similarProducts.length ? (
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
                            {similarProducts &&
                                similarProducts.map((product) => (
                                    <Link
                                        className="mx-4 inline-block"
                                        to={`/product-detail/${product?.id}`}
                                    >
                                        <ProductCard
                                            id={product._id.toString()}
                                            imageUrl={product.imageUrl}
                                            originalPrice={product.price}
                                            sellingPrice={product.sellingPrice}
                                            productDescription={
                                                product.productShortDesc
                                            }
                                            productName={product.name}
                                            product={product}
                                        />
                                    </Link>
                                ))}
                        </Carousel>
                    </div>
                </div>
            ) : null}

            <hr />
            <Footer />
        </div>
    );
}
