import { format } from 'date-fns';
import axios from 'axios';
import { Catalog } from './Catalog';

const handleAddCatalog = async (
    name: string,
    primary: boolean,
    catalogs: Catalog[],
    setCatalogs: React.Dispatch<React.SetStateAction<Catalog[]>>,
    setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
        const response = await axios.post('http://localhost:3000/catalogs', newCatalog);
        setCatalogs((prev) => [...prev, response.data]); // Update state with the new catalog
    } catch (error) {
        console.error('Error adding catalog:', error);
    } finally {
        setShowAddForm(false);
    }
};

export default handleAddCatalog;
