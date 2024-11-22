import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import CatalogTable from '../CatalogTable';
import { Catalog } from '../Catalog';

test("deletes a catalog from the table when the delete button is clicked", async () => {
    const mockCatalogs = [
        { id: "1", name: "Electronics", primary: false, indexedAt: "2024-11-18T12:00:00Z" },
        { id: "2", name: "Books", primary: true, indexedAt: "2024-11-18T11:00:00Z" },
    ];
    const mockSetCatalogs = jest.fn();
    global.fetch = jest.fn().mockResolvedValue({ ok: true });

    // Render the component
    await act(async () => {
        render(
            <CatalogTable
                catalogs={mockCatalogs}
                onDelete={(ids) => {
                    ids.forEach((id) => {
                        fetch(`http://localhost:3000/catalogs/${id}`, { method: "DELETE" });
                        mockSetCatalogs(mockCatalogs.filter((catalog) => catalog.id !== id));
                    });
                }}
                onUpdate={jest.fn()} // Add a mock onUpdate function here
            />
        );
    });

    // Click the delete button for the first catalog
    const deleteButtons = screen.getAllByText(/delete/i);
    fireEvent.click(deleteButtons[0]);

    // Assert fetch was called
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/catalogs/1", { method: "DELETE" });

    // Assert the catalog was removed from the list
    expect(mockSetCatalogs).toHaveBeenCalledWith([{ id: "2", name: "Books", primary: true, indexedAt: "2024-11-18T11:00:00Z" }]);
});
