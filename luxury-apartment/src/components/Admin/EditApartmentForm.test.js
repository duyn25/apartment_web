import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import EditApartmentForm from './EditApartmentForm';

jest.mock('axios');

describe('EditApartmentForm Component', () => {
    const mockApartmentDetails = {
        _id: "66ba23f878be3025421db063",
        name: "Luxurious Penthouse",
        location: {
            address: "123 Skyline Avenue",
            city: "Metropolis",
            state: "NY",
            zipcode: "10001",
            country: "USA",
        },
        price: 2500000,
        description: "A stunning penthouse with breathtaking city views, offering the epitome of luxury living.",
        features: {
            area: '5000',
            bedrooms: 4,
            bathrooms: 5,
            balconies: 3,
            floor: "30th",
            furnishing: "Fully Furnished",
            parking: "2 Spaces",
        },
        amenities: ["Pool", "Gym", "Concierge", "Spa", "Cinema", "Garden", "Playground", "BBQ Area"],
        images: [
            "https://example.com/images/penthouse1.jpg",
            "https://example.com/images/penthouse2.jpg",
            "https://example.com/images/penthouse3.jpg",
        ],
        videoTour: "https://example.com/videos/penthouse-tour.mp4",
        nearbyFacilities: {
            shoppingMalls: ["Mall 1", "Mall 2"],
            schools: ["School 1", "School 2"],
            hospitals: ["Hospital 1", "Hospital 2"],
            publicTransport: ["Bus Station", "Metro Station"],
        },
        contactInfo: "66b4e9db5842ad48522a617d",
    };

    const mockEmployees = [
        { _id: '66a2f3703d67462cfbde9922', name: 'Bob Smith' },
        { _id: '66a2f3703d67462cfbde9923', name: 'Charlie Brown' },
    ];

    beforeEach(() => {
        axios.get.mockResolvedValue({ data: mockEmployees });
        axios.post.mockResolvedValue({ data: { success: true } });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the form with apartment details', async () => {
        await act(async () => {
            render(<EditApartmentForm apartmentDetails={mockApartmentDetails} onClose={jest.fn()} />);
        });

        expect(screen.getByLabelText('Name:')).toHaveValue(mockApartmentDetails.name);
        expect(screen.getByLabelText('Address:')).toHaveValue(mockApartmentDetails.location.address);
        expect(screen.getByLabelText('Price:')).toHaveValue(mockApartmentDetails.price);
        expect(screen.getByLabelText('Area:')).toHaveValue(mockApartmentDetails.features.area);
    });

    it('submits the form and displays success alert', async () => {
        window.alert = jest.fn();

        await act(async () => {
            render(<EditApartmentForm apartmentDetails={mockApartmentDetails} onSubmit={jest.fn()} />);
        });

        fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Updated Apartment' } });
        fireEvent.submit(screen.getByRole('button', { name: /edit apartment/i }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(window.alert).toHaveBeenCalledWith('Apartment edit successfully');
        });
    });

    it('displays an alert when apartment edit fails', async () => {
        window.alert = jest.fn();
        axios.post.mockRejectedValueOnce({ response: { data: { success: false } } });

        await act(async () => {
            render(<EditApartmentForm apartmentDetails={mockApartmentDetails} onSubmit={jest.fn()} />);
        });

        fireEvent.submit(screen.getByRole('button', { name: /Edit Apartment/i }));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Failed to edit apartment');
        });
    });
});
