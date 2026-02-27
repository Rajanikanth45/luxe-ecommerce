import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, User, Menu, Search, LogOut, Settings } from 'lucide-react';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logoutUser } from '../slices/authSlice';
import { useState } from 'react';

const Header = () => {
    const [keyword, setKeyword] = useState('');

    const { cartItems } = useSelector((state) => state.cart);
    const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/shop?search=${keyword}`);
            setKeyword('');
            e.target.reset();
        } else {
            navigate('/shop');
        }
    };

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

    return (
        <header className="fixed w-full z-50 transition-all duration-300 bg-luxe-offwhite/90 backdrop-blur-md border-b border-luxe-black/10">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">

                {/* Left Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/shop" className="text-sm tracking-widest uppercase hover:text-luxe-gold transition-colors">Shop</Link>
                    <Link to="/collections" className="text-sm tracking-widest uppercase hover:text-luxe-gold transition-colors">Collections</Link>
                    <Link to="/about" className="text-sm tracking-widest uppercase hover:text-luxe-gold transition-colors">About</Link>
                </nav>

                {/* Mobile Menu */}
                <button className="md:hidden p-2">
                    <Menu className="w-6 h-6" />
                </button>

                {/* Logo */}
                <Link to="/" className="text-3xl font-playfair font-bold tracking-widest text-luxe-black absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0">
                    LUXE
                </Link>

                {/* Right Nav */}
                <div className="flex items-center gap-6">
                    <form onSubmit={submitHandler} className="hidden md:flex items-center relative group">
                        <input
                            type="text"
                            name="q"
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="SEARCH LUXE..."
                            className="bg-transparent border-b border-luxe-black/30 px-0 py-1 text-xs focus:outline-none focus:border-luxe-gold w-0 group-hover:w-48 transition-all duration-300 placeholder:text-luxe-black/30 tracking-widest uppercase opacity-0 group-hover:opacity-100"
                        />
                        <button type="submit" className="hover:text-luxe-gold transition-colors p-1" aria-label="Search">
                            <Search className="w-5 h-5" />
                        </button>
                    </form>

                    {userInfo ? (
                        <div className="relative group cursor-pointer hidden md:flex items-center gap-2">
                            <span className="text-sm font-semibold tracking-widest uppercase hover:text-luxe-gold transition-colors">
                                {userInfo.name.split(' ')[0]}
                            </span>
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-luxe-black/10 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col pt-2 pb-2">
                                <Link to="/profile" className="px-4 py-2 text-xs tracking-widest uppercase hover:bg-luxe-offwhite flex items-center gap-2">
                                    <User size={14} /> Profile
                                </Link>
                                {userInfo.isAdmin && (
                                    <Link to="/admin" className="px-4 py-2 text-xs tracking-widest uppercase hover:bg-luxe-offwhite flex items-center gap-2">
                                        <Settings size={14} /> Admin Dashboard
                                    </Link>
                                )}
                                <button onClick={logoutHandler} className="px-4 py-2 text-xs tracking-widest uppercase hover:bg-luxe-offwhite text-left text-red-600 flex items-center gap-2">
                                    <LogOut size={14} /> Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="hidden md:flex text-sm tracking-widest uppercase hover:text-luxe-gold transition-colors">
                            Sign In
                        </Link>
                    )}

                    {/* Mobile Profile Icon */}
                    <Link to={userInfo ? "/profile" : "/login"} className="md:hidden hover:text-luxe-gold transition-colors">
                        <User className="w-5 h-5" />
                    </Link>

                    <Link to="/cart" className="hover:text-luxe-gold transition-colors relative">
                        <ShoppingBag className="w-5 h-5" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 -right-2 bg-luxe-black text-luxe-offwhite text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                </div>

            </div>
        </header>
    );
};

export default Header;
