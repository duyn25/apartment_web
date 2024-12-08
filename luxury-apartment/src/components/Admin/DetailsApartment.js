import { useState } from 'react';
import EditApartmentForm from './EditApartmentForm';
const Detailapartment = ({ apartmentDetails }) => {
    const [edit, setEdit] = useState(false);
    async function ShowEditForm() {
        setEdit(true);
    }
    async function HideEditForm() {
        setEdit(false);
    }
    return (
        <>
            <div className="apartment-details">
                <h1>{apartmentDetails.name}</h1>
                <div style={{display:'grid', gap:'10px',gridTemplateColumns:'repeat(auto-fit, minmax(300px , 1fr )  '}}>
                    {apartmentDetails.images.map((image,index) =>
                        <img style={{width:'100%', maxWidth:'500px'}} key={index} src={image} alt={apartmentDetails.name} />
                    )}
                </div>
                <p>{apartmentDetails.description}</p>
                <div className="apartment-location">
                    <h3>Location:</h3>
                    <p>{apartmentDetails.location.address}, {apartmentDetails.location.city}, {apartmentDetails.location.state} {apartmentDetails.location.zipcode}, {apartmentDetails.location.country}</p>
                </div>
                <div className="apartment-price">
                    <h3>Price:</h3>
                    <p>${apartmentDetails.price}</p>
                </div>
                <div className="apartment-features">
                    <h3>Features:</h3>
                    <ul>
                        <li>Area: {apartmentDetails.features.area}</li>
                        <li>Bedrooms: {apartmentDetails.features.bedrooms}</li>
                        <li>Bathrooms: {apartmentDetails.features.bathrooms}</li>
                        <li>Balconies: {apartmentDetails.features.balconies}</li>
                        <li>Floor: {apartmentDetails.features.floor}</li>
                        <li>Furnishing: {apartmentDetails.features.furnishing}</li>
                        <li>Parking: {apartmentDetails.features.parking}</li>
                    </ul>
                </div>
                <div className="apartment-amenities">
                    <h3>Amenities:</h3>
                    <ul>
                        {apartmentDetails.amenities.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                        ))}
                    </ul>
                </div>
                <div className="apartment-contact">
                    <h3>Contact Info:</h3>
                    <p>{apartmentDetails.contactInfo.name}</p>
                    <p>{apartmentDetails.contactInfo.email}</p>
                </div>
                <div className="apartment-nearby-facilities">
                    <h3>Nearby Facilities:</h3>
                    <div>
                        <h4>Shopping Malls:</h4>
                        <ul>
                            {apartmentDetails.nearbyFacilities.shoppingMalls.map((mall, index) => (
                                <li key={index}>{mall}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Schools:</h4>
                        <ul>
                            {apartmentDetails.nearbyFacilities.schools.map((school, index) => (
                                <li key={index}>{school}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Hospitals:</h4>
                        <ul>
                            {apartmentDetails.nearbyFacilities.hospitals.map((hospital, index) => (
                                <li key={index}>{hospital}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Public Transport:</h4>
                        <ul>
                            {apartmentDetails.nearbyFacilities.publicTransport.map((transport, index) => (
                                <li key={index}>{transport}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                {apartmentDetails.videoTour && (
                    <div className="apartment-video-tour">
                        <h3>Video Tour:</h3>
                        <iframe
                            src={apartmentDetails.videoTour}
                            title="Video Tour"
                            width="100%"
                            height="500px"
                            style={{ border: '0', borderRadius: '10px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.15)' }}
                            allowFullScreen
                        ></iframe>

                    </div>
                )}
                <div style={{ textAlign: 'center', margin: '20px 0px' }}>
                    <button onClick={ShowEditForm} style={{ border: 'none', padding: '5px 30px', fontSize: 'large', backgroundColor: 'green', color: 'white', borderRadius: '10pxx ' }}>Edit Apartment</button>
                </div>
            </div>
            {edit && (<EditApartmentForm onClose={HideEditForm} apartmentDetails={apartmentDetails} />)}
        </>
    )
}
export default Detailapartment;