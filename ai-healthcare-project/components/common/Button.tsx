import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ease-in-out inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-primary-DEFAULT text-white hover:bg-primary-dark focus:ring-primary-DEFAULT active:animate-button-press-hue',
    secondary: 'bg-secondary-DEFAULT text-white hover:bg-secondary-dark focus:ring-secondary-DEFAULT active:animate-button-press-hue',
    accent: 'bg-accent-DEFAULT text-neutral-900 hover:bg-accent-dark focus:ring-accent-DEFAULT focus:ring-offset-neutral-50 active:animate-button-press-hue',
    outline: 'border border-primary-DEFAULT text-primary-DEFAULT hover:bg-primary-DEFAULT hover:text-white focus:ring-primary-DEFAULT',
    ghost: 'text-primary-DEFAULT hover:bg-primary-light/20 focus:ring-primary-DEFAULT',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const loadingStyles = isLoading ? 'opacity-75 cursor-not-allowed' : ''; // isLoading already disables button via props.disabled

  // Ensure Generate Analysis button is always visible
  const buttonStyles = children === 'Generate Analysis' 
    ? `${baseStyles} bg-blue-600 text-white hover:bg-blue-700 ${sizeStyles[size]} ${loadingStyles} ${className}`
    : `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${loadingStyles} ${className}`;

  return (
    <button
      className={buttonStyles}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {leftIcon && !isLoading && <span className="mr-2 inline-flex items-center">{leftIcon}</span>}
      {children}
      {rightIcon && !isLoading && <span className="ml-2 inline-flex items-center">{rightIcon}</span>}
    </button>
  );
};

export default Button;
