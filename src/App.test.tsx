import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test("renders Catalog Dashboard title", async () => {
    render(<App />);

    // check title
    await waitFor(() => {
        expect(screen.getByText(/Catalog Dashboard/i)).toBeInTheDocument();
    });
});
