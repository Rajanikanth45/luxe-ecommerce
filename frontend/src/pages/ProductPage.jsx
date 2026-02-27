import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import { Heart, ChevronRight } from 'lucide-react';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { useToggleWishlistMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProductPage = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedSize, setSelectedSize] = useState('');
    const [activeImage, setActiveImage] = useState(0);

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
    const { userInfo } = useSelector((state) => state.auth);
    const [toggleWishlistApi] = useToggleWishlistMutation();

    const inWishlist = userInfo?.wishlist?.some(item =>
        (item._id || item) === product?._id
    );

    const addToCartHandler = () => {
        if (!selectedSize && product.sizes && product.sizes.length > 0) {
            alert('Please select a size before adding to bag.');
            return;
        }
        dispatch(addToCart({ ...product, qty: 1, size: selectedSize }));
        navigate('/cart');
    };

    const toggleWishlistHandler = async () => {
        if (!userInfo) {
            navigate('/login');
            return;
        }
        try {
            const res = await toggleWishlistApi({ productId: product._id }).unwrap();
            dispatch(setCredentials(res));
        } catch (err) {
            console.error(err);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen bg-luxe-offwhite flex items-center justify-center tracking-widest uppercase text-sm opacity-50">Loading Product Details...</div>;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-luxe-offwhite flex flex-col items-center justify-center gap-4">
                <div className="text-red-500">{error?.data?.message || 'Error fetching product'}</div>
                <Link to="/shop"><Button variant="outline">Back to Shop</Button></Link>
            </div>
        );
    }

    if (!product) {
        return <div className="min-h-screen bg-luxe-offwhite flex items-center justify-center tracking-widest uppercase text-sm opacity-50">Product Not Found</div>;
    }

    return (
        <div className="min-h-screen bg-luxe-offwhite pt-24 pb-20">
            <div className="container mx-auto px-6">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-50 mb-8">
                    <Link to="/shop" className="hover:text-luxe-black transition-colors">Shop</Link> <ChevronRight size={12} /> <span>{product.category}</span> <ChevronRight size={12} /> <span>{product.brand}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Image Gallery */}
                    <div className="flex flex-col-reverse md:flex-row gap-6">
                        <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 shrink-0">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index)}
                                    className={`border ${activeImage === index ? 'border-luxe-black' : 'border-transparent'} opacity-80 hover:opacity-100 transition-all`}
                                >
                                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-20 h-28 md:w-full md:h-auto object-cover" />
                                </button>
                            ))}
                        </div>
                        <div className="flex-1 bg-luxe-offwhite/50 aspect-[3/4] relative overflow-hidden group cursor-zoom-in">
                            <img
                                src={product.images[activeImage] || (product.images.length > 0 ? product.images[0] : '')}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-8">
                            <h2 className="text-sm font-semibold tracking-widest uppercase mb-2 opacity-80">{product.brand}</h2>
                            <h1 className="text-3xl font-playfair tracking-wide mb-4">{product.name}</h1>
                            <p className="text-xl font-medium">₹{product.price.toFixed(2)}</p>
                        </div>

                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs uppercase tracking-widest font-semibold">Select Size</span>
                                <button className="text-xs uppercase tracking-widest opacity-50 hover:opacity-100 border-b border-luxe-black/30">Size Guide</button>
                            </div>
                            <div className="grid grid-cols-5 gap-3">
                                {product.sizes && product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-3 text-sm border transition-all ${selectedSize === size
                                            ? 'border-luxe-black bg-luxe-black text-luxe-offwhite'
                                            : 'border-luxe-black/20 hover:border-luxe-black text-luxe-black'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 mb-12">
                            <Button
                                className="flex-1 text-sm tracking-widest py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={product.countInStock === 0}
                                onClick={addToCartHandler}
                            >
                                {product.countInStock > 0 ? 'Add To Bag' : 'Out of Stock'}
                            </Button>
                            <button
                                onClick={toggleWishlistHandler}
                                className={`w-14 items-center justify-center flex border transition-colors ${inWishlist ? 'border-luxe-black bg-luxe-black text-luxe-offwhite hover:bg-luxe-black/90' : 'border-luxe-black/20 hover:border-luxe-black text-luxe-black'}`}
                            >
                                <Heart className="w-5 h-5" fill={inWishlist ? "currentColor" : "none"} />
                            </button>
                        </div>

                        {/* Description & Details */}
                        <div className="border-t border-luxe-black/10 pt-8 mt-auto">
                            <h3 className="text-sm uppercase tracking-widest font-semibold mb-4">Description</h3>
                            <p className="text-sm opacity-70 leading-relaxed mb-6 whitespace-pre-line">
                                {product.description}
                            </p>

                            {/* Assuming standard details since backend model doesn't have a specific details array right now, using brand/category etc */}
                            <h3 className="text-sm uppercase tracking-widest font-semibold mb-4">Details</h3>
                            <ul className="list-disc list-inside text-sm opacity-70 space-y-2">
                                <li>Brand: {product.brand}</li>
                                <li>Category: {product.category}</li>
                                <li>Stock Status: {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
