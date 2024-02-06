/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import CartProductCard from '../../components/cart-product-card/CartProductCard';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import useWishlist from '../../stores/Wishlist';
import styles from './Wishlist.module.scss';
import Button from '../../components/Button';
import { useEffect } from 'react';
import useLoader from '../../stores/FullPageLoader';
import useSnackBar from '../../stores/Snackbar';
import { SnackBarTypes } from '../../enums/SnackBarTypes';
const Wishlist = () => {
    const wishlist = useWishlist();
    const navigate = useNavigate();
    const loaderService = useLoader();
    const snackBar = useSnackBar();
    useEffect(() => {
        loaderService.showFullPageLoader();
        wishlist.getWishlistDetails(
            (response) => {
                wishlist.initWishlistState(
                    response.data?.wishItems?.map((item: any) => {
                        return {
                            id: item._id,
                            product: item?.productDetails,
                            color: item?.wishlistproduct?.color,
                        };
                    })
                );
                loaderService.hideFullPageLoader();
            },
            (err) => {
                snackBar.open(err?.message, SnackBarTypes.DANGER);
                loaderService.hideFullPageLoader();
            }
        );
    }, []);
    return (
        <>
            <Header />
            {wishlist.wishlist.length ? (
                <div className={styles.wrapper}>
                    {wishlist.wishlist.map(
                        (product) =>
                            product &&
                            product.product &&
                            Object.keys(product.product).length && (
                                <CartProductCard
                                    id={product?._id}
                                    imageUrl={
                                        product?.product?.colorImages[
                                            product?.color
                                        ]
                                            ? product?.product?.colorImages[
                                                  product?.color
                                              ][0]
                                            : ''
                                    }
                                    name={product?.product.name}
                                    availableSizes={product?.product.size}
                                    description={
                                        product?.product.productShortDesc
                                    }
                                    selectedColor={product.color}
                                    originalPrice={product?.product.price}
                                    sellingPrice={product?.product.sellingPrice}
                                    selectedSize={product.product?.size[0]}
                                    product={product.product}
                                    availableQty={
                                        product?.product.availableQuantity
                                    }
                                    key={product._id}
                                    isWishlistScreen={true}
                                    selectedQty={1}
                                    onCartRemove={() => {}}
                                />
                            )
                    )}
                </div>
            ) : (
                <div className={styles.error}>
                    <h1 className={styles.msg}>
                        Oops!!! You dont have any wishlisted items
                    </h1>
                    <Button
                        className={styles.back}
                        onClick={() => navigate('/')}
                        text="Back To Home"
                    />
                </div>
            )}

            <Footer />
        </>
    );
};

export default Wishlist;
