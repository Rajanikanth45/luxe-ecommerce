import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const [createOrder, { isLoading }] = useCreateOrderMutation();

    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: 'United States',
    });

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems.map(item => ({
                    ...item,
                    image: item.images ? item.images[0] : ''
                })),
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: 0,
                taxPrice: 0,
                totalPrice: cart.itemsPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate('/profile');
        } catch (error) {
            console.error('Failed to create order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-luxe-offwhite pt-24 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-3xl font-playfair tracking-widest mb-12 text-center">CHECKOUT</h1>

                {/* Progress Bar */}
                <div className="flex justify-between items-center mb-16 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-luxe-black/10 z-0"></div>

                    <div className="relative z-10 flex flex-col items-center gap-2 bg-luxe-offwhite px-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 1 ? 'bg-luxe-black text-luxe-offwhite' : 'bg-white border border-luxe-black/20 text-luxe-black'}`}>1</div>
                        <span className="text-[10px] uppercase tracking-widest opacity-80">Shipping</span>
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-2 bg-luxe-offwhite px-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 2 ? 'bg-luxe-black text-luxe-offwhite' : 'bg-white border border-luxe-black/20 text-luxe-black'}`}>2</div>
                        <span className="text-[10px] uppercase tracking-widest opacity-80">Payment</span>
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-2 bg-luxe-offwhite px-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 3 ? 'bg-luxe-black text-luxe-offwhite' : 'bg-white border border-luxe-black/20 text-luxe-black'}`}>3</div>
                        <span className="text-[10px] uppercase tracking-widest opacity-80">Review</span>
                    </div>
                </div>

                {/* Step Content */}
                <div className="bg-white p-8 md:p-12 shadow-sm border border-luxe-black/5">
                    {step === 1 && (
                        <div>
                            <h2 className="text-xl font-semibold tracking-widest uppercase mb-8">Shipping Address</h2>
                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                                <div>
                                    <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Full Address</label>
                                    <input type="text" value={shippingAddress.address} onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })} className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors" placeholder="123 Luxury Ave, Apt 4B" required />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold tracking-widest uppercase mb-2">City</label>
                                        <input type="text" value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors" placeholder="New York" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Postal Code</label>
                                        <input type="text" value={shippingAddress.postalCode} onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors" placeholder="10001" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Country</label>
                                    <select value={shippingAddress.country} onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors">
                                        <option>United States</option>
                                        <option>United Kingdom</option>
                                        <option>France</option>
                                        <option>Italy</option>
                                    </select>
                                </div>
                                <div className="flex justify-end mt-10">
                                    <Button type="submit">Continue to Payment</Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h2 className="text-xl font-semibold tracking-widest uppercase mb-8">Payment Details</h2>
                            <div className="space-y-4">
                                <label className={`flex items-center gap-4 cursor-pointer p-4 border transition-colors ${paymentMethod === 'Cash on Delivery' ? 'border-luxe-black bg-luxe-offwhite/30' : 'border-luxe-black/20 hover:border-luxe-black/50 bg-white'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="Cash on Delivery"
                                        checked={paymentMethod === 'Cash on Delivery'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="accent-luxe-black w-4 h-4 cursor-pointer"
                                    />
                                    <span className="font-semibold tracking-widest uppercase text-sm">Cash on Delivery</span>
                                </label>

                                <label className={`flex items-center gap-4 cursor-pointer p-4 border transition-colors ${paymentMethod === 'UPI' ? 'border-luxe-black bg-luxe-offwhite/30' : 'border-luxe-black/20 hover:border-luxe-black/50 bg-white'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="UPI"
                                        checked={paymentMethod === 'UPI'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="accent-luxe-black w-4 h-4 cursor-pointer"
                                    />
                                    <span className="font-semibold tracking-widest uppercase text-sm">UPI</span>
                                </label>

                                <label className={`flex items-center gap-4 cursor-pointer p-4 border transition-colors ${paymentMethod === 'Credit / Debit Card' ? 'border-luxe-black bg-luxe-offwhite/30' : 'border-luxe-black/20 hover:border-luxe-black/50 bg-white'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="Credit / Debit Card"
                                        checked={paymentMethod === 'Credit / Debit Card'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="accent-luxe-black w-4 h-4 cursor-pointer"
                                    />
                                    <span className="font-semibold tracking-widest uppercase text-sm">Credit / Debit Card</span>
                                </label>
                            </div>

                            <div className="flex justify-between mt-10">
                                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                                <Button onClick={() => setStep(3)}>Review Order</Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <h2 className="text-xl font-semibold tracking-widest uppercase mb-8 text-center">Review & Place Order</h2>
                            <div className="bg-luxe-offwhite/50 p-6 border border-luxe-black/10 mb-8">
                                <h3 className="text-sm font-semibold tracking-widest uppercase mb-4">Order Summary</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="opacity-70">Payment Method:</span>
                                        <span className="font-semibold tracking-widest uppercase">{paymentMethod}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-center opacity-70 text-sm mb-12">By placing your order, you agree to our Terms of Service and Privacy Policy.</p>

                            <div className="flex justify-between mt-10">
                                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                                <Button
                                    className="bg-luxe-gold text-luxe-black hover:bg-luxe-black hover:text-luxe-gold disabled:opacity-50"
                                    onClick={placeOrderHandler}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Processing...' : 'Complete Purchase'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
