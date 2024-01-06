import { useState } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import styles from './ProductDetails.module.scss';

export default function ProductDetails() {

    const imagePath = "/public/product.jpeg";

    const [currentImage, setCurrentImage] = useState<string>(imagePath);

    return (
        <div className={styles.wrapper}>
            <Header />
            <hr />




            <div>
                <div className="container mx-auto my-8 flex">
                    <nav className="text-sm">
                        <a href="#" className="text-gray-600 hover:text-gray-800">Home</a>
                        <span className="mx-2">/</span>
                        <a href="#" className="text-gray-600 hover:text-gray-800">Category</a>
                        <span className="mx-2">/</span>
                        <span className="text-gray-800 font-semibold">Product Name</span>
                    </nav>
                </div>

                <div className="container mx-auto my-8 flex">
                    <div className="w-1/2">
                        <div className='flex'>

                            <div className="mb-4 w-14">
                                <img src={imagePath} onClick={() => setCurrentImage(imagePath)} alt="Product Thumbnail" className={imagePath == currentImage ? "w-14 h-auto border border-primary border-4" : "w-14 h-auto"} />
                                <img src={imagePath} onClick={() => setCurrentImage(imagePath)} alt="Product Thumbnail" className={imagePath == currentImage ? "w-14 h-auto border border-primary border-2" : "w-14 h-auto"} />
                                <img src={imagePath} onClick={() => setCurrentImage(imagePath)} alt="Product Thumbnail" className={imagePath == currentImage ? "w-14 h-auto border border-primary border-2" : "w-14 h-auto"} />
                                <img src={imagePath} onClick={() => setCurrentImage(imagePath)} alt="Product Thumbnail" className={imagePath == currentImage ? "w-14 h-auto border border-primary border-2" : "w-14 h-auto"} />
                            </div>

                            <div className="flex-1">
                                <img src={currentImage} alt="Enlarged Photo 1" className="w-full ml-4 h-auto mb-2" />
                            </div>
                        </div>

                    </div>

                    <div className="w-1/2 p-8 bg-white">
                        <h1 className="text-2xl font-bold mb-4 text-black">Product Company Name</h1>
                        <p className="text-gray-600 mb-4 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                        <div className="mb-4">
                            <span className="font-bold text-2xl text-primary"> &#8377; </span>
                            <span className="font-bold text-2xl"> 47,00,000</span>
                            <span className="text-sm ml-2"><s> &#8377; 47,00,000 </s></span>
                            <span className="text-xl text-bold ml-2 font-bold text-primary"> (50% Off) </span>
                        </div>

                        <div className='text-l text-primary font-bold mb-8' >
                            <p>Inclusive of all taxes</p>
                        </div>

                        <div className='text-xs font-bold mb-8'>
                            <p> MORE COLOR </p>
                            <div className='flex mt-3'>
                                <img src={imagePath} onClick={() => setCurrentImage(imagePath)} alt="Product Thumbnail" className={imagePath == currentImage ? "w-14 h-auto border border-primary border-4" : "w-14 h-auto"} />
                                <img src={imagePath} onClick={() => setCurrentImage(imagePath)} alt="Product Thumbnail" className={imagePath == currentImage ? "w-14 ml-4 h-auto border border-primary border-2" : "w-14 h-auto"} />
                                <img src={imagePath} onClick={() => setCurrentImage(imagePath)} alt="Product Thumbnail" className={imagePath == currentImage ? "w-14 ml-4 h-auto border border-primary border-2" : "w-14 h-auto"} />
                                <img src={imagePath} onClick={() => setCurrentImage(imagePath)} alt="Product Thumbnail" className={imagePath == currentImage ? "w-14 ml-4 h-auto border border-primary border-2" : "w-14 h-auto"} />
                            </div>
                        </div>

                        <div className='font-bold text-xs '>
                            <p> SELECT SIZE </p>
                            <div className='flex mt-3'>
                                <div className="circle flex justify-center items-center">
                                    <span className="text-xs font-light text-primary">36</span>
                                </div>
                                <div className="circle ml-4 flex justify-center items-center">
                                    <span className="text-xs font-light text-primary">38</span>
                                </div>
                                <div className="circle ml-4 flex justify-center items-center">
                                    <span className="text-xs font-light text-primary">40</span>
                                </div>
                                <div className="circle ml-4 flex justify-center items-center">
                                    <span className="text-xs font-light text-primary">42</span>
                                </div>
                                <div className="circle ml-4 flex justify-center items-center">
                                    <span className="text-xs font-light text-primary">44</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
                        </div>
                    </div>
                </div>


            </div>
            <hr />
            <Footer />
        </div>
    )
}