import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="container mx-auto max-w-6xl px-4">{children}</div>;
};

export default Container;
