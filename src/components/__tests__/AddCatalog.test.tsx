import { act } from 'react';
import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';

test("adds a new catalog and displays it in the table", async () => {
    global.fetch = jest.fn()
        // Mock fetch for initial catalog load
        .mockResolvedValueOnce({
            ok: true,
            json: async () => [],
        })
        // Mock fetch for adding a catalog
        .mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                id: "3",
                name: "New Catalog",
                primary: true,
                indexedAt: "2024-11-19T12:00:00Z",
            }),
        });

    render(<App />);

    // Wait for "Add Catalog" button to appear
    await waitFor(() => {
        expect(screen.getByText(/Add Catalog/i)).toBeInTheDocument();
    });

    // Click the "Add Catalog" button
    fireEvent.click(screen.getByText(/Add Catalog/i));

    // Fill the form
    fireEvent.change(screen.getByPlaceholderText("Enter catalog name"), { target: { value: "New Catalog" } });
    fireEvent.click(screen.getByLabelText(/Set as Primary/i));

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Add Catalog/i }));

    // Wait for the new catalog to appear
    await waitFor(() => {
        expect(screen.getByText("New Catalog")).toBeInTheDocument();
    });
});