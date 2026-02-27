import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AboutPage = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                // Add a small delay to ensure DOM is fully painted if navigating from another page
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);

    return (
        <div className="min-h-screen bg-luxe-offwhite pt-24 pb-20">
            <div className="container mx-auto px-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="order-2 lg:order-1 relative h-[700px]">
                        <img
                            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200"
                            alt="Atelier"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h1 className="text-5xl font-playfair tracking-widest mb-8 leading-tight">THE ART OF SUBTLE LUXURY</h1>
                        <div className="space-y-6 text-luxe-black/70 leading-relaxed">
                            <p>
                                Founded in 2024, LUXE was born from a desire to strip away the excess of modern consumption and return to the fundamentals of exceptional craftsmanship.
                            </p>
                            <p>
                                We believe that true luxury whispers. It is found in the weight of virgin wool, the precise cut of a lapel, and the invisible hours of hand-stitching that ensure a garment will outlast fleeting seasons.
                            </p>
                            <p>
                                Our curation strategy is uncompromising. We partner exclusively with designers and ateliers who share our reverence for materials and our commitment to slow, intentional creation.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-luxe-black/10 pt-8">
                            <div>
                                <h3 className="font-semibold tracking-widest uppercase text-sm mb-2">Heritage</h3>
                                <p className="text-sm opacity-60">Sourcing century-old techniques.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold tracking-widest uppercase text-sm mb-2">Longevity</h3>
                                <p className="text-sm opacity-60">Garments designed as modern heirlooms.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-luxe-black text-luxe-offwhite p-16 md:p-24 text-center mb-24">
                    <h2 className="text-3xl md:text-4xl font-playfair tracking-widest mb-6">"Simplicity is the ultimate sophistication."</h2>
                    <p className="text-sm tracking-widest uppercase opacity-50 block">— The LUXE Philosophy</p>
                </div>

                {/* Assistance Sections */}
                <div className="max-w-4xl mx-auto space-y-20">
                    <section id="contact" className="scroll-mt-32">
                        <h2 className="text-2xl font-playfair tracking-widest mb-6 border-b border-luxe-black/10 pb-4">CONTACT US</h2>
                        <div className="space-y-4 text-sm opacity-80 leading-relaxed">
                            <p>Our client advisory team is available Monday through Friday, 9:00 AM to 6:00 PM EST.</p>
                            <p><strong>Email:</strong> clientservices@luxe.com</p>
                            <p><strong>Phone:</strong> +1 (800) 555-LUXE</p>
                            <p><strong>Flagship Store:</strong> 123 Fashion Avenue, New York, NY 10012</p>
                        </div>
                    </section>

                    <section id="shipping" className="scroll-mt-32">
                        <h2 className="text-2xl font-playfair tracking-widest mb-6 border-b border-luxe-black/10 pb-4">SHIPPING & RETURNS</h2>
                        <div className="space-y-4 text-sm opacity-80 leading-relaxed">
                            <p><strong>Complimentary Shipping:</strong> We offer complimentary standard shipping on all orders over $500 globally. expedited options are available at checkout.</p>
                            <p><strong>Returns Policy:</strong> Items may be returned within 14 days of delivery. Garments must be unworn, unaltered, and with all original tags attached. Custom pieces are non-refundable.</p>
                        </div>
                    </section>

                    <section id="size-guide" className="scroll-mt-32">
                        <h2 className="text-2xl font-playfair tracking-widest mb-6 border-b border-luxe-black/10 pb-4">SIZE GUIDE</h2>
                        <div className="text-sm opacity-80 leading-relaxed">
                            <p className="mb-4">LUXE garments are designed with precision. Please refer to our standard measurements below. For exact garment measurements, contact our advisory team.</p>
                            <div className="grid grid-cols-4 gap-4 border-t border-luxe-black/10 pt-4 font-mono text-xs">
                                <div className="font-bold">SIZE</div><div>BUST</div><div>WAIST</div><div>HIP</div>
                                <div>XS / 34</div><div>32"</div><div>24"</div><div>34"</div>
                                <div>S / 36</div><div>34"</div><div>26"</div><div>36"</div>
                                <div>M / 38</div><div>36"</div><div>28"</div><div>38"</div>
                                <div>L / 40</div><div>38"</div><div>30"</div><div>40"</div>
                            </div>
                        </div>
                    </section>

                    <section id="faq" className="scroll-mt-32">
                        <h2 className="text-2xl font-playfair tracking-widest mb-6 border-b border-luxe-black/10 pb-4">FREQUENTLY ASKED QUESTIONS</h2>
                        <div className="space-y-6 text-sm opacity-80 leading-relaxed">
                            <div>
                                <h4 className="font-bold mb-2">How do I track my order?</h4>
                                <p>Once your order ships, you will receive a tracking link via email. You can also monitor the status from your LUXE User Dashboard.</p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">Do you offer alterations?</h4>
                                <p>Complimentary alterations are provided for purchases made at our physical flagship locations. Online orders cannot currently be altered prior to shipping.</p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">Are your materials ethically sourced?</h4>
                                <p>Yes. We trace 100% of our leathers and wools to certified, sustainable farms, prioritizing environmental stewardship at every stage.</p>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
};

export default AboutPage;
