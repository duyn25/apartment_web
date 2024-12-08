// src/components/ApartmentDetails.js
// import {Link} from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../css/ListApartments.css';
import {  useState } from 'react';
import AlertDelete from '../../components/Admin/AlertDelete';
const ListApartments = ({ apartment }) => {
  //console.log(idApartment);
  const [alert, setAlert] = useState(false);
  const [imageSrc ,setImageSrc]= useState(apartment.images[0]);
  const fallbackSrc='../../images/image-not-found.jpg';
  const handleError=()=>{
    setImageSrc(fallbackSrc);
  }
  async function DeleteApartment() {
    try {
      setAlert(true);
    } catch (err) {
      console.log(err);
    }
  }
  async function CloseAlert() {
    setAlert(false);
  }
  return (
    <>
      <div className="apartment-details" style={{height:'700px',maxWidth:'500px'}}>
        {/* {apartment.images.map((image, index) => (
        <image key={index} src={image} alt="Product View"/>
      ))} */}
        <img style={{height:'250px'}}className="apartment-image" src={imageSrc} alt="Product View" onError={handleError} loading='lazy' />
        <h2 className="apartment-name">{apartment.name}</h2>
        <p className="apartment-description">{apartment.description}</p>

        <h3 className="apartment-location-title">Location</h3>
        <p className="apartment-address">{apartment.location.address}</p>
        <p className="apartment-city">{apartment.location.city}, {apartment.location.state} {apartment.location.zipcode}</p>
        <p className="apartment-country">{apartment.location.country}</p>

        <h3 className="apartment-price-title">Price</h3>
        <p className="apartment-price">${apartment.price}</p>
        <p style={{ borderTop: 'solid 1px gray', paddingTop: '20px', textAlign: 'center', margin: '20px 0px', display: 'flex', justifyContent: 'space-around', justifyItems: 'center', position:'absolute', bottom:'20px',left:'0',right:'0' }}>
          <Link to={`${apartment._id}`} style={{ textDecoration: 'none',padding:'5px 10px', backgroundColor: 'green', fontSize: 'medium', color: 'white', borderRadius: '10px' }}>View Details</Link>
          <button onClick={DeleteApartment} style={{ border: 'none', fontSize: 'medium', backgroundColor: 'red', color: 'white', borderRadius: '10px ' }}>Delete Apartmemt</button>

        </p>
      </div>
      {alert && (<AlertDelete onClose={CloseAlert} idApartment={apartment._id}/>)}
     
    </>
  )
};

export default ListApartments;
