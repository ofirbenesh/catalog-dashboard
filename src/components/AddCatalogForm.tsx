import React, { useState } from 'react';

interface Props {
    onAddCatalog: (name: string, primary: boolean) => void;
}

const AddCatalogForm: React.FC<Props> = ({ onAddCatalog }) => {
    const [name, setName] = useState('');
    const [primary, setPrimary] = useState(false);

    const handleSubmit = () => {
        if (!name.match(/^[a-zA-Z]+$/)) {
            alert('Name should only contain letters.');
            return;
        }
        onAddCatalog(name, primary);
        setName('');
        setPrimary(false);
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Catalog Name"
            />
            <label>
                <input
                    type="checkbox"
                    checked={primary}
                    onChange={(e) => setPrimary(e.target.checked)}
                />
                Primary
            </label>
            <button onClick={handleSubmit}>Add Catalog</button>
        </form>
    );
};

export default AddCatalogForm;
