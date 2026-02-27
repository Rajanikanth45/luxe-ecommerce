import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/Button';
import { LayoutDashboard, ShoppingBag, Users, Package, Settings, Edit, Trash2, LogOut } from 'lucide-react';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../slices/productsApiSlice';
import { useGetUsersQuery } from '../slices/usersApiSlice';
import { useGetOrdersQuery } from '../slices/ordersApiSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logoutUser } from '../slices/authSlice';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('inventory');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    const { data: products, isLoading: loadingProducts, error: errorProducts } = useGetProductsQuery();
    const { data: users, isLoading: loadingUsers, error: errorUsers } = useGetUsersQuery();
    const { data: orders, isLoading: loadingOrders, error: errorOrders } = useGetOrdersQuery();

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
        } catch (err) {
            console.error(err);
        } finally {
            dispatch(logoutUser());
            navigate('/login');
        }
    };

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                const res = await createProduct().unwrap();
                navigate(`/admin/product/${res._id}/edit`);
            } catch (err) {
                alert(err?.data?.message || err.error);
            }
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id).unwrap();
            } catch (err) {
                alert(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-luxe-offwhite pt-24 pb-20">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-playfair tracking-widest mb-12">ADMINISTRATOR</h1>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Sidebar Menu */}
                    <aside className="lg:w-1/4">
                        <div className="bg-white p-8 border border-luxe-black/5 sticky top-28">
                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('inventory')}
                                    className={`w-full flex items-center gap-4 text-sm tracking-widest uppercase p-3 transition-colors ${activeTab === 'inventory' ? 'bg-luxe-black text-luxe-offwhite' : 'hover:bg-luxe-black/5'}`}
                                >
                                    <Package size={16} /> Inventory
                                </button>
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full flex items-center gap-4 text-sm tracking-widest uppercase p-3 transition-colors ${activeTab === 'orders' ? 'bg-luxe-black text-luxe-offwhite' : 'hover:bg-luxe-black/5'}`}
                                >
                                    <ShoppingBag size={16} /> Orders
                                </button>
                                <button
                                    onClick={() => setActiveTab('users')}
                                    className={`w-full flex items-center gap-4 text-sm tracking-widest uppercase p-3 transition-colors ${activeTab === 'users' ? 'bg-luxe-black text-luxe-offwhite' : 'hover:bg-luxe-black/5'}`}
                                >
                                    <Users size={16} /> Users
                                </button>
                                <button
                                    onClick={() => setActiveTab('analytics')}
                                    className={`w-full flex items-center gap-4 text-sm tracking-widest uppercase p-3 transition-colors ${activeTab === 'analytics' ? 'bg-luxe-black text-luxe-offwhite' : 'hover:bg-luxe-black/5'}`}
                                >
                                    <LayoutDashboard size={16} /> Analytics
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

                        {/* Inventory Tab */}
                        {activeTab === 'inventory' && (
                            <div className="bg-white p-8 border border-luxe-black/5 overflow-x-auto">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-xl font-semibold tracking-widest uppercase">Products</h2>
                                    <Button className="text-xs py-2 px-4" onClick={createProductHandler} disabled={loadingCreate}>
                                        {loadingCreate ? 'Creating...' : 'Add Product'}
                                    </Button>
                                </div>

                                {loadingDelete && <div className="text-amber-500 mb-4 text-sm">Deleting...</div>}

                                {loadingProducts ? (
                                    <div className="text-sm opacity-50 tracking-widest uppercase text-center py-10">Loading products...</div>
                                ) : errorProducts ? (
                                    <div className="text-red-500 text-sm text-center py-10">{errorProducts?.data?.message || 'Error loading products'}</div>
                                ) : (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-luxe-black/10 text-xs tracking-widest uppercase opacity-50">
                                                <th className="py-4">ID</th>
                                                <th className="py-4">Name</th>
                                                <th className="py-4">Price</th>
                                                <th className="py-4">Stock</th>
                                                <th className="py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {products?.map((product) => (
                                                <tr key={product._id} className="border-b border-luxe-black/5 hover:bg-luxe-black/5 transition-colors">
                                                    <td className="py-4">{product._id.substring(0, 8)}...</td>
                                                    <td className="py-4 font-medium">{product.name}</td>
                                                    <td className="py-4">₹{product.price.toFixed(2)}</td>
                                                    <td className="py-4">{product.countInStock}</td>
                                                    <td className="py-4 flex justify-end gap-4 text-opacity-50 text-luxe-black">
                                                        <Link to={`/admin/product/${product._id}/edit`} className="hover:text-amber-600 transition-colors"><Edit size={16} /></Link>
                                                        <button onClick={() => deleteHandler(product._id)} className="hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div className="bg-white p-8 border border-luxe-black/5 overflow-x-auto">
                                <h2 className="text-xl font-semibold tracking-widest uppercase mb-8">All Orders</h2>

                                {loadingOrders ? (
                                    <div className="text-sm opacity-50 tracking-widest uppercase text-center py-10">Loading orders...</div>
                                ) : errorOrders ? (
                                    <div className="text-red-500 text-sm text-center py-10">{errorOrders?.data?.message || 'Error loading orders'}</div>
                                ) : (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-luxe-black/10 text-xs tracking-widest uppercase opacity-50">
                                                <th className="py-4">ID</th>
                                                <th className="py-4">User</th>
                                                <th className="py-4">Date</th>
                                                <th className="py-4">Total</th>
                                                <th className="py-4">Status</th>
                                                <th className="py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {orders?.map((order) => (
                                                <tr key={order._id} className="border-b border-luxe-black/5 hover:bg-luxe-black/5 transition-colors">
                                                    <td className="py-4">{order._id.substring(0, 8)}...</td>
                                                    <td className="py-4">{order.user?.name || 'Deleted User'}</td>
                                                    <td className="py-4">{order.createdAt.substring(0, 10)}</td>
                                                    <td className="py-4">₹{order.totalPrice.toFixed(2)}</td>
                                                    <td className="py-4">
                                                        <span className={`text-[10px] tracking-widest uppercase px-2 py-1 ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                            {order.isDelivered ? 'Delivered' : 'Processing'}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 text-right">
                                                        <Button variant="outline" className="px-3 py-1 text-[10px]">Details</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}

                        {/* Users Tab */}
                        {activeTab === 'users' && (
                            <div className="bg-white p-8 border border-luxe-black/5 overflow-x-auto">
                                <h2 className="text-xl font-semibold tracking-widest uppercase mb-8">Registered Users</h2>

                                {loadingUsers ? (
                                    <div className="text-sm opacity-50 tracking-widest uppercase text-center py-10">Loading users...</div>
                                ) : errorUsers ? (
                                    <div className="text-red-500 text-sm text-center py-10">{errorUsers?.data?.message || 'Error loading users'}</div>
                                ) : (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-luxe-black/10 text-xs tracking-widest uppercase opacity-50">
                                                <th className="py-4">ID</th>
                                                <th className="py-4">Name</th>
                                                <th className="py-4">Email</th>
                                                <th className="py-4">Admin</th>
                                                <th className="py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {users?.map((user) => (
                                                <tr key={user._id} className="border-b border-luxe-black/5 hover:bg-luxe-black/5 transition-colors">
                                                    <td className="py-4">{user._id.substring(0, 8)}...</td>
                                                    <td className="py-4 font-medium">{user.name}</td>
                                                    <td className="py-4"><a href={`mailto:${user.email}`} className="border-b border-luxe-black/30 hover:border-luxe-black">{user.email}</a></td>
                                                    <td className="py-4">
                                                        {user.isAdmin ? (
                                                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>
                                                        ) : (
                                                            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px]">✗</div>
                                                        )}
                                                    </td>
                                                    <td className="py-4 flex justify-end gap-4 text-opacity-50 text-luxe-black">
                                                        <button className="hover:text-amber-600 transition-colors"><Edit size={16} /></button>
                                                        <button className="hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}

                        {/* Analytics Tab (Placeholder) */}
                        {activeTab === 'analytics' && (
                            <div className="bg-white p-8 border border-luxe-black/5 flex flex-col items-center justify-center py-20">
                                <LayoutDashboard size={48} className="opacity-20 mb-6" />
                                <h2 className="text-xl font-semibold tracking-widest uppercase mb-2">Sales Analytics</h2>
                                <p className="text-sm opacity-60 text-center max-w-sm">
                                    Interactive charts and complete sales data integration will appear here in the next update.
                                </p>
                            </div>
                        )}

                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
