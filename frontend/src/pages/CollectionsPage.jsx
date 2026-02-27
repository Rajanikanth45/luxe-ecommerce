import { Link } from 'react-router-dom';

const CollectionsPage = () => {
    return (
        <div className="min-h-screen bg-luxe-offwhite pt-24 pb-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-playfair tracking-widest mb-6">CURATED COLLECTIONS</h1>
                    <p className="text-sm opacity-60 max-w-xl mx-auto leading-relaxed">
                        Discover our seasonal curations, meticulously assembled to tell a story of modern luxury and uncompromising craftsmanship.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Collection 1 */}
                    <Link to="/shop?collection=minimalist" className="group relative h-[600px] overflow-hidden block">
                        <img
                            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200"
                            alt="The Minimalist Edit"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                            <h2 className="text-4xl font-playfair tracking-widest mb-4">THE MINIMALIST EDIT</h2>
                            <p className="text-sm tracking-widest uppercase opacity-80 border-b border-white pb-1">Explore</p>
                        </div>
                    </Link>

                    {/* Collection 2 */}
                    <Link to="/shop?collection=winter" className="group relative h-[600px] overflow-hidden block">
                        <img
                            src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1200"
                            alt="Winter Essentials"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                            <h2 className="text-4xl font-playfair tracking-widest mb-4">WINTER ESSENTIALS</h2>
                            <p className="text-sm tracking-widest uppercase opacity-80 border-b border-white pb-1">Explore</p>
                        </div>
                    </Link>

                    {/* Collection 3 */}
                    <Link to="/shop?collection=evening" className="group relative h-[600px] overflow-hidden block">
                        <img
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200"
                            alt="Evening Wear"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                            <h2 className="text-4xl font-playfair tracking-widest mb-4">EVENING WEAR</h2>
                            <p className="text-sm tracking-widest uppercase opacity-80 border-b border-white pb-1">Explore</p>
                        </div>
                    </Link>

                    {/* Collection 4 */}
                    <Link to="/shop?collection=archival" className="group relative h-[600px] overflow-hidden block">
                        <img
                            src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=1200"
                            alt="The Archival Pieces"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                            <h2 className="text-4xl font-playfair tracking-widest mb-4">ARCHIVAL PIECES</h2>
                            <p className="text-sm tracking-widest uppercase opacity-80 border-b border-white pb-1">Explore</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CollectionsPage;
