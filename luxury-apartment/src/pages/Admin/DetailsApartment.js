import { useState, useEffect } from 'react';
import DetailApartments from '../../components/Admin/DetailsApartment';
import { useParams } from 'react-router-dom';

const DetailApartment = () => {
  const { id } = useParams();
  const [apartmentDetails, setApartmentDetails] = useState(null); // Khởi tạo với null

  useEffect(() => {
    const fetchDetailApartments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/apartment/${id}`);
        if (response.ok) {
          const data = await response.json();
          //console.log(data); // Đảm bảo có dữ liệu
          setApartmentDetails(data);
        } else {
          console.error('Server response was not ok');
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchDetailApartments();
  }, [id]);

  return (
    <>
      {apartmentDetails ? (
        <DetailApartments key={apartmentDetails._id} apartmentDetails={apartmentDetails} />

      ) : (
        <div>Loading...</div>
      )}
      
    </>
  );
};

export default DetailApartment;
