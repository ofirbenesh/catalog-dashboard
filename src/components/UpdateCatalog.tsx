import axios from 'axios';
import { Catalog } from './Catalog';

const handleUpdateCatalog = async (
    id: string,
    updateData: Partial<Catalog>,
    catalogs: Catalog[],
    setCatalogs: React.Dispatch<React.SetStateAction<Catalog[]>>
) => {
    try {
        const response = await axios.put(`http://localhost:3000/catalogs/${id}`, updateData);
        const updatedCatalog = response.data;

        console.log('Updated Catalog:', updatedCatalog);

        // Update the local state with the modified catalog
        setCatalogs((prev) =>
            prev.map((catalog) =>
                catalog.id === id ? { ...catalog, ...updateData } : catalog
            )
        );
    } catch (error) {
        console.error('Error updating catalog:', error);
    }
};

export default handleUpdateCatalog;
