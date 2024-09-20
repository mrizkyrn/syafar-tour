import { useState } from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';

interface TextInputProps {
  label: string;
  showInfo?: boolean;
  infoText?: string;
  [key: string]: any;
}

export const TextInput: React.FC<TextInputProps> = ({ label, showInfo = false, infoText, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="w-full">
      {/* Label and Info */}
      <div className="flex items-center justify-between">
        <label className="text-sm md:text-lg font-medium text-dark">{label}</label>

        {showInfo && (
          <div
            className="flex items-center text-xs text-end md:text-sm cursor-pointer text-gray-500"
            onClick={toggleModal}
          >
            Panduan
            <IoInformationCircleOutline className="ml-1 text-lg" />
          </div>
        )}
      </div>

      {/* Input Field */}
      <input
        {...props}
        className="w-full px-3 py-3 md:px-5 md:py-4 mt-3 text-xs md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />

      {/* Modal */}
      {isModalOpen && showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md p-6">
            <h2 className="text-lg font-bold text-dark">Panduan {label}</h2>
            <p className="mt-4 text-gray-600">
              {infoText ||
                'Panduan ini memberikan informasi terkait pengisian data yang sesuai dengan ketentuan yang berlaku.'}
            </p>
            <button onClick={toggleModal} className="px-4 py-2 mt-6 text-white bg-blue-500 rounded hover:bg-blue-600">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface SelectInputProps {
  label: string;
  options: { value: string; label: string }[];
  [key: string]: any;
}

export const SelectInput: React.FC<SelectInputProps> = ({ label, options, ...props }) => {
  return (
    <div className="w-full">
      <label className="text-sm md:text-lg font-medium text-dark">{label}</label>
      <select
        {...props}
        className="w-full px-3 py-3 md:px-5 md:py-4 mt-3 border text-xs md:text-base border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      >
        <option value="" disabled>
          Pilih {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

interface SliderInputProps {
  label: string;
  value: number;
  [key: string]: any;
}

export const SliderInput: React.FC<SliderInputProps> = ({ label, value, ...props }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <label className="text-sm md:text-lg font-medium text-dark">{label}</label>
        <span className="text-gray-700 text-sm md:text-lg font-bold">{value} Orang</span>
      </div>
      <input {...props} type="range" className="w-full mt-3" value={value} />
    </div>
  );
};
