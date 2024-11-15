import React, { useState } from 'react';
import { format } from 'date-fns';
import CatalogTable from './components/CatalogTable';
import AddCatalogForm from './components/AddCatalogForm';

const App: React.FC = () => {
    const [catalogs, setCatalogs] = useState([
        { id: '1', name: 'Electronics', primary: true, indexedAt: '2024-01-01 10:00:00' },
        { id: '2', name: 'Clothing', primary: false, indexedAt: '2024-01-02 14:00:00' },
        { id: '3', name: 'Home Decor', primary: false, indexedAt: '2024-01-03 16:00:00' },
    ]);

    const [showAddForm, setShowAddForm] = useState(false);

    const handleAddCatalog = (name: string, primary: boolean) => {
        const maxId = catalogs.reduce((max, catalog) => Math.max(max, parseInt(catalog.id)), 0);
        const newId = (maxId + 1).toString();

    const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const newCatalog = {
        id: newId,
        name,
        primary,
        indexedAt: formattedDate,
    };

        setCatalogs([...catalogs, newCatalog]);
        setShowAddForm(false);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Catalog Dashboard</h1>
            <button
                className="btn btn-primary mb-3"
                onClick={() => setShowAddForm(true)}
            >
                Add Catalog
            </button>

            {showAddForm && (
                <div className="card p-3 mb-4">
                    <AddCatalogForm onAddCatalog={handleAddCatalog} />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={() => setShowAddForm(false)}
                    >
                        Close
                    </button>
                </div>
            )}

            <CatalogTable
                catalogs={catalogs}
                onDelete={(ids) => console.log(ids)}
                onTogglePrimary={(id, primary) => console.log(id, primary)}
            />
        </div>
    );
};

export default App;
