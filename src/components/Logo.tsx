import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link to="/">
      <div className="flex items-center gap-2">
        <img src="/images/logo.png" alt="Logo" className={`${className}`} />
      </div>
    </Link>
  );
};

export default Logo;
