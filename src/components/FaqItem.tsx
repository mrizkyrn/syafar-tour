import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200 pb-9 w-full">
      <button onClick={toggle} className="w-full text-left flex justify-between items-center text-lg font-semibold">
        <div className='flex items-center gap-4'>
          <div className="w-1 h-6 bg-primary"></div>
          <h2 className="text-2xl font-semibold">{question}</h2>
        </div>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && <p className="mt-7 text-gray-500 text-lg">{answer}</p>}
    </div>
  );
};

export default FaqItem;
