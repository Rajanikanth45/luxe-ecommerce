import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import { X, Minus, Plus } from 'lucide-react';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id, size) => {
        dispatch(removeFromCart({ id, size }));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/checkout');
    };

    return (
        <div className="min-h-screen bg-luxe-offwhite pt-24 pb-20">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-playfair tracking-widest mb-12">SHOPPING BAG</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl opacity-60 tracking-widest uppercase mb-8">Your bag is empty.</p>
                        <Link to="/shop">
                            <Button>Discover New Arrivals</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-8 text-sm">
                            <div className="hidden md:grid grid-cols-6 gap-4 border-b border-luxe-black/10 pb-4 text-xs font-semibold tracking-widest uppercase opacity-50">
                                <div className="col-span-3">Product</div>
                                <div className="text-center">Price</div>
                                <div className="text-center">Quantity</div>
                                <div className="text-right">Total</div>
                            </div>

                            {cartItems.map((item) => (
                                <div key={`${item._id}-${item.size}`} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b border-luxe-black/5 pb-8 relative">

                                    {/* Remove Button */}
                                    <button
                                        className="absolute top-0 right-0 md:static md:col-start-6 text-right flex justify-end"
                                        onClick={() => removeFromCartHandler(item._id, item.size)}
                                    >
                                        <X size={16} className="opacity-50 hover:opacity-100 transition-opacity" />
                                    </button>

                                    <div className="col-span-1 md:col-span-3 flex gap-6">
                                        <img src={item.images ? item.images[0] : ''} alt={item.name} className="w-24 h-32 object-cover bg-luxe-offwhite/50" />
                                        <div className="flex flex-col justify-center">
                                            <p className="font-semibold tracking-widest uppercase opacity-80 text-xs mb-1">{item.brand}</p>
                                            <Link to={`/product/${item._id}`} className="hover:text-luxe-gold transition-colors mb-2">{item.name}</Link>
                                            <p className="opacity-60 text-xs">Size: {item.size}</p>
                                        </div>
                                    </div>

                                    <div className="hidden md:block text-center whitespace-nowrap">
                                        ₹{item.price.toFixed(2)}
                                    </div>

                                    <div className="flex items-center justify-between md:justify-center border border-luxe-black/20 p-2 max-w-[120px] md:mx-auto">
                                        <button
                                            className="opacity-50 hover:opacity-100 disabled:opacity-20"
                                            onClick={() => addToCartHandler(item, item.qty - 1)}
                                            disabled={item.qty <= 1}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="font-medium px-4">{item.qty}</span>
                                        <button
                                            className="opacity-50 hover:opacity-100 disabled:opacity-20"
                                            onClick={() => addToCartHandler(item, item.qty + 1)}
                                            disabled={item.qty >= item.countInStock}
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>

                                    <div className="md:hidden flex justify-between items-center mt-4">
                                        <span className="opacity-50 text-xs uppercase tracking-widest">Total</span>
                                        <span className="font-semibold">₹{(item.price * item.qty).toFixed(2)}</span>
                                    </div>

                                    <div className="hidden md:block text-right font-semibold">
                                        ₹{(item.price * item.qty).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-8 border border-luxe-black/5 sticky top-28">
                                <h2 className="text-lg font-playfair tracking-widest mb-6">ORDER SUMMARY</h2>

                                <div className="space-y-4 text-sm mb-8">
                                    <div className="flex justify-between">
                                        <span className="opacity-70">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="opacity-70">Shipping</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                    <div className="flex justify-between font-semibold border-t border-luxe-black/10 pt-4 mt-4">
                                        <span>Estimated Total</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full"
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Proceed to Checkout
                                </Button>

                                <p className="text-xs text-center opacity-50 mt-6 tracking-wide">
                                    Complimentary shipping on orders over ₹25000.
                                </p>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
