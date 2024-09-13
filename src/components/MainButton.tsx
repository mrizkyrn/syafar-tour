/* eslint-disable @typescript-eslint/no-explicit-any */
interface MainButtonProps {
  text: string;
  onClick: () => void;
  [key: string]: any;
}

const MainButton: React.FC<MainButtonProps> = ({ text, onClick, ...props }) => {
  return (
    <button
      className="bg-primary text-white text-sm md:text-base px-6 sm:px-10 py-2 rounded-md hover:bg-primaryDark transition-colors duration-300"
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
};

export default MainButton;
