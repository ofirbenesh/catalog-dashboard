import { format } from 'date-fns';
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
        // Use fetch to send a POST request
        const response = await fetch('http://localhost:3000/catalogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCatalog),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const createdCatalog = await response.json();

        // Update state with the new catalog
        setCatalogs((prev) => [...prev, createdCatalog]);
    } catch (error) {
        console.error('Error adding catalog:', error);
    } finally {
        setShowAddForm(false);
    }
};

export default handleAddCatalog;
