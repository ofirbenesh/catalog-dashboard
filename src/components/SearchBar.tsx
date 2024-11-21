import React from 'react';

interface SearchBarProps {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm }) => {
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Search by name..."
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default SearchBar;
