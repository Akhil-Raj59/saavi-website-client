export const Section = ({ 
  children, 
  className = '', 
  background = 'dark', // 'dark', 'darker', 'gradient'
  id = '' 
}) => {
  const bgClasses = {
    dark: 'bg-black',
    darker: 'bg-[#0A0A0A]',
    gradient: 'bg-gradient-to-br from-black via-gray-900 to-black'
  };

  return (
    <section 
      id={id}
      className={`py-16 md:py-24 ${bgClasses[background]} ${className}`}
    >
      {children}
    </section>
  );
};