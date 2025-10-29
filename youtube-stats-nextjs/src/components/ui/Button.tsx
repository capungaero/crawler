import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', loading = false, children, ...props }) => {
  const baseStyles = 'px-4 py-2 rounded focus:outline-none transition duration-200';
  const variantStyles = variant === 'primary' 
    ? 'bg-blue-500 text-white hover:bg-blue-600' 
    : 'bg-gray-300 text-gray-800 hover:bg-gray-400';

  return (
    <button className={`${baseStyles} ${variantStyles}`} disabled={loading} {...props}>
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;