export const SectionHeader = ({ 
  title, 
  description, 
  align = 'center',
  accent = false 
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : ''}`}>
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
        accent 
          ? 'bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent'
          : 'text-white'
      }`}>
        {title}
      </h2>
      {description && (
        <p className="text-gray-400 text-lg md:text-xl">
          {description}
        </p>
      )}
    </div>
  );
};