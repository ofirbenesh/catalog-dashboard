import React from 'react';

interface Catalog {
    id: string;
    name: string;
    primary: boolean;
    indexedAt: string;
}

interface CatalogTableProps {
    catalogs: Catalog[];
    onDelete: (ids: string[]) => void;
    onTogglePrimary: (id: string, primary: boolean) => void;
}

const CatalogTable: React.FC<CatalogTableProps> = ({ catalogs, onDelete, onTogglePrimary }) => {
    if (catalogs.length === 0) {
        return <p>No catalogs found.</p>; // Show a message if no data exists
    }

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Primary</th>
                    <th>Indexed At</th>
                    <th>Actions</th>
                </tr>
            </thead>
                <tbody>
                {catalogs.map((catalog) => (
                    <tr key={catalog.id}> {/* Use id as the unique key */}
                        <td>{catalog.name}</td>
                        <td>{catalog.primary ? 'Yes' : 'No'}</td>
                        <td>{new Date(catalog.indexedAt).toLocaleString()}</td>
                        <td>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                                console.log('Deleting catalog with id:', catalog.id); // Debug log
                                onDelete([catalog.id]);
                            }}
                        >
                            Delete
                        </button>
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => onTogglePrimary(catalog.id, !catalog.primary)}
                            >
                                Toggle Primary
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CatalogTable;
