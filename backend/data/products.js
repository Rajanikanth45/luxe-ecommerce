const products = [
    {
        name: 'OVERSIZED WOOL COAT',
        images: [
            'https://placehold.co/600x800/222222/f5f0eb?text=WOOL+COAT',
        ],
        description:
            'Impeccably tailored from dense virgin wool, this oversized silhouette offers uncompromising warmth and structural drape. A modern heirloom piece.',
        brand: 'Jil Sander',
        category: 'Clothing',
        price: 1250.00,
        countInStock: 5,
        rating: 4.8,
        numReviews: 12,
        sizes: ['S', 'M', 'L'],
        colors: ['Black', 'Navy']
    },
    {
        name: 'SILK SLIP DRESS',
        images: [
            'https://placehold.co/600x800/222222/f5f0eb?text=SLIP+DRESS',
        ],
        description:
            'Cut on the bias from pure heavy silk charmeuse, this floor-length slip dress moves with liquid grace. Designed for fluid elegance evening or night.',
        brand: 'The Row',
        category: 'Clothing',
        price: 890.00,
        countInStock: 8,
        rating: 4.9,
        numReviews: 34,
        sizes: ['XS', 'S', 'M'],
        colors: ['Champagne', 'Onyx']
    },
    {
        name: 'INTRECCIATO LEATHER TOTE',
        images: [
            'https://placehold.co/600x800/222222/f5f0eb?text=LEATHER+TOTE',
        ],
        description:
            'Woven entirely by hand using the house’s signature intrecciato technique. Unlined to showcase the craftsmanship, with a soft, unstructured shape.',
        brand: 'Bottega Veneta',
        category: 'Accessories',
        price: 2400.00,
        countInStock: 3,
        rating: 5.0,
        numReviews: 8,
        sizes: ['One Size'],
        colors: ['Caramel', 'Black']
    },
    {
        name: 'SCULPTURAL HEEL PUMP',
        images: [
            'https://placehold.co/600x800/222222/f5f0eb?text=HEEL+PUMP',
        ],
        description:
            'A masterclass in modern footwear. Featuring an architectural heel and a sharp pointed toe, crafted in smooth calfskin.',
        brand: 'Khaite',
        category: 'Footwear',
        price: 760.00,
        countInStock: 12,
        rating: 4.7,
        numReviews: 22,
        sizes: ['37', '38', '39', '40'],
        colors: ['Black']
    },
    {
        name: 'CASHMERE TURTLENECK',
        images: [
            'https://placehold.co/600x800/222222/f5f0eb?text=TURTLENECK'
        ],
        description: 'Knitted from the finest Mongolian cashmere, this sweater features a relaxed fit and dropped shoulders for effortless layering.',
        brand: 'The Row',
        category: 'Clothing',
        price: 1100.00,
        countInStock: 15,
        rating: 4.9,
        numReviews: 45,
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Ivory', 'Grey']
    },
    {
        name: 'STRUCTURED BLAZER',
        images: [
            'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600'
        ],
        description: 'A masterpiece of tailoring, featuring sharp padded shoulders and a nipped-in waist to create a strong, sculptural silhouette.',
        brand: 'Saint Laurent',
        category: 'Clothing',
        price: 2990.00,
        countInStock: 4,
        rating: 5.0,
        numReviews: 18,
        sizes: ['34', '36', '38', '40'],
        colors: ['Black']
    },
    {
        name: '18K GOLD CHAIN NECKLACE',
        images: [
            'https://images.unsplash.com/photo-1599643478524-fb66f70a00ea?auto=format&fit=crop&q=80&w=600'
        ],
        description: 'A timeless hardware staple. Crafted from solid 18-karat yellow gold with distinctive interlocking links.',
        brand: 'Tiffany & Co.',
        category: 'Jewelry',
        price: 3500.00,
        countInStock: 2,
        rating: 4.8,
        numReviews: 9,
        sizes: ['One Size'],
        colors: ['Gold']
    },
    {
        name: 'CHUNKY COMBAT BOOTS',
        images: [
            'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=600'
        ],
        description: 'Constructed from brushed spazzolato leather with a thick tread sole. A utilitarian silhouette with luxurious detailing.',
        brand: 'Prada',
        category: 'Footwear',
        price: 1150.00,
        countInStock: 7,
        rating: 4.6,
        numReviews: 53,
        sizes: ['38', '39', '40', '41'],
        colors: ['Black']
    },
    {
        name: 'PLEATED MIDI SKIRT',
        images: [
            'https://placehold.co/600x800/222222/f5f0eb?text=MIDI+SKIRT'
        ],
        description: 'Sharp knife pleats create dynamic movement in this mid-length skirt. Crafted from a mid-weight crepe fabric that holds its shape.',
        brand: 'Jil Sander',
        category: 'Clothing',
        price: 850.00,
        countInStock: 9,
        rating: 4.5,
        numReviews: 12,
        sizes: ['34', '36', '38'],
        colors: ['Navy', 'White']
    },
    {
        name: 'CAT-EYE SUNGLASSES',
        images: [
            'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600'
        ],
        description: 'A bold acetate frame with sweeping angles, offering 100% UV protection with tinted lenses and signature branding at the temples.',
        brand: 'Celine',
        category: 'Accessories',
        price: 460.00,
        countInStock: 20,
        rating: 4.9,
        numReviews: 87,
        sizes: ['One Size'],
        colors: ['Tortoiseshell', 'Black']
    },
    {
        name: 'MINIMALIST CROSSBODY BAG',
        images: [
            'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600'
        ],
        description: 'A sleek, boxy silhouette crafted from smooth calf leather featuring subtle gold-tone hardware and an adjustable strap.',
        brand: 'A.P.C.',
        category: 'Accessories',
        price: 590.00,
        countInStock: 14,
        rating: 4.7,
        numReviews: 31,
        sizes: ['One Size'],
        colors: ['Hazelnut', 'Black']
    },
    {
        name: 'WIDE-LEG TROUSERS',
        images: [
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600'
        ],
        description: 'Fluid wool gabardine transforms these tailored trousers into a sweeping, elegant silhouette. Features a high waist and front pleats.',
        brand: 'Lemaire',
        category: 'Clothing',
        price: 680.00,
        countInStock: 6,
        rating: 4.6,
        numReviews: 15,
        sizes: ['36', '38', '40'],
        colors: ['Charcoal', 'Olive']
    }
];

export default products;
