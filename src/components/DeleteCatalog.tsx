import { Catalog } from './Catalog';

const handleDeleteCatalog = async (
    ids: string[],
    catalogs: Catalog[],
    setCatalogs: React.Dispatch<React.SetStateAction<Catalog[]>>
) => {
    console.log('Deleting catalogs with IDs:', ids); // Debug log
    try {
        // Delete all selected catalogs using fetch
        await Promise.all(
            ids.map((id) =>
                fetch(`http://localhost:3000/catalogs/${id}`, {
                    method: 'DELETE',
                })
            )
        );
        // Update the state to exclude the deleted catalogs
        setCatalogs((prev) => prev.filter((catalog) => !ids.includes(catalog.id)));
    } catch (error) {
        console.error('Error deleting catalogs:', error);
    }
};

export default handleDeleteCatalog;
