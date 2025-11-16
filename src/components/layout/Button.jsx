// ============================================
// Button Component - Primary & Secondary variants
// ============================================
export const Button = ({ 
  children, 
  variant = 'primary', // 'primary', 'secondary', 'outline'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  onClick,
  type = 'button'
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 to-teal-500 text-black hover:from-cyan-400 hover:to-teal-400 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40',
    secondary: 'bg-gray-800/80 text-white border border-gray-700 hover:bg-gray-700/80 hover:border-gray-600',
    outline: 'bg-transparent text-cyan-400 border-2 border-cyan-500/50 hover:bg-cyan-500/10 hover:border-cyan-400'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};