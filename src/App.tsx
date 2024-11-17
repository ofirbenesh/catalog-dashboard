import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import CatalogTable from './components/CatalogTable';
import AddCatalogForm from './components/AddCatalogForm';
import handleAddCatalog from './components/AddCatalog';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';

interface Catalog {
    id: string;
    name: string;
    primary: boolean;
    indexedAt: string;
}

const App: React.FC = () => {
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    const [filteredCatalogs, setFilteredCatalogs] = useState<Catalog[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleShowModal = () => setShowAddModal(true);
    const handleCloseModal = () => setShowAddModal(false);

    // Fetch catalogs from the server when the app loads
    useEffect(() => {
        const fetchCatalogs = async () => {
            try {
                const response = await fetch('http://localhost:3000/catalogs');
                const data = await response.json();
                setCatalogs(data);
                setFilteredCatalogs(data); // Initially, show all catalogs
            } catch (error) {
                console.error('Error fetching catalogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCatalogs();
    }, []);

    // Filter catalogs whenever searchTerm changes
    useEffect(() => {
        const filtered = catalogs.filter((catalog) =>
            catalog.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCatalogs(filtered);
    }, [searchTerm, catalogs]);
    

    // delete an existing catalog
    const handleDeleteCatalog = async (id: string) => {
        console.log('Deleting catalog with id:', id); // Debug log
        try {
            await axios.delete(`http://localhost:3000/catalogs/${id}`);
            setCatalogs(catalogs.filter((catalog) => catalog.id !== id));
        } catch (error) {
            console.error('Error deleting catalog:', error);
        }
    };
    
    // update a catalog
    const handleUpdateCatalog = async (id: string, updateData: Partial<Catalog>) => {
        try {
            const response = await axios.put(`http://localhost:3000/catalogs/${id}`, updateData);
            // Update the local state with the modified catalog
            setCatalogs(
                catalogs.map((catalog) =>
                    catalog.id === id ? { ...catalog, ...updateData } : catalog
                )
            );
        } catch (error) {
            console.error('Error updating catalog:', error);
        }
    };    
    

    if (loading) {
        return <p>Loading catalogs...</p>;
    }

    return (
        <div className="main-container">
            <div className="container mt-5">
                {/* Add Logo */}
                <div className="text-center">
                    <img src="/logo2.png" alt="Logo" className="logo" />
                </div>

                {/* Headline */}
                <h1 className="text-center mb-4">Catalog Dashboard</h1>

                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Add Catalog Button */}
                <button className="btn btn-primary mb-3" onClick={() => setShowAddForm(true)}>
                    Add Catalog
                </button>

                {/* Add Catalog Form */}
                {showAddForm && (
                    <div className="card p-3 mb-4">
                        <AddCatalogForm
                            onAddCatalog={(name, primary) =>
                                handleAddCatalog(name, primary, catalogs, setCatalogs, setShowAddForm)
                            }
                        />
                        <button className="btn btn-secondary mt-2" onClick={() => setShowAddForm(false)}>
                            Close
                        </button>
                    </div>
                )}

                {/* Catalog Table */}
                <CatalogTable
                    catalogs={catalogs}
                    onDelete={(ids) => ids.forEach((id) => handleDeleteCatalog(id))}
                    onUpdate={(id, updateData) => handleUpdateCatalog(id, updateData)}
                />
            </div>
        </div>
    );
};

export default App;