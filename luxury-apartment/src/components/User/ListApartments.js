// src/components/ApartmentDetails.js
import {Link} from 'react-router-dom';
import '../../css/ListApartments.css';
import {useState} from 'react';
const ListApartments = ({ apartment }) => {
  const [imageSrc ,setImageSrc]= useState(apartment.images[0]);
  const fallbackSrc='images/image-not-found.jpg';
  const handleError=()=>{
    setImageSrc(fallbackSrc);
  }
  return (
    <div className="apartment-details" style={{height:'900px'}}>
      {/* {apartment.images.map((image, index) => (
        <image key={index} src={image} alt="Product View"/>
      ))} */}
      <img  style={{height:'200px'}} className="apartment-image"src={imageSrc} alt="Product View" onError ={handleError} loading='lazy' />
      <h2 className="apartment-name">{apartment.name}</h2>
      <p className="apartment-description">{apartment.description}</p>

      <h3 className="apartment-location-title">Location</h3>
      <p className="apartment-address">{apartment.location.address}</p>
      <p className="apartment-city">{apartment.location.city}, {apartment.location.state} {apartment.location.zipcode}</p>
      <p className="apartment-country">{apartment.location.country}</p>

      <h3 className="apartment-price-title">Price</h3>
      <p className="apartment-price">${apartment.price}</p>

      <h3 className="apartment-features-title">Features</h3>
      <ul className="apartment-features">
        <li className="apartment-feature">Area: {apartment.features.area}</li>
        <li className="apartment-feature">Bedrooms: {apartment.features.bedrooms}</li>
        <li className="apartment-feature">Bathrooms: {apartment.features.bathrooms}</li>
        <li className="apartment-feature">Balconies: {apartment.features.balconies}</li>
        <li className="apartment-feature">Floor: {apartment.features.floor}</li>
        <li className="apartment-feature">Furnishing: {apartment.features.furnishing}</li>
        <li className="apartment-feature">Parking: {apartment.features.parking}</li>
      </ul>
      <div className="visit-apartment" style={{position:'absolute',bottom:'20px',left:'0',right:'0'}}>
        <Link to={`../detail-apartments/${apartment._id}`}>  
              <button className="visit-button" >Visit Apartment</button>
        </Link>
      </div>
    </div>
    
  );
};

export default ListApartments;
