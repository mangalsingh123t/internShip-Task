import { useState } from 'react';
 
export const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="flex mb-4 w-full">
        <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleChange}
            className="border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
        />
    </div>
    );
};

