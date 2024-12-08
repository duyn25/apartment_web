import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import axios from 'axios';
import AddApartmentForm from './AddApartmentForm';

// Mocking axios
jest.mock('axios');

describe('AddApartmentForm Component', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: [
                { _id: '66a2f3703d67462cfbde9922', name: 'Bob Smith' },
                { _id: '66a2f3703d67462cfbde9923', name: 'Charlie Brown' },
            ],
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders form fields correctly', async () => {
        render(<AddApartmentForm onClose={jest.fn()} />);

        expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Address:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/City:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/State:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Zipcode:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Country:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Price:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Area:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Bedrooms:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Bathrooms:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Balconies:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Floor:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Furnishing:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Parking:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Amenities \(comma separated\):/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Images:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Video Tour:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Shopping Malls \(comma separated\):/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Schools \(comma separated\):/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Hospitals \(comma separated\):/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Public Transport \(comma separated\):/i)).toBeInTheDocument();
        expect(await screen.findByText(/Bob Smith/i)).toBeInTheDocument();
    });

    test('handles form submission successfully', async () => {
        const mockClose = jest.fn();
        axios.post.mockResolvedValue({ data: { success: true } });

        render(<AddApartmentForm onSubmit={mockClose} />);

        fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Luxury Apartment' } });
        fireEvent.change(screen.getByLabelText(/Address:/i), { target: { value: '123 Main St' } });
        fireEvent.change(screen.getByLabelText(/City:/i), { target: { value: 'Metropolis' } });
        fireEvent.change(screen.getByLabelText(/State:/i), { target: { value: 'NY' } });
        fireEvent.change(screen.getByLabelText(/Zipcode:/i), { target: { value: '10001' } });
        fireEvent.change(screen.getByLabelText(/Country:/i), { target: { value: 'USA' } });
        fireEvent.change(screen.getByLabelText(/Price:/i), { target: { value: '500000' } });
        fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'Beautiful apartment in the city center.' } });
        fireEvent.change(screen.getByLabelText(/Area:/i), { target: { value: '1200' } });
        fireEvent.change(screen.getByLabelText(/Bedrooms:/i), { target: { value: '3' } });
        fireEvent.change(screen.getByLabelText(/Bathrooms:/i), { target: { value: '2' } });
        fireEvent.change(screen.getByLabelText(/Balconies:/i), { target: { value: '2' } });
        fireEvent.change(screen.getByLabelText(/Floor:/i), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText(/Furnishing:/i), { target: { value: 'Fully Furnished' } });
        fireEvent.change(screen.getByLabelText(/Parking:/i), { target: { value: '2' } });
        fireEvent.change(screen.getByLabelText(/Amenities \(comma separated\):/i), { target: { value: 'Pool,Gym' } });
        fireEvent.change(screen.getByLabelText(/Shopping Malls \(comma separated\):/i), { target: { value: 'Mall1,Mall2' } });
        fireEvent.change(screen.getByLabelText(/Schools \(comma separated\):/i), { target: { value: 'School1,School2' } });
        fireEvent.change(screen.getByLabelText(/Hospitals \(comma separated\):/i), { target: { value: 'Hospital1,Hospital2' } });
        fireEvent.change(screen.getByLabelText(/Public Transport \(comma separated\):/i), { target: { value: 'Bus,Metro' } });

        const submitButton = screen.getByRole('button', { name: /Insert Apartment/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(mockClose).toHaveBeenCalled();
        });
    });


    test('displays alert message when apartment insertion fails', async () => {
        // Mocking axios.post to reject with a structured error
        jest.spyOn(axios, 'post').mockRejectedValueOnce({
            response: { data: { success: false } }
        });
    
        // Mocking alert
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
        render(<AddApartmentForm onClose={() => {}} />);
    
        // Simulate form input
        fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Luxury Apartment' } });
        // Add other fields if necessary
        fireEvent.change(screen.getByLabelText(/Price:/i), { target: { value: '500000' } });
        fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'Beautiful apartment in the city center.' } });
    
        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /Insert Apartment/i }));
    
        // Wait for alert
        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('Failed to insert apartment');
        });
    
        // Restore alert
        alertMock.mockRestore();
    });
    

});
