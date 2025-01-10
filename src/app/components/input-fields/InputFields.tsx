import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface InputFieldProps {
  label?: string;
  type: 'text' | 'email' | 'password' | 'number';
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  showPasswordToggle?: boolean;
  name: string;
  error?: string;
  widthFull?: boolean;
  isIcon?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  showPasswordToggle = false,
  name,
  error,
  widthFull,
  isIcon,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordToggle = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className={`${widthFull ? 'w-full' : 'w-2/3'} flex flex-col justify-center mb-4 gap-2`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={showPasswordToggle && type === 'password' && isPasswordVisible ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className={`${widthFull ? 'bg-gray-100 pl-10 focus:ring-gray-200 placeholder:text-lg placeholder:text-gray-500' : 'bg-white focus:ring-blue-500'} ${!isIcon && 'pl-3 bg-white'} p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2`}
        />
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={handlePasswordToggle}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {isPasswordVisible ? (
              <AiOutlineEyeInvisible className="h-5 w-5 focus:outline-none" />
            ) : (
              <AiOutlineEye className="h-5 w-5 focus:outline-none" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
