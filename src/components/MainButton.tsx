import { Link } from 'react-router-dom';

interface MainButtonProps {
  text: string;
  to?: string;
  [key: string]: any;
}

const MainButton: React.FC<MainButtonProps> = ({ text, to = '', ...props }) => {
  return (
    // <Link to="/add">
    <Link
      to={to}
      className="bg-primary text-center text-white text-sm md:text-base px-6 sm:px-10 py-2 rounded-md hover:bg-primaryDark transition-colors duration-300"
      {...props}
    >
      {text}
    </Link>
    // </Link>
  );
};

export default MainButton;
