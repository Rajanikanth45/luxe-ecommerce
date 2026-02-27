import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="group cursor-pointer">
            <div className="relative overflow-hidden bg-luxe-offwhite/50 aspect-[3/4] mb-4">
                <img
                    src={product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/600x800/222222/f5f0eb?text=LUXE'}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                        to={`/product/${product._id}`}
                        className="bg-luxe-offwhite text-luxe-black px-6 py-2 text-xs tracking-widest uppercase hover:bg-luxe-gold transition-colors"
                    >
                        Quick View
                    </Link>
                </div>
            </div>
            <div className="text-center">
                <h3 className="text-sm font-medium tracking-wide mb-1 opacity-90">{product.brand}</h3>
                <p className="text-xs opacity-60 mb-2 truncate px-2">{product.name}</p>
                <p className="text-sm font-semibold">₹{product.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ProductCard;
