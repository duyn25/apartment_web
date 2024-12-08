// Detailapartment.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // for additional matchers
import Detailapartment from './DetailsApartment';
import EditApartmentForm from './EditApartmentForm'; // Ensure EditApartmentForm is correctly imported or mocked

const mockApartmentDetails = {
    _id: "66ba23f878be3025421db063",
    name: "Luxurious Penthouse",
    location: {
        address: "123 Luxury Ave",
        city: "Metropolis",
        state: "CA",
        zipcode: "90001",
        country: "USA"
    },
    price: 2500000,
    description: "A stunning penthouse with breathtaking city views, offering the epitome of luxury and comfort.",
    features: {
        area: "3500 sqft",
        bedrooms: 4,
        bathrooms: 4,
        balconies: 2,
        floor: "Top floor",
        furnishing: "Fully furnished",
        parking: "2 reserved parking spaces"
    },
    amenities: [
        "Swimming Pool",
        "Gym",
        "Spa",
        "24/7 Security",
        "Concierge Service",
        "Private Elevator",
        "Home Theater",
        "Smart Home Technology"
    ],
    images: [
        "https://example.com/images/penthouse1.jpg",
        "https://example.com/images/penthouse2.jpg",
        "https://example.com/images/penthouse3.jpg"
    ],
    videoTour: "https://example.com/videos/penthouse-tour.mp4",
    nearbyFacilities: {
        shoppingMalls: ["Mall A", "Mall B"],
        schools: ["School X", "School Y"],
        hospitals: ["Hospital Z", "Hospital W"],
        publicTransport: ["Bus Station 1", "Train Station 1"]
    },
    contactInfo: {
        _id: "66b4e9db5842ad48522a617d",
        name: "John Doe",
        email: "john.doe@example.com"
    }
};


describe('Detailapartment Component', () => {
    beforeEach(() => {
        // Mock window.alert
        global.alert = jest.fn();
    });

    afterEach(() => {
        // Clear all instances and calls to constructor and all methods:
        jest.clearAllMocks();
    });

    test('renders apartment details correctly', async () => {
        render(<Detailapartment apartmentDetails={mockApartmentDetails} />);

        await waitFor(() => {
            expect(screen.getByText('Luxurious Penthouse')).toBeInTheDocument();
            expect(screen.getByText('A stunning penthouse with breathtaking city views, offering the epitome of luxury and comfort.')).toBeInTheDocument();
            expect(screen.getByText('$2500000')).toBeInTheDocument();

            // Check location
            // expect(screen.getByText('123 Luxury Ave, Metropolis, CA, 90001, USA')).toBeInTheDocument();

            // Check features
            expect(screen.getByText('Area: 3500 sqft')).toBeInTheDocument();
            expect(screen.getByText('Bedrooms: 4')).toBeInTheDocument();
            expect(screen.getByText('Bathrooms: 4')).toBeInTheDocument();
            expect(screen.getByText('Balconies: 2')).toBeInTheDocument();
            expect(screen.getByText('Floor: Top floor')).toBeInTheDocument();
            expect(screen.getByText('Furnishing: Fully furnished')).toBeInTheDocument();
            expect(screen.getByText('Parking: 2 reserved parking spaces')).toBeInTheDocument();

            // Check amenities
            expect(screen.getByText('Swimming Pool')).toBeInTheDocument();
            expect(screen.getByText('Gym')).toBeInTheDocument();
            expect(screen.getByText('Spa')).toBeInTheDocument();
            expect(screen.getByText('24/7 Security')).toBeInTheDocument();
            expect(screen.getByText('Concierge Service')).toBeInTheDocument();
            expect(screen.getByText('Private Elevator')).toBeInTheDocument();
            expect(screen.getByText('Home Theater')).toBeInTheDocument();
            expect(screen.getByText('Smart Home Technology')).toBeInTheDocument();

            // Check contact info
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();

            // Check nearby facilities
            expect(screen.getByText('Shopping Malls:')).toBeInTheDocument();
            expect(screen.getByText('Mall A')).toBeInTheDocument();
            expect(screen.getByText('Mall B')).toBeInTheDocument();
            expect(screen.getByText('Schools:')).toBeInTheDocument();
            expect(screen.getByText('School X')).toBeInTheDocument();
            expect(screen.getByText('School Y')).toBeInTheDocument();
            expect(screen.getByText('Hospitals:')).toBeInTheDocument();
            expect(screen.getByText('Hospital Z')).toBeInTheDocument();
            expect(screen.getByText('Hospital W')).toBeInTheDocument();
            expect(screen.getByText('Public Transport:')).toBeInTheDocument();
            expect(screen.getByText('Bus Station 1')).toBeInTheDocument();
            expect(screen.getByText('Train Station 1')).toBeInTheDocument();

            // Check video tour
            expect(screen.getByTitle('Video Tour')).toBeInTheDocument();
        })

    });

    test('shows EditApartmentForm when "Edit Apartment" button is clicked', async () => {
        render(<EditApartmentForm apartmentDetails={mockApartmentDetails} />);

        await waitFor(() => {
            // Check that EditApartmentForm is not visible initially
            // expect(screen.queryByText('Edit Apartment')).not.toBeInTheDocument();

            // Click the "Edit Apartment" button
            fireEvent.submit(screen.getByRole('button', { name: /Confirm Edit Apartment/i }));
            // Check that EditApartmentForm is visible  
            expect(screen.getByText('Form Edit Apartment')).toBeInTheDocument();
        })
    });

    test('hides EditApartmentForm when close button is clicked', async () => {
        render(<Detailapartment apartmentDetails={mockApartmentDetails} />);
        await waitFor(() => {
            // Open EditApartmentForm
            fireEvent.click(screen.getByText('Edit Apartment'));

            // Check that EditApartmentForm is visible
            expect(screen.getByText('Form Edit Apartment')).toBeInTheDocument();

            // Nếu cần, bạn có thể sử dụng `getByTestId` để chọn dễ hơn:
            const closeIcon = screen.getByTestId('close-icon'); // nếu bạn sử dụng data-testid để chọn dễ hơn

            // Check that EditApartmentForm is no longer visible
            fireEvent.click(closeIcon);
        })

    });
});
