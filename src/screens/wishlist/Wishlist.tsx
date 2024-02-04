import { useNavigate } from 'react-router-dom';
import CartProductCard from '../../components/cart-product-card/CartProductCard';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import useWishlist from '../../stores/Wishlist';
import styles from './Wishlist.module.scss';
import Button from '../../components/Button';
const Wishlist = () => {
    const wishlist = useWishlist();
    const navigate = useNavigate();
    return (
        <>
            <Header />
            {wishlist.wishlist.length ? (
                <div className={styles.wrapper}>
                    {wishlist.wishlist.map((product) => (
                        <CartProductCard
                            imageUrl={
                                product?.colorImages[product?.colors[0]]
                                    ? product?.colorImages[
                                          product?.colors[0]
                                      ][0]
                                    : ''
                            }
                            name={product.name}
                            availableSizes={product.size}
                            description={product.productShortDesc}
                            originalPrice={product.price}
                            sellingPrice={product.sellingPrice}
                            selectedSize={32}
                            product={product}
                            availableQty={product.availableQuantity}
                            key={product._id}
                            isWishlistScreen={true}
                            selectedQty={1}
                            onCartRemove={() => {}}
                        />
                    ))}
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
