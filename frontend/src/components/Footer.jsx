import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-luxe-black text-luxe-offwhite pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    <div className="col-span-1 md:col-span-2">
                        <h3 className="font-playfair text-3xl mb-6 tracking-widest">LUXE</h3>
                        <p className="text-sm opacity-70 max-w-sm leading-relaxed mb-6">
                            The premier destination for luxury fashion, curating the finest collections from the world's most sought-after designers.
                        </p>
                        <div className="flex gap-4">
                            <input
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                className="bg-transparent border-b border-luxe-offwhite/30 px-0 py-2 text-sm focus:outline-none focus:border-luxe-gold w-64 transition-colors placeholder:text-luxe-offwhite/40"
                            />
                            <button className="text-sm tracking-widest uppercase hover:text-luxe-gold transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold tracking-widest uppercase mb-6 opacity-50">Shop</h4>
                        <ul className="space-y-4 text-sm opacity-80">
                            <li><Link to="/shop?category=Clothing" className="hover:text-luxe-gold hover:opacity-100 transition-all">Clothing</Link></li>
                            <li><Link to="/shop?category=Footwear" className="hover:text-luxe-gold hover:opacity-100 transition-all">Footwear</Link></li>
                            <li><Link to="/shop?category=Accessories" className="hover:text-luxe-gold hover:opacity-100 transition-all">Accessories</Link></li>
                            <li><Link to="/shop?category=Jewelry" className="hover:text-luxe-gold hover:opacity-100 transition-all">Jewelry</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold tracking-widest uppercase mb-6 opacity-50">Assistance</h4>
                        <ul className="space-y-4 text-sm opacity-80">
                            <li><Link to="/about#contact" className="hover:text-luxe-gold hover:opacity-100 transition-all">Contact Us</Link></li>
                            <li><Link to="/about#shipping" className="hover:text-luxe-gold hover:opacity-100 transition-all">Shipping & Returns</Link></li>
                            <li><Link to="/about#size-guide" className="hover:text-luxe-gold hover:opacity-100 transition-all">Size Guide</Link></li>
                            <li><Link to="/about#faq" className="hover:text-luxe-gold hover:opacity-100 transition-all">FAQ</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-luxe-offwhite/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs opacity-50">
                    <p>&copy; {new Date().getFullYear()} LUXE. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-luxe-gold transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-luxe-gold transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
