import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomePage = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
                        alt="Hero Background"
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-luxe-black/30"></div>
                </div>

                <div className="relative z-10 text-center text-luxe-offwhite px-4 pt-16">
                    <h1 className="text-5xl md:text-7xl font-playfair tracking-widest mb-6">THE NEW ELEGANCE</h1>
                    <p className="text-sm md:text-base tracking-widest max-w-xl mx-auto mb-10 opacity-90">
                        DISCOVER THE LATEST AUTUMN/WINTER COLLECTION FEATURING ELEVATED SILHOUETTES AND TIMELESS CRAFTSMANSHIP.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/shop?collection=new-arrivals">
                            <Button variant="gold">Shop New Arrivals</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Collection Strip */}
            <section className="py-24 bg-luxe-offwhite container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-playfair tracking-widest mb-2">CURATED PICKS</h2>
                        <p className="text-sm opacity-60">Hand-selected pieces for the season</p>
                    </div>
                    <Link to="/shop" className="text-sm tracking-widest uppercase hover:text-luxe-gold transition-colors border-b border-luxe-black pb-1">
                        View All
                    </Link>
                </div>

                {isLoading ? (
                    <div className="text-center tracking-widest uppercase text-sm opacity-50 py-10">Loading Curated Picks...</div>
                ) : error ? (
                    <div className="text-center text-red-500 py-10">{error?.data?.message || error.error}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.slice(0, 4).map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            {/* Editorial Lookbook */}
            <section className="py-24 bg-luxe-black text-luxe-offwhite">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbiUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D"
                                alt="Editorial"
                                className="w-full h-auto"
                            />
                        </div>
                        <div>
                            <h2 className="text-4xl font-playfair tracking-widest mb-8 leading-tight">THE DEFINITIVE WARDROBE</h2>
                            <p className="text-sm opacity-70 leading-relaxed mb-10 max-w-md">
                                Build your foundation with pieces designed to transcend seasonal trends.
                                Our permanent collection focuses on uncompromising quality and perfect proportions.
                            </p>
                            <Button variant="outline" className="border-luxe-offwhite text-luxe-offwhite hover:bg-luxe-offwhite hover:text-luxe-black">
                                Explore The Edit
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
