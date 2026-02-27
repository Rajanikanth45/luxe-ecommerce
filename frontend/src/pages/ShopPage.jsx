import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronDown } from 'lucide-react';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useLocation } from 'react-router-dom';

const ShopPage = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { data: products, isLoading, error } = useGetProductsQuery();
    const location = useLocation();

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedDesigners, setSelectedDesigners] = useState([]);
    const [sortOrder, setSortOrder] = useState('Newest');
    const [pageTitle, setPageTitle] = useState('THE COLLECTION');
    const [pageSubtitle, setPageSubtitle] = useState('Curated garments and accessories for the modern wardrobe.');
    const [isCollection, setIsCollection] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const categoryParam = searchParams.get('category');
        const collectionParam = searchParams.get('collection');
        const searchWord = searchParams.get('search');

        setSearchQuery(searchWord || '');

        if (categoryParam) {
            setIsCollection(false);
            setSelectedCategories([categoryParam]);
            setPageTitle(categoryParam.toUpperCase());
            setPageSubtitle(`Explore our curated selection of ${categoryParam.toLowerCase()}.`);
        } else if (collectionParam) {
            setIsCollection(true);
            switch (collectionParam) {
                case 'new-arrivals':
                    setPageTitle('NEW ARRIVALS');
                    setPageSubtitle('The latest additions to our curation.');
                    setSortOrder('Newest');
                    break;
                case 'minimalist':
                    setPageTitle('THE MINIMALIST EDIT');
                    setPageSubtitle('Clean lines, neutral tones, and uncompromising quality.');
                    setSelectedDesigners(['Jil Sander', 'The Row', 'Lemaire', 'A.P.C.']);
                    break;
                case 'winter':
                    setPageTitle('WINTER ESSENTIALS');
                    setPageSubtitle('Substantial weights and textural depth for the colder months.');
                    setSelectedCategories(['Clothing', 'Footwear']);
                    break;
                case 'evening':
                    setPageTitle('EVENING WEAR');
                    setPageSubtitle('Refined elegance for after-dark.');
                    setSelectedCategories(['Clothing', 'Jewelry']);
                    break;
                case 'archival':
                    setPageTitle('ARCHIVAL PIECES');
                    setPageSubtitle('Rare and iconic pieces from past seasons.');
                    setSelectedDesigners(['Bottega Veneta', 'Saint Laurent', 'Celine', 'Prada']);
                    break;
                default:
                    setIsCollection(false);
                    setPageTitle('THE COLLECTION');
                    setPageSubtitle('Curated garments and accessories for the modern wardrobe.');
            }
        } else if (searchWord) {
            setIsCollection(false);
            setPageTitle('SEARCH RESULTS');
            setPageSubtitle(`Results for "${searchWord}"`);
        } else {
            setIsCollection(false);
            setPageTitle('THE COLLECTION');
            setPageSubtitle('Curated garments and accessories for the modern wardrobe.');
        }
    }, [location.search]);

    const handleCategoryChange = (val) => {
        setSelectedCategories(prev => prev.includes(val) ? prev.filter(c => c !== val) : [...prev, val]);
    };

    const handleDesignerChange = (val) => {
        setSelectedDesigners(prev => prev.includes(val) ? prev.filter(d => d !== val) : [...prev, val]);
    };

    const filteredProducts = products?.filter(p => {
        const catMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
        const desMatch = selectedDesigners.length === 0 || selectedDesigners.includes(p.brand);
        const searchMatch = !searchQuery ||
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());

        return catMatch && desMatch && searchMatch;
    })?.sort((a, b) => {
        if (sortOrder === 'Price: Low to High') return a.price - b.price;
        if (sortOrder === 'Price: High to Low') return b.price - a.price;
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return (
        <div className="min-h-screen bg-luxe-offwhite pt-24 pb-12">
            <div className="container mx-auto px-6">

                {/* Page Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-playfair tracking-widest mb-4 uppercase">{pageTitle}</h1>
                    <p className="text-sm opacity-60">{pageSubtitle}</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">

                    {!isCollection && (
                        <button
                            className="lg:hidden flex items-center justify-between border-b border-luxe-black pb-2 text-sm tracking-widest uppercase font-semibold"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <span className="flex items-center gap-2"><Filter size={16} /> Filters</span>
                            <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>
                    )}

                    {/* Sidebar */}
                    {!isCollection && (
                        <aside className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
                            <div className="space-y-10 sticky top-28">

                                {/* Category Filter */}
                                <div>
                                    <h3 className="text-sm font-semibold tracking-widest uppercase mb-4 opacity-50 border-b border-luxe-black/10 pb-2">Category</h3>
                                    <ul className="space-y-3 text-sm">
                                        {['Clothing', 'Footwear', 'Accessories', 'Jewelry'].map(cat => (
                                            <li key={cat}>
                                                <label className="flex items-center gap-3 cursor-pointer group">
                                                    <input type="checkbox" className="accent-luxe-black" checked={selectedCategories.includes(cat)} onChange={() => handleCategoryChange(cat)} />
                                                    <span className={`group-hover:opacity-100 transition-opacity ${selectedCategories.includes(cat) ? 'opacity-100 font-medium' : 'opacity-70'}`}>{cat}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Designer Filter */}
                                <div>
                                    <h3 className="text-sm font-semibold tracking-widest uppercase mb-4 opacity-50 border-b border-luxe-black/10 pb-2">Designer</h3>
                                    <ul className="space-y-3 text-sm">
                                        {['Bottega Veneta', 'Jil Sander', 'Khaite', 'Loewe', 'The Row', 'Saint Laurent', 'Tiffany & Co.', 'Prada', 'Celine', 'A.P.C.', 'Lemaire'].map(des => (
                                            <li key={des}>
                                                <label className="flex items-center gap-3 cursor-pointer group">
                                                    <input type="checkbox" className="accent-luxe-black" checked={selectedDesigners.includes(des)} onChange={() => handleDesignerChange(des)} />
                                                    <span className={`group-hover:opacity-100 transition-opacity ${selectedDesigners.includes(des) ? 'opacity-100 font-medium' : 'opacity-70'}`}>{des}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </aside>
                    )}

                    {/* Product Grid */}
                    <main className={isCollection ? "w-full" : "lg:w-3/4"}>
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm opacity-60">
                                {isLoading ? 'Loading...' : error ? '0' : filteredProducts?.length || 0} Results
                            </span>

                            <div className="flex items-center gap-2">
                                <span className="text-sm opacity-50">Sort by:</span>
                                <select
                                    className="bg-transparent text-sm font-semibold tracking-widest uppercase focus:outline-none cursor-pointer"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
                                    <option>Newest</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="text-center tracking-widest uppercase text-sm opacity-50 py-20">Loading Collection...</div>
                        ) : error ? (
                            <div className="text-center text-red-500 py-20">{error?.data?.message || 'Error fetching products'}</div>
                        ) : filteredProducts?.length === 0 ? (
                            <div className="text-center py-20 text-sm opacity-60">No products match your selected filters.</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProducts?.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        )}
                    </main>

                </div>
            </div>
        </div>
    );
};

export default ShopPage;
