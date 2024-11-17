import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import CatalogTable from './components/CatalogTable';
import AddCatalogForm from './components/AddCatalogForm';
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

    const handleShowModal = () => setShowAddModal(true);
    const handleCloseModal = () => setShowAddModal(false);

    // Fetch catalogs from the server when the app loads
    useEffect(() => {
        const fetchCatalogs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/catalogs');
                console.log('Fetched catalogs:', response.data); // Debug log
                setCatalogs(response.data); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching catalogs:', error); // Debug error
            } finally {
                setLoading(false); // Ensure loading stops
            }
        };
    
        fetchCatalogs();
    }, []);
    

    // Add a new catalog by sending it to the backend
    const handleAddCatalog = async (name: string, primary: boolean) => {
        const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        const maxId = catalogs.reduce((max, catalog) => Math.max(max, parseInt(catalog.id)), 0);
        const newId = (maxId + 1).toString();

        const newCatalog = {
            id: newId,
            name,
            primary,
            indexedAt: formattedDate,
        };

        try {
            const response = await axios.post('http://localhost:3000/catalogs', newCatalog); // POST new catalog to backend
            setCatalogs([...catalogs, response.data]); // Update state with the new catalog
        } catch (error) {
            console.error('Error adding catalog:', error);
        } finally {
            setShowAddForm(false);
        }
    };

    const handleDeleteCatalog = async (id: string) => {
        console.log('Deleting catalog with id:', id); // Debug log
        try {
            await axios.delete(`http://localhost:3000/catalogs/${id}`);
            setCatalogs(catalogs.filter((catalog) => catalog.id !== id));
        } catch (error) {
            console.error('Error deleting catalog:', error);
        }
    };

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
        return <p>Loading catalogs...</p>; // Show a loading message while data is being fetched
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

                {/* Add Catalog Button */}
                <button className="btn btn-primary mb-3" onClick={() => setShowAddForm(true)}>
                    Add Catalog
                </button>

                {/* Add Catalog Form */}
                {showAddForm && (
                    <div className="card p-3 mb-4">
                        <AddCatalogForm onAddCatalog={handleAddCatalog} />
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