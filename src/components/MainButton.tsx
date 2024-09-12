interface MainButtonProps {
  text: string;
  onClick: () => void;
}

const MainButton: React.FC<MainButtonProps> = ({ text, onClick }) => {
  return (
    <button className="bg-primary text-white text-sm md:text-base px-6 sm:px-10 py-2 rounded-md hover:bg-primaryDark transition-colors duration-300" onClick={onClick}>
      {text}
    </button>
  );
};

export default MainButton;
