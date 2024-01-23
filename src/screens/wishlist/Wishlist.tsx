import CartProductCard from '../../components/cart-product-card/CartProductCard';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import useWishlist from '../../stores/Wishlist';
import styles from './Wishlist.module.scss';
const Wishlist = () => {
    const wishlist = useWishlist();
    return (
        <>
            <Header />
            {wishlist.wishlist.length ? (
                <div className={styles.wrapper}>
                    {wishlist.wishlist.map((product) => (
                        <CartProductCard
                            imageUrl={product.imageUrl}
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
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.error}>
                    <h1 className={styles.msg}>
                        Oops!!! You dont have any wishlist items
                    </h1>
                </div>
            )}

            <Footer />
        </>
    );
};

export default Wishlist;
