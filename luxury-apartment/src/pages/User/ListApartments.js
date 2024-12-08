import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../css/property.css';
import ListApartments from '../../components/User/ListApartments';
import ReactPaginate from 'react-paginate';
const ListsApartment = () => {
  const [apartments, setApartments] = useState([]);
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch('http://localhost:5000');
        const json = await response.json();
        //console.log(json);
        if (response.ok) {
          setApartments(json);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchApartments();
  }, []);
  const [currentPage, setCurrentPage]= useState(0);
  const [apartmentsPerPage] = useState(4);
  const offset = currentPage * apartmentsPerPage;
  const currentApartments = apartments.slice(offset,offset + apartmentsPerPage);
  const pageNumbers= Math.ceil(apartments.length / apartmentsPerPage);
  const handlePageClick = ({selected}) => {
    setCurrentPage(selected);
    };
  return (
    <>
      <div className="page-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span style={{ fontSize: "20px", color: "black", backgroundColor: "#fff", padding: "10px" }}><Link to="http://localhost:3000">Home</Link> / Properties</span>
              <h3 style={{ fontSize: "50px", color: "#fff", margin: "0px", paddingTop: "20px" }}>Properties</h3>
            </div>
          </div>
        </div>
      </div>
      <div className='section-products' style={{padding:'10px 50px'}}>
        {apartments.length > 0 ? (
          currentApartments.map(apartment => (
            <ListApartments key={apartment._id} apartment={apartment} />

          ))
        ) : (
          <p>Loading apartments...</p>
        )}
      </div>
      <ReactPaginate 
      previousLabel={<i className="fa-solid fa-angle-left"></i>}
      nextLabel={<i className="fa-solid fa-angle-right"></i>}
      breakLabel={"..."}
      pageCount={pageNumbers}
      onPageChange={handlePageClick}
      containerClassName='pagination'
      activeClassName='active'
      />
    </>
  );
};

export default ListsApartment;