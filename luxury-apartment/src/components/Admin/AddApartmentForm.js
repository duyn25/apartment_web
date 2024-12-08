import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/AddApartmentForm.css'; // Import file CSS

const AddApartmentForm = ({ onClose, onSubmit }) => {
    const [employees, setEmployee] = useState();
    const [result, setResult] = useState(false);
    const [apartment, setApartment] = useState({
        name: '',
        location: {
            address: '',
            city: '',
            state: '',
            zipcode: '',
            country: '',
        },
        price: '',
        description: '',
        features: {
            area: '',
            bedrooms: '',
            bathrooms: '',
            balconies: '',
            floor: '',
            furnishing: '',
            parking: '',
        },
        amenities: '',
        images: null,
        videoTour: null,
        nearbyFacilities: {
            shoppingMalls: '',
            schools: '',
            hospitals: '',
            publicTransport: '',
        },
        contactInfo: '', // ID of the Employee
    });
    useEffect(() => {
        const getEmployee = async () => {
            try {
                const response = await axios.get('http://localhost:5000/contact');
                setEmployee(response.data);
                console.log(response.data);
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
    useEffect(() => {
        if (employees && employees.length > 0) {
            setApartment((prevApartment) => ({
                ...prevApartment,
                contactInfo: employees[0]._id,
            }));
        }
    }, [employees]);
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
        setApartment((prevApartment) => ({
            ...prevApartment,
            [fileKey]: files, // Lưu mảng các file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (let key in apartment) {
            if (key === 'images') {
                if (apartment[key]) {
                    apartment[key].forEach((file, index) => {
                        formData.append('images', file); // Phải trùng tên với cấu hình Multer
                    });
                }
            } else if (key === 'videoTour') {
                if (apartment[key]) {
                    formData.append('videoTour', apartment[key][0]); // Chỉ một file video
                }
            } else
                if (typeof apartment[key] === 'object' && apartment[key] !== null) {
                    for (let nestedKey in apartment[key]) {
                        formData.append(`${key}.${nestedKey}`, apartment[key][nestedKey]);
                    }
                } else {
                    formData.append(key, apartment[key]);
                }
        }
        // formData.forEach((value,key)=>{
        //     console.log(key,value);
        // })
        try {
            const response = await axios.post('http://localhost:5000/add-apartment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                alert('Apartment inserted successfully');
                setResult(true);
                onSubmit();
            } else {
                alert('Failed to insert apartment');
                throw new Error('Failed to edit apartment');
            }
        } catch (err) {
            console.error('Error inserting apartment:', err.response?.data || err.message || err);
            alert('Failed to insert apartment');
        }
    };

    return (
        <>
            <div className='add-apartment-container'>
                <form onSubmit={handleSubmit} className="insert-apartment-form" encType="multipart/form-data">
                    <div>
                        <i onClick={onClose} className="fa-regular fa-circle-xmark"></i>
                        <h2 style={{ textAlign: 'center' }}>Add Apartment</h2>
                    </div>

                    <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr)' }}>
                        <div>
                            <div className='info-apartment-box'>
                                <label htmlFor='name'>Name:</label>
                                <br />

                                <input
                                    type="text"
                                    name="name"
                                    id='name'
                                    value={apartment.name}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>

                            <div className='info-apartment-box'>
                                <h3>Location</h3>
                                <label htmlFor='address'>Address:</label>
                                <br />
                                <input
                                    type="text"
                                    name="address"
                                    id='address'
                                    value={apartment.location.address}
                                    onChange={(e) => handleNestedChange(e, 'location')}
                                    className="input-field"
                                />
                                <label htmlFor='city'>City:</label>
                                <br />
                                <input
                                    type="text"
                                    name="city"
                                    id='city'
                                    value={apartment.location.city}
                                    onChange={(e) => handleNestedChange(e, 'location')}
                                    className="input-field"
                                />
                                <label htmlFor='state'>State:</label>
                                <br />
                                <input
                                    type="text"
                                    name="state"
                                    id='state'
                                    value={apartment.location.state}
                                    onChange={(e) => handleNestedChange(e, 'location')}
                                    className="input-field"
                                />
                                <label htmlFor='zipcode'>Zipcode:</label>
                                <br />
                                <input
                                    type="text"
                                    name="zipcode"
                                    id='zipcode'
                                    value={apartment.location.zipcode}
                                    onChange={(e) => handleNestedChange(e, 'location')}
                                    className="input-field"
                                />
                                <label htmlFor='country'>Country:</label>
                                <br />
                                <input
                                    type="text"
                                    name="country"
                                    id='country'
                                    value={apartment.location.country}
                                    onChange={(e) => handleNestedChange(e, 'location')}
                                    className="input-field"
                                />

                            </div>
                            <div className='info-apartment-box'>
                                <label htmlFor='price'>Price:</label>
                                <br />
                                <input
                                    type="number"
                                    name="price"
                                    id='price'
                                    value={apartment.price}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>

                            <div className='info-apartment-box'>
                                <label htmlFor='description'>Description:</label>
                                <br />
                                <textarea style={{ width: '100%' }}
                                    name="description"
                                    id='description'
                                    value={apartment.description}
                                    onChange={handleChange}
                                    className="textarea-field"
                                />
                            </div>
                        </div>

                        <div className='info-apartment-box'>
                            <h3>Features</h3>
                            <label htmlFor='area'>Area:</label>
                            <br />
                            <input
                                type="text"
                                name="area"
                                id='area'
                                value={apartment.features.area}
                                onChange={(e) => handleNestedChange(e, 'features')}
                                className="input-field"
                            />
                            <label htmlFor='bedrooms'>Bedrooms:</label>
                            <br />
                            <input
                                type="number"
                                name="bedrooms"
                                id='bedrooms'
                                value={apartment.features.bedrooms}
                                onChange={(e) => handleNestedChange(e, 'features')}
                                className="input-field"
                            />
                            <label htmlFor='bathrooms'>Bathrooms:</label>
                            <br />
                            <input
                                type="number"
                                name="bathrooms"
                                id='bathrooms'
                                value={apartment.features.bathrooms}
                                onChange={(e) => handleNestedChange(e, 'features')}
                                className="input-field"
                            />
                            <label htmlFor='balconies'>Balconies:</label>
                            <br />
                            <input
                                type="number"
                                name="balconies"
                                id='balconies'
                                value={apartment.features.balconies}
                                onChange={(e) => handleNestedChange(e, 'features')}
                                className="input-field"
                            />
                            <label htmlFor='floor'>Floor:</label>
                            <br />
                            <input
                                type="text"
                                name="floor"
                                id='floor'
                                value={apartment.features.floor}
                                onChange={(e) => handleNestedChange(e, 'features')}
                                className="input-field"
                            />
                            <label htmlFor='furnishing'>Furnishing:</label>
                            <br />
                            <input
                                type="text"
                                name="furnishing"
                                id='furnishing'
                                value={apartment.features.furnishing}
                                onChange={(e) => handleNestedChange(e, 'features')}
                                className="input-field"
                            />
                            <label htmlFor='parking'>Parking:</label>
                            <br />
                            <input
                                type="text"
                                name="parking"
                                id='parking'
                                value={apartment.features.parking}
                                onChange={(e) => handleNestedChange(e, 'features')}
                                className="input-field"
                            />

                            <label htmlFor='amenities'>Amenities (comma separated):</label>
                            <br />
                            <input
                                type="text"
                                name="amenities"
                                id='amenities'
                                value={apartment.amenities}
                                onChange={handleChange}
                                className="input-field"
                            />

                            <label htmlFor='images'>Images:</label>
                            <br />
                            <input
                                type="file"
                                name="images"
                                id='images'
                                onChange={(e) => handleFileChange(e, 'images')}
                                className="input-field"
                                multiple
                            />

                            <label htmlFor='videoTour'>Video Tour:</label>
                            <br />
                            <input
                                type="file"
                                name="videoTour"
                                id='videoTour'
                                onChange={(e) => handleFileChange(e, 'videoTour')}
                                className="input-field"
                            />
                        </div>

                        <div >
                            <div className='info-apartment-box'>
                                <h3>Nearby Facilities</h3>
                                <label htmlFor='shoppingMalls'>Shopping Malls (comma separated):</label>
                                <br />
                                <input
                                    type="text"
                                    name="shoppingMalls"
                                    id='shoppingMalls'
                                    value={apartment.nearbyFacilities.shoppingMalls}
                                    onChange={(e) => handleNestedChange(e, 'nearbyFacilities')}
                                    className="input-field"
                                />
                                <label htmlFor='schools'>Schools (comma separated):</label>
                                <br />
                                <input
                                    type="text"
                                    name="schools"
                                    id='schools'
                                    value={apartment.nearbyFacilities.schools}
                                    onChange={(e) => handleNestedChange(e, 'nearbyFacilities')}
                                    className="input-field"
                                />
                                <label htmlFor='hospitals'>Hospitals (comma separated):</label>
                                <br />
                                <input
                                    type="text"
                                    name="hospitals"
                                    id='hospitals'
                                    value={apartment.nearbyFacilities.hospitals}
                                    onChange={(e) => handleNestedChange(e, 'nearbyFacilities')}
                                    className="input-field"
                                />
                                <label htmlFor='publicTransport'>Public Transport (comma separated):</label>
                                <br />
                                <input
                                    type="text"
                                    name="publicTransport"
                                    id='publicTransport'
                                    value={apartment.nearbyFacilities.publicTransport}
                                    onChange={(e) => handleNestedChange(e, 'nearbyFacilities')}
                                    className="input-field"
                                />
                            </div>

                            <div className='info-apartment-box'>
                                <label htmlFor='contactInfo'>Contact Info (Employee ID):</label>
                                <br />
                                <select
                                    name="contactInfo"
                                    id='contactInfo'
                                    value={apartment.contactInfo}
                                    onChange={handleChange}
                                    className="input-field"

                                >
                                    {employees && employees.length > 0 ? (
                                        employees.map((employee, index) => (
                                            <option key={index} value={employee._id}>{employee.name}( {employee._id} )</option>
                                        ))
                                    ) : (
                                        <option>Loadding employee ...</option>
                                    )}
                                    {/* Add more options as needed */}
                                </select>

                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <button style={{ border: 'none', width: '80%', minWidth: '100px', padding: '5px', color: 'white', backgroundColor: 'var(--main-color)', borderRadius: '5px' }} type="submit" className="submit-button">Insert Apartment</button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>

        </>
    );
};

export default AddApartmentForm;
