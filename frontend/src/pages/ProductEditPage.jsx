import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import { ChevronLeft } from 'lucide-react';
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../slices/productsApiSlice';

const ProductEditPage = () => {
    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [images, setImages] = useState([]);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [sizes, setSizes] = useState([]);

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImages(product.images || []);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
            setSizes(product.sizes || []);
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({
                _id: productId,
                name,
                price,
                images,
                brand,
                category,
                countInStock,
                description,
                sizes,
            }).unwrap();
            alert('Product updated successfully');
            navigate('/admin');
        } catch (err) {
            alert(err?.data?.message || err.error);
        }
    };

    return (
        <div className="min-h-screen bg-luxe-offwhite pt-24 pb-20">
            <div className="container mx-auto px-6 max-w-3xl">
                <Link to="/admin" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest opacity-50 hover:opacity-100 hover:text-luxe-gold transition-colors mb-8">
                    <ChevronLeft size={16} /> Back to Dashboard
                </Link>

                <h1 className="text-3xl font-playfair tracking-widest mb-8">EDIT PRODUCT</h1>

                {isLoading ? (
                    <div className="text-sm opacity-50 tracking-widest uppercase">Loading...</div>
                ) : error ? (
                    <div className="text-red-500 text-sm">{error?.data?.message || 'Error fetching product'}</div>
                ) : (
                    <form onSubmit={submitHandler} className="bg-white p-8 shadow-sm border border-luxe-black/5 space-y-6">
                        <div>
                            <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Name</label>
                            <input
                                type="text"
                                className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Price (₹)</label>
                                <input
                                    type="number"
                                    className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Stock Count</label>
                                <input
                                    type="number"
                                    className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(Number(e.target.value))}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Image URL (Comma separated for multiple)</label>
                            <input
                                type="text"
                                className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors"
                                value={images.join(', ')}
                                onChange={(e) => setImages(e.target.value.split(',').map(img => img.trim()))}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Sizes (Comma separated, e.g. S, M, L or 38, 39, 40)</label>
                            <input
                                type="text"
                                className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors"
                                value={sizes.join(', ')}
                                onChange={(e) => setSizes(e.target.value ? e.target.value.split(',').map(size => size.trim()).filter(Boolean) : [])}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Brand</label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Category</label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold tracking-widest uppercase mb-2">Description</label>
                            <textarea
                                className="w-full bg-transparent border-b border-luxe-black/30 px-0 py-3 text-sm focus:outline-none focus:border-luxe-black transition-colors resize-y min-h-[100px]"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" className="mt-8" disabled={loadingUpdate}>
                            {loadingUpdate ? 'Updating...' : 'Update Product'}
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ProductEditPage;
