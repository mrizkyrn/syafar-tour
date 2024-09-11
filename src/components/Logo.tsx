interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className='' }) => {
  return (
    <div className="flex items-center gap-2">
      <img src="/images/logo.png" alt="Logo" className={`${className}`} />
    </div>
  )
};

export default Logo;
