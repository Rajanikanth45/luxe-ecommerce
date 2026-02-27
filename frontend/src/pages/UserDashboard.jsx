import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/Button';
import { Package, Heart, Settings, LogOut } from 'lucide-react';
import { useLogoutMutation, useProfileMutation, useToggleWishlistMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { logoutUser, setCredentials } from '../slices/authSlice';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('orders');

    // Profile Edit State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();
    const [updateProfile, { isLoading: isUpdatingProfile }] = useProfileMutation();
    const [toggleWishlistApi] = useToggleWishlistMutation();
    const { data: myOrders, isLoading: loadingOrders, error: errorOrders } = useGetMyOrdersQuery();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo, navigate]);

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
        } catch (err) {
            // Unwanted console logs removed
        } finally {
            dispatch(logoutUser());
            navigate('/login');
        }
    };

    const submitProfileHandler = async (e) => {
        e.preventDefault();
        setMessage(null);
        setSuccessMessage(null);
        try {
            const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap();
            dispatch(setCredentials(res));
            setSuccessMessage('Profile updated successfully!');
            setPassword('');
        } catch (err) {
            setMessage(err?.data?.message || err.error || 'Update failed');
        }
    };

    const removeWishlistHandler = async (productId) => {
        try {
            const res = await toggleWishlistApi({ productId }).unwrap();
            dispatch(setCredentials(res));
        } catch (err) {
            // Unwanted console logs removed
        }
    };

    return (
        <div className="min-h-screen bg-luxe-offwhite pt-24 pb-20">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-playfair tracking-widest mb-12">MY ACCOUNT</h1>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Sidebar Menu */}
                    <aside className="lg:w-1/4">
                        <div className="bg-white p-8 border border-luxe-black/5 sticky top-28">
                            <div className="mb-8">
                                <p className="font-semibold text-lg tracking-wide">{userInfo?.name}</p>
                                <p className="text-xs opacity-60">{userInfo?.email}</p>
                                <div className="mt-4 pt-4 border-t border-luxe-black/10">
                                    <p className="text-xs uppercase tracking-widest font-semibold mb-1">Loyalty Tier</p>
                                    <p className="text-sm font-playfair italic text-luxe-gold">Gold Member (2,450 pts)</p>
                                </div>
                            </div>

                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full flex items-center gap-4 text-sm tracking-widest uppercase p-3 transition-colors ${activeTab === 'orders' ? 'bg-luxe-black text-luxe-offwhite' : 'hover:bg-luxe-black/5'}`}
                                >
                                    <Package size={16} /> Orders
                                </button>
                                <button
                                    onClick={() => setActiveTab('wishlist')}
                                    className={`w-full flex items-center gap-4 text-sm tracking-widest uppercase p-3 transition-colors ${activeTab === 'wishlist' ? 'bg-luxe-black text-luxe-offwhite' : 'hover:bg-luxe-black/5'}`}
                                >
                                    <Heart size={16} /> Wishlist
                                </button>
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`w-full flex items-center gap-4 text-sm tracking-widest uppercase p-3 transition-colors ${activeTab === 'settings' ? 'bg-luxe-black text-luxe-offwhite' : 'hover:bg-luxe-black/5'}`}
                                >
                                    <Settings size={16} /> Settings
                                </button>
                                <button
                                    onClick={logoutHandler}
                                    className="w-full flex items-center gap-4 text-sm tracking-widest uppercase p-3 text-red-700 hover:bg-red-50 mt-8 border-t border-luxe-black/10"
                                >
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:w-3/4">

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div className="bg-white p-8 border border-luxe-black/5">
                                <h2 className="text-xl font-semibold tracking-widest uppercase mb-8">Order History</h2>

                                {loadingOrders ? (
                                    <div className="text-sm opacity-50 tracking-widest uppercase">Loading orders...</div>
                                ) : errorOrders ? (
                                    <div className="text-red-500 text-sm">{errorOrders?.data?.message || 'Error fetching orders'}</div>
                                ) : !myOrders || myOrders.length === 0 ? (
                                    <p className="text-sm opacity-60">You have no previous orders.</p>
                                ) : (
                                    <div className="space-y-6">
                                        {myOrders.map((order) => (
                                            <div key={order._id} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-luxe-black/10 hover:border-luxe-black/30 transition-colors">
                                                <div>
                                                    <p className="font-semibold tracking-widest text-sm mb-1">{order._id}</p>
                                                    <p className="text-xs opacity-60 mb-2">{order.createdAt.substring(0, 10)} • {order.orderItems.length} Item(s)</p>
                                                    <span className={`text-[10px] tracking-widest uppercase px-2 py-1 ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {order.isDelivered ? 'Delivered' : 'Processing'}
                                                    </span>
                                                </div>
                                                <div className="mt-4 md:mt-0 md:text-right flex flex-col items-start md:items-end gap-2">
                                                    <p className="font-semibold text-lg">₹{order.totalPrice.toFixed(2)}</p>
                                                    <Button variant="outline" className="px-4 py-2 text-xs">View Details</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Wishlist Tab */}
                        {activeTab === 'wishlist' && (
                            <div className="bg-white p-8 border border-luxe-black/5">
                                <h2 className="text-xl font-semibold tracking-widest uppercase mb-8">Saved Items</h2>

                                {(!userInfo?.wishlist || userInfo.wishlist.length === 0) && (
                                    <p className="text-sm opacity-60 tracking-widest uppercase">Your wishlist is empty.</p>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {userInfo?.wishlist?.map((item) => (
                                        <div key={item._id} className="flex gap-4 border border-luxe-black/5 p-4 group">
                                            <Link to={`/product/${item._id}`}>
                                                <img src={item.images && item.images[0]} alt={item.name} className="w-24 h-32 object-cover" />
                                            </Link>
                                            <div className="flex flex-col flex-1">
                                                <p className="text-xs font-semibold tracking-widest uppercase opacity-70 mb-1">{item.brand}</p>
                                                <Link to={`/product/${item._id}`} className="text-sm font-medium mb-2 hover:text-luxe-gold transition-colors">{item.name}</Link>
                                                <p className="text-sm mb-auto">₹{item.price?.toFixed(2)}</p>
                                                <div className="flex justify-between items-center mt-4">
                                                    <Link to={`/product/${item._id}`} className="text-xs tracking-widest uppercase border-b border-luxe-black hover:text-luxe-gold hover:border-luxe-gold transition-colors">Move to bag</Link>
                                                    <button onClick={() => removeWishlistHandler(item._id)} className="text-xs opacity-50 hover:opacity-100 uppercase tracking-widest text-red-600">Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Settings Tab */}
                        {activeTab === 'settings' && (
                            <div className="bg-white p-8 border border-luxe-black/5">
                                <h2 className="text-xl font-semibold tracking-widest uppercase mb-8">Account Details</h2>

                                {successMessage && <div className="text-green-600 text-sm mb-4">{successMessage}</div>}
                                {message && <div className="text-red-500 text-sm mb-4">{message}</div>}

                                <form className="space-y-6 max-w-md" onSubmit={submitProfileHandler}>
                                    <div>
                                        <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Display Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold tracking-widest uppercase mb-2 mt-8">New Password</label>
                                        <input
                                            type="password"
                                            placeholder="Leave blank to keep current"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors"
                                        />
                                    </div>
                                    <Button type="submit" className="mt-8" disabled={isUpdatingProfile}>
                                        {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </form>
                            </div>
                        )}

                    </main>

                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
