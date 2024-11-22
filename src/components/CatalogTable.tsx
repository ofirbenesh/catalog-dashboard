import React, { useState } from 'react';

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
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedIds.length === catalogs.length) {
            setSelectedIds([]); // Deselect all
        } else {
            setSelectedIds(catalogs.map((catalog) => catalog.id)); // Select all
        }
    };

    return (
        <>
            {/* Bulk Delete Button */}
            {selectedIds.length > 0 && (
                <button
                    className="btn btn-danger mb-3"
                    onClick={() => onDelete(selectedIds)}
                >
                    Bulk Delete
                </button>
            )}

            {/* Catalog Table */}
            <table className="table table-striped table-hover table-bordered text-center">
                <thead className="table-dark">
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={selectedIds.length === catalogs.length}
                            />
                        </th>
                        <th>Name</th>
                        <th>Primary</th>
                        <th>Indexed At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {catalogs.map((catalog) => (
                        <tr key={catalog.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(catalog.id)}
                                    onChange={() => handleSelect(catalog.id)}
                                />
                            </td>
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
                                <i className="bi bi-trash"></i> Delete
                            </button>
                                <button
                                    className="btn btn-secondary btn-sm me-2"
                                    onClick={() =>
                                        onUpdate(catalog.id, { primary: !catalog.primary })
                                    }
                                >
                                    Toggle Primary
                                </button>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() =>
                                        onUpdate(catalog.id, {
                                            indexedAt: new Date().toISOString(),
                                        })
                                    }
                                >
                                    Start Indexing
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default CatalogTable;
