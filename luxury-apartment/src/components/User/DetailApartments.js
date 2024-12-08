const Detailapartment = ({ apartmentDetails }) => {
    if (!apartmentDetails) {
        return <div>Loading...</div>;
    }

    const { 
        name, 
        images, 
        description, 
        location, 
        price, 
        features, 
        amenities, 
        contactInfo, 
        nearbyFacilities, 
        videoTour 
    } = apartmentDetails;

    return (
        <div className="apartment-details">
            <h1>{name || 'No Name'}</h1>
            <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {images && images.length > 0 ? (
                    images.map((image, index) => (
                        <img style={{ width: '100%' }} src={image} key={index} alt={name || 'Apartment'} />
                    ))
                ) : (
                    <p>No images available</p>
                )}
            </div>
            <p>{description || 'No description available'}</p>
            <div className="apartment-location">
                <h3>Location:</h3>
                <p>{location?.address || 'No address'}, {location?.city || 'No city'}, {location?.state || 'No state'} {location?.zipcode || 'No zipcode'}, {location?.country || 'No country'}</p>
            </div>
            <div className="apartment-price">
                <h3>Price:</h3>
                <p>${price || 'No price available'}</p>
            </div>
            <div className="apartment-features">
                <h3>Features:</h3>
                <ul>
                    <li>Area: {features?.area || 'No area available'}</li>
                    <li>Bedrooms: {features?.bedrooms || 'No bedrooms available'}</li>
                    <li>Bathrooms: {features?.bathrooms || 'No bathrooms available'}</li>
                    <li>Balconies: {features?.balconies || 'No balconies available'}</li>
                    <li>Floor: {features?.floor || 'No floor information'}</li>
                    <li>Furnishing: {features?.furnishing || 'No furnishing information'}</li>
                    <li>Parking: {features?.parking || 'No parking information'}</li>
                </ul>
            </div>
            <div className="apartment-amenities">
                <h3>Amenities:</h3>
                <ul>
                    {amenities && amenities.length > 0 ? (
                        amenities.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                        ))
                    ) : (
                        <li>No amenities available</li>
                    )}
                </ul>
            </div>
            <div className="apartment-contact">
                <h3>Contact Info:</h3>
                <p>{contactInfo?.name || 'No contact name'}</p>
                <p>{contactInfo?.email || 'No contact email'}</p>
            </div>
            <div className="apartment-nearby-facilities">
                <h3>Nearby Facilities:</h3>
                <div>
                    <h4>Shopping Malls:</h4>
                    <ul>
                        {nearbyFacilities?.shoppingMalls?.length > 0 ? (
                            nearbyFacilities.shoppingMalls.map((mall, index) => (
                                <li key={index}>{mall}</li>
                            ))
                        ) : (
                            <li>No shopping malls available</li>
                        )}
                    </ul>
                </div>
                <div>
                    <h4>Schools:</h4>
                    <ul>
                        {nearbyFacilities?.schools?.length > 0 ? (
                            nearbyFacilities.schools.map((school, index) => (
                                <li key={index}>{school}</li>
                            ))
                        ) : (
                            <li>No schools available</li>
                        )}
                    </ul>
                </div>
                <div>
                    <h4>Hospitals:</h4>
                    <ul>
                        {nearbyFacilities?.hospitals?.length > 0 ? (
                            nearbyFacilities.hospitals.map((hospital, index) => (
                                <li key={index}>{hospital}</li>
                            ))
                        ) : (
                            <li>No hospitals available</li>
                        )}
                    </ul>
                </div>
                <div>
                    <h4>Public Transport:</h4>
                    <ul>
                        {nearbyFacilities?.publicTransport?.length > 0 ? (
                            nearbyFacilities.publicTransport.map((transport, index) => (
                                <li key={index}>{transport}</li>
                            ))
                        ) : (
                            <li>No public transport available</li>
                        )}
                    </ul>
                </div>
            </div>
            {videoTour ? (
                <div className="apartment-video-tour">
                    <h3>Video Tour:</h3>
                    <iframe
                        src={videoTour}
                        title="Video Tour"
                        width="100%"
                        height="500px"
                        style={{ border: '0', borderRadius: '10px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.15)' }}
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (
                <div>No video tour available</div>
            )}
        </div>
    );
}

export default Detailapartment;
