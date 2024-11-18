import axios from 'axios';
import { Catalog } from './Catalog';

const handleDeleteCatalog = async (
    ids: string[],
    catalogs: Catalog[],
    setCatalogs: React.Dispatch<React.SetStateAction<Catalog[]>>
) => {
    console.log('Deleting catalogs with IDs:', ids); // Debug log
    try {
        await Promise.all(ids.map((id) => axios.delete(`http://localhost:3000/catalogs/${id}`)));
        setCatalogs((prev) => prev.filter((catalog) => !ids.includes(catalog.id)));
    } catch (error) {
        console.error('Error deleting catalogs:', error);
    }
};

export default handleDeleteCatalog;
