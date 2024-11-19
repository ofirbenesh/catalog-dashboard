import axios from 'axios';
import { Catalog } from './Catalog';

const handleUpdateCatalog = async (
    id: string,
    updateData: Partial<Catalog>,
    catalogs: Catalog[],
    setCatalogs: React.Dispatch<React.SetStateAction<Catalog[]>>
) => {
    try {
        if (updateData.primary !== undefined) {
            // If updating the 'primary' field
            if (updateData.primary === true) {
                // Set 'primary' to false for all other catalogs
                const updatedCatalogs = catalogs.map((catalog) =>
                    catalog.id === id
                        ? { ...catalog, primary: true }
                        : { ...catalog, primary: false }
                );

                // Update backend for all catalogs
                await Promise.all(
                    updatedCatalogs.map((catalog) =>
                        axios.put(`http://localhost:3000/catalogs/${catalog.id}`, {
                            primary: catalog.primary,
                        })
                    )
                );

                // Update local state
                setCatalogs(updatedCatalogs);
            } else {
                // If setting 'primary' to false
                // Update the specific catalog
                await axios.put(`http://localhost:3000/catalogs/${id}`, updateData);

                // Update local state
                setCatalogs((prev) =>
                    prev.map((catalog) =>
                        catalog.id === id ? { ...catalog, primary: false } : catalog
                    )
                );
            }
        } else if (updateData.indexedAt !== undefined) {
            // If updating 'indexedAt' field
            // Update backend
            await axios.put(`http://localhost:3000/catalogs/${id}`, updateData);

            // Update local state
            setCatalogs((prev) =>
                prev.map((catalog) =>
                    catalog.id === id
                        ? { ...catalog, indexedAt: updateData.indexedAt! }
                        : catalog
                )
            );
        } else {
            // Other updates
            // Update backend
            await axios.put(`http://localhost:3000/catalogs/${id}`, updateData);

            // Update local state
            setCatalogs((prev) =>
                prev.map((catalog) =>
                    catalog.id === id ? { ...catalog, ...updateData } : catalog
                )
            );
        }
    } catch (error) {
        console.error('Error updating catalog:', error);
    }
};

export default handleUpdateCatalog;
