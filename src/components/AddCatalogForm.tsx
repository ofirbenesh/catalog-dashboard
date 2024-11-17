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
        <form
            className="p-4 border rounded shadow-sm bg-light"
            onSubmit={(e) => e.preventDefault()}
        >
            <div className="mb-3">
                <label htmlFor="catalogName" className="form-label">
                    Catalog Name
                </label>
                <input
                    type="text"
                    id="catalogName"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter catalog name"
                />
            </div>
            <div className="form-check mb-3">
                <input
                    type="checkbox"
                    id="isPrimary"
                    className="form-check-input"
                    checked={primary}
                    onChange={(e) => setPrimary(e.target.checked)}
                />
                <label htmlFor="isPrimary" className="form-check-label">
                    Set as Primary
                </label>
            </div>
            <button
                type="button"
                className="btn btn-primary w-100"
                onClick={handleSubmit}
            >
                Add Catalog
            </button>
        </form>
    );
};

export default AddCatalogForm;
