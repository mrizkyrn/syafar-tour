interface HeadingSectionProps {
  title: string;
  subtitle: string;
}

const HeadingSection: React.FC<HeadingSectionProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-3 md:mb-4 lg:mb-6">
      <h2 className="text-lg md:text-xl font-bold mb-1 uppercase">{title}</h2>
      <p className="text-gray-500  hidden md:block">{subtitle}</p>
    </div>
  );
};

export default HeadingSection;
