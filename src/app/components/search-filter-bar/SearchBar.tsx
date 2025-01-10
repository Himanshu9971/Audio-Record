'use client';
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import InputField from '../input-fields/InputFields';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex items-center w-full">
      <div className="relative w-full">
        <InputField
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search..."
          name="search"
          showPasswordToggle={false}
          widthFull={true}
          isIcon={true}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-2/3">
          <AiOutlineSearch size={24} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
