/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '../../components/header/Header';
import ProductCard from '../../components/product-card/ProductCard';
import styles from './ProductListing.module.scss';
import Button from '../../components/Button';
import Footer from '../../components/footer/Footer';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';
import useLoader from '../../stores/FullPageLoader';
const ProductListing = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showMoreLoader, setShowMoreLoader] = useState(false);
    const api = useApi();
    const loader = useLoader();
    const params = useParams();
    const [initialDataLoad, setInitialDataLoad] = useState(true);
    const [products, setProducts] = useState<any>();

    const fetchProducts = () => {
        if (initialDataLoad) {
            loader.showFullPageLoader();
        }
        api.get(`/products/productlist/${currentPage}/2`)
            .then((data) => {
                setProducts((pre: any) => {
                    if (pre && pre.length) {
                        return [...pre, ...data.data.products];
                    } else {
                        return [...data.data.products];
                    }
                });
                loader.hideFullPageLoader();
                setInitialDataLoad(false);
                setShowMoreLoader(false);
            })
            .catch(() => {
                loader.hideFullPageLoader();
                setShowMoreLoader(false);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);
    const handleShowMore = () => {
        setShowMoreLoader(true);
        setCurrentPage(currentPage + 1);
    };
    return (
        <>
            <div className={styles.wrapper}>
                <Header />
                <hr />
                <p className={styles.info_container}>
                    <p>Home / {params.search}</p>
                    <p>{params.search} - 52 Items</p>
                </p>
                <div className={styles.cards_wrapper}>
                    {products &&
                        products.map((product: any) => (
                            <Link to={`/product-detail/${product._id}`}>
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
                </div>
                <div className={styles.button_container}>
                    <Button
                        loader={showMoreLoader}
                        text="Show More"
                        onClick={handleShowMore}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductListing;
