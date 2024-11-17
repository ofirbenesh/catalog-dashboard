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
    onUpdate: (id: string, updateData: Partial<Catalog>) => void;
}

const CatalogTable: React.FC<CatalogTableProps> = ({ catalogs, onDelete, onUpdate }) => {
    if (catalogs.length === 0) {
        return <p>No catalogs found.</p>; // Show a message if no data exists
    }

    return (
        <table className="table table-striped table-hover table-bordered text-center">
            <thead className="table-dark">
                <tr>
                    <th>Name</th>
                    <th>Primary</th>
                    <th>Indexed At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {catalogs.map((catalog) => (
                    <tr key={catalog.id}>
                        <td>{catalog.name}</td>
                        <td>
                            {catalog.primary && (
                                <span className="badge bg-success">Primary</span>
                            )}
                        </td>
                        <td>{new Date(catalog.indexedAt).toLocaleString()}</td>
                        <td>
                            <button
                                className="btn btn-danger btn-sm me-2"
                                onClick={() => onDelete([catalog.id])}
                            >
                                Delete
                            </button>
                            <button
                                className="btn btn-secondary btn-sm me-2"
                                onClick={() => onUpdate(catalog.id, { primary: !catalog.primary })}
                            >
                                Toggle Primary
                            </button>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() =>
                                    onUpdate(catalog.id, { indexedAt: new Date().toISOString() })
                                }
                            >
                                Start Indexing
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};    

export default CatalogTable;
