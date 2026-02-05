'use client';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  type = 'button',
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 rounded-lg font-medium
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantStyles = {
    primary: 'bg-violet-600 text-white hover:bg-violet-500 active:scale-[0.98]',
    secondary: 'bg-[#242136] text-white hover:bg-[#2E2B3F] border border-[#2E2B3F]',
    danger: 'bg-red-600/10 text-red-400 hover:bg-red-600/20 border border-red-600/20',
    ghost: 'text-[#9B97B0] hover:text-white hover:bg-[#242136]',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
      `}
    >
      {children}
    </button>
  );
}
