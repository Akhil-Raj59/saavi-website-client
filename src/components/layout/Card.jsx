export const Card = ({ 
  children, 
  className = '', 
  hover = true,
  gradient = false 
}) => {
  return (
    <div className={`
      bg-gradient-to-br from-gray-900/50 to-black/50 
      backdrop-blur-sm
      border border-gray-800/50 
      rounded-xl 
      p-6 md:p-8
      ${hover ? 'transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1' : ''}
      ${gradient ? 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-cyan-500/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};