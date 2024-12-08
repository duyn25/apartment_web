import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/AddApartmentForm.css'; // Import file CSS

const EditApartmentForm = ({ apartmentDetails, onClose}) => {
    const [employees, setEmployee] = useState();
    const [result, setResult] = useState(false);
    const [apartment, setApartment] = useState({
        id: apartmentDetails._id,
        name: apartmentDetails.name,
        location: {
            address: apartmentDetails.location.address,
            city: apartmentDetails.location.city,
            state: apartmentDetails.location.state,
            zipcode: apartmentDetails.location.zipcode,
            country: apartmentDetails.location.country,
        },
        price: apartmentDetails.price,
        description: apartmentDetails.description,
        features: {
            area: apartmentDetails.features.area,
            bedrooms: apartmentDetails.features.bedrooms,
            bathrooms: apartmentDetails.features.bathrooms,
            balconies: apartmentDetails.features.balconies,
            floor: apartmentDetails.features.floor,
            furnishing: apartmentDetails.features.furnishing,
            parking: apartmentDetails.features.parking,
        },
        amenities: apartmentDetails.amenities,
        images: [apartmentDetails.images],
        videoTour: apartmentDetails.videoTour,
        nearbyFacilities: {
            shoppingMalls: apartmentDetails.nearbyFacilities.shoppingMalls,
            schools: apartmentDetails.nearbyFacilities.schools,
            hospitals: apartmentDetails.nearbyFacilities.hospitals,
            publicTransport: apartmentDetails.nearbyFacilities.publicTransport,
        },
        contactInfo: apartmentDetails.contactInfo, // ID of the Employee
    });
    //console.log(apartment);
    useEffect(() => {
        const getEmployee = async () => {
            try {
                const response = await axios.get('http://localhost:5000/contact');
                setEmployee(response.data);
                //console.log(response.data);
            } catch (err) {
                console.error('Error fetching employee:', err);
            }
        }
        getEmployee();

    }, []);
    useEffect(() => {
        if (result) {
            setTimeout(
                () => {
                    window.location.reload();
                }, 1000
            )
        }
    }, [result]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApartment((prevApartment) => ({
            ...prevApartment,
            [name]: value,
        }));

    };

    const handleNestedChange = (e, nestedKey) => {
        const { name, value } = e.target;
        setApartment((prevApartment) => ({
            ...prevApartment,
            [nestedKey]: {
                ...prevApartment[nestedKey],
                [name]: value,
            },
        }));
    };

    const handleFileChange = (e, fileKey) => {
        const files = Array.from(e.target.files); // Lấy tất cả các file
        if (files.length > 0) {
            setApartment((prevApartment) => ({
                ...prevApartment,
                [fileKey]: files, // Lưu mảng các file
            }));
        } else {
            setApartment((prevApartment) => ({
                ...prevApartment,
                [fileKey]: apartmentDetails[fileKey]
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (let key in apartment) {
            if (key === 'images' || key === 'videoTour') {
                if (Array.isArray(apartment[key]) && apartment[key][0] instanceof File) {
                    // Nếu là tệp mới, thêm tệp vào formData
                    apartment[key].forEach((file) => {
                        formData.append(key, file);
                    });
                } else {
                    // Nếu không có tệp mới, sử dụng tên tệp cũ
                    formData.append(key, apartment[key]);
                }
            } else if (typeof apartment[key] === 'object' && apartment[key] !== null) {
                for (let nestedKey in apartment[key]) {
                    formData.append(`${key}.${nestedKey}`, apartment[key][nestedKey]);
                }
            } else {
                formData.append(key, apartment[key]);
            }
        }
        // formData.forEach((value, key) => {
        //     console.log('Form Data');
        //     console.log(key, value);
        // });
        try {
            const response = await axios.post('http://localhost:5000/edit-apartment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                alert('Apartment edit successfully');
                setResult(true);
                // onSubmit();
            } else {
                //throw new Error('Failed to edit apartment');
                alert('Failed to edit apartment');
            }
        } catch (err) {
            console.error('Error inserting apartment:', err);
            alert('Failed to edit apartment');
        }
    };

    return (
        <>
            <div className='add-apartment-container'>
                <form onSubmit={handleSubmit} className="insert-apartment-form" encType="multipart/form-data">
                    <div>
                        <i onClick={onClose} data-testid="close-icon" aria-label="close" className="fa-regular fa-circle-xmark"></i>
                        <h2 style={{ textAlign: 'center' }}>Form Edit Apartment</h2>
                    </div>

                    <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr)' }}>
                        <div>
                            <div className='info-apartment-box'>
                                <label htmlFor="name">Name:</label>
                                <br />
                                <input
                                    required
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={apartment.name}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>

                            <div className='info-apartment-box'>
                                <h3>Location</h3>
                                <label htmlFor="address">Address:</label>
                                <br />
                                <input required
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={apartment.location.address}
                                    onChange={(e) => handleNestedChange(e, 'location')}
                                    className="input-field"
                                />
                                <label htmlFor="city">City:</label>
                                <br />
                                <input
                                    required
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={apartment.location.city}
                                    onChange={(e) => handleNestedChange(e, 'location')}
                                    className="input-field"
                                />
                                <label htmlFor="state">State:</label>
                                <br />
                                <input
                                    required
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={apartment.location.state}
                                    onChange={(e) => handleNestedChange(e, 'location')}
                                    className="input-field"
                                />
                                <label htmlFor="zipcode">Zipcode:</label>
                                <br />
                                <input
                                    required
                                    type="text"
                                    id="zipcode"
                                    name="zipcode"
                                    value={apartment.location.zipcode}
                                    onChange={(e) => handleNestedChange(e, 'location')}
                                    className="input-field"
                                />
                                <label htmlFor="country">Country:</label>
                                <br />
                                <input
                                    required
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={apartment.location.country}
                                    onChange={(e) => handleNestedChange(e, 'location')}
                                    className="input-field"
                                />
                            </div>
                            <div className='info-apartment-box'>
                                <label htmlFor="price">Price:</label>
                                <br />
                                <input
                                    required
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={apartment.price}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>

                            <div className='info-apartment-box'>
                                <label htmlFor="description">Description:</label>
                                <br />
                                <textarea
                                    style={{ width: '100%' }}
                                    id="description"
                                    name="description"
                                    value={apartment.description}
                                    onChange={handleChange}
                                    className="textarea-field"
                                />
                            </div>
                        </div>

                        <div className='info-apartment-box'>
                            <h3>Features</h3>
                            <label htmlFor="area">Area:</label>
                            <br />
                            <input
                                required
                                type="text"
                                id="area"
                                name="area"
                                value={apartment.features.area}
                                onChange={(e) => handleNestedChange(e, 'features')}
                                className="input-field"
                            />
                            <label htmlFor="bedrooms">Bedrooms:</label>
                            <br />
                            <input
                                required
                                type="number"
                                id="bedrooms"
                                name="bedrooms"
                                value={apartment.features.bedrooms}
                                onChange={(e) => handleNestedChange(e, 'features')}
                                className="input-field"
                            />
                            <label htmlFor="bathrooms">Bathrooms:</label>
                            <br />
                            <input
                                required
                                type="number"
                                id="bathrooms"
                                name="bathrooms"
                                value={apartment.features.bathrooms}
                                onChange={(e) => handleNestedChange(e, 'features')}
                                className="input-field"
                            />
                            <label htmlFor="balconies">Balconies:</label>
                            <br />
                            <input
                                required
                                type="number"
                                id="balconies"
                                name="balconies"
                                value={apartment.features.balconies}
                                onChange={(e) => handleNestedChange(e, 'features')}
                                className="input-field"
                            />
                            <label htmlFor="floor">Floor:</label>
                            <br />
                            <input
                                required
                                type="text"
                                id="floor"
                                name="floor"
                                value={apartment.features.floor}
                                onChange={(e) => handleNestedChange(e, 'features')}
                                className="input-field"
                            />
                            <label htmlFor="furnishing">Furnishing:</label>
                            <br />
                            <input
                                required
                                type="text"
                                id="furnishing"
                                name="furnishing"
                                value={apartment.features.furnishing}
                                onChange={(e) => handleNestedChange(e, 'features')}
                                className="input-field"
                            />
                            <label htmlFor="parking">Parking:</label>
                            <br />
                            <input
                                required
                                type="text"
                                id="parking"
                                name="parking"
                                value={apartment.features.parking}
                                onChange={(e) => handleNestedChange(e, 'features')}
                                className="input-field"
                            />

                            <label htmlFor="amenities">Amenities (comma separated):</label>
                            <br />
                            <input
                                required
                                type="text"
                                id="amenities"
                                name="amenities"
                                value={apartment.amenities}
                                onChange={handleChange}
                                className="input-field"
                            />

                            <label htmlFor="images">Images:</label>
                            <br />
                            <input
                                type="file"
                                id="images"
                                name="images"
                                onChange={(e) => handleFileChange(e, 'images')}
                                className="input-field"
                                multiple
                            />

                            <label htmlFor="videoTour">Video Tour:</label>
                            <br />
                            <input
                                type="file"
                                id="videoTour"
                                name="videoTour"
                                onChange={(e) => handleFileChange(e, 'videoTour')}
                                className="input-field"
                            />
                        </div>

                        <div >
                            <div className='info-apartment-box'>
                                <h3>Nearby Facilities</h3>
                                <label htmlFor="shoppingMalls">Shopping Malls (comma separated):</label>
                                <br />
                                <input
                                    required
                                    type="text"
                                    id="shoppingMalls"
                                    name="shoppingMalls"
                                    value={apartment.nearbyFacilities.shoppingMalls}
                                    onChange={(e) => handleNestedChange(e, 'nearbyFacilities')}
                                    className="input-field"
                                />
                                <label htmlFor="schools">Schools (comma separated):</label>
                                <br />
                                <input
                                    required
                                    type="text"
                                    id="schools"
                                    name="schools"
                                    value={apartment.nearbyFacilities.schools}
                                    onChange={(e) => handleNestedChange(e, 'nearbyFacilities')}
                                    className="input-field"
                                />
                                <label htmlFor="hospitals">Hospitals (comma separated):</label>
                                <br />
                                <input
                                    required
                                    type="text"
                                    id="hospitals"
                                    name="hospitals"
                                    value={apartment.nearbyFacilities.hospitals}
                                    onChange={(e) => handleNestedChange(e, 'nearbyFacilities')}
                                    className="input-field"
                                />
                                <label htmlFor="publicTransport">Public Transport (comma separated):</label>
                                <br />
                                <input
                                    required
                                    type="text"
                                    id="publicTransport"
                                    name="publicTransport"
                                    value={apartment.nearbyFacilities.publicTransport}
                                    onChange={(e) => handleNestedChange(e, 'nearbyFacilities')}
                                    className="input-field"
                                />
                            </div>

                            <div className='info-apartment-box'>
                                <label htmlFor="contactInfo">Contact Info (Employee ID):</label>
                                <br />
                                <select
                                    id="contactInfo"
                                    name="contactInfo"
                                    value={apartment.contactInfo}
                                    onChange={handleChange}
                                    className="input-field"
                                >
                                    {employees && employees.length > 0 ? (
                                        employees.map((employee, index) => (
                                            <option key={index} value={employee._id}>{employee.name} ({employee._id})</option>
                                        ))
                                    ) : (
                                        <option>Loading employee ...</option>
                                    )}
                                    {/* Add more options as needed */}
                                </select>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <button
                                    style={{ border: 'none', width: '80%', minWidth: '100px', padding: '5px', color: 'white', backgroundColor: 'var(--main-color)', borderRadius: '5px' }}
                                    type="submit"
                                    className="submit-button"
                                >
                                    Confirm Edit Apartment
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </>
    );
};

export default EditApartmentForm;
