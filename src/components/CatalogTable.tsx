import React from 'react';

interface Catalog {
    id: string;
    name: string;
    primary: boolean;
    indexedAt: string;
}

interface Props {
    catalogs: Catalog[];
    onDelete: (ids: string[]) => void;
    onTogglePrimary: (id: string, primary: boolean) => void;
}

const CatalogTable: React.FC<Props> = ({ catalogs, onDelete, onTogglePrimary }) => (
    <table className="table table-striped">
        <thead className="thead-light">
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
                        <button
                            className={`btn ${catalog.primary ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={() => onTogglePrimary(catalog.id, !catalog.primary)}
                        >
                            {catalog.primary ? 'Unset Primary' : 'Set Primary'}
                        </button>
                    </td>
                    <td>{catalog.indexedAt}</td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => onDelete([catalog.id])}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default CatalogTable;
