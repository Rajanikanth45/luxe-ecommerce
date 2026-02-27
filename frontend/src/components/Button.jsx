import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300 font-medium";

    const variants = {
        primary: "bg-luxe-black text-luxe-offwhite hover:bg-luxe-gold hover:text-luxe-black",
        outline: "border border-luxe-black text-luxe-black hover:bg-luxe-black hover:text-luxe-offwhite",
        gold: "bg-luxe-gold text-luxe-black hover:bg-luxe-black hover:text-luxe-offwhite",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
