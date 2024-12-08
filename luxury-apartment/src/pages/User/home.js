import { useEffect, useState } from 'react';
import ListApartments from '../../components/User/ListApartments';
import Contact from '../../components/User/Contact';
import Searching from '../../components/User/SearchingApartments';
import ReactPaginate from 'react-paginate';
const Home = () => {
    const [apartments, setApartments] = useState([]);

    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const response = await fetch('http://localhost:5000');
                const json = await response.json();
                if (response.ok) {
                    setApartments(json);
                }
            } catch (error) {
                console.log('Error fetching apartments:', error);
            }
        };

        fetchApartments();

    }, []);

    const [currentPage , setCurrentPage] = useState(0);
    const apartmentsPerPage= 3;
    const offset= currentPage * apartmentsPerPage;
    const currentApartments  = apartments.slice(offset, offset+apartmentsPerPage);
    const pageNumbers= Math.ceil(apartments.length / apartmentsPerPage);
    const handlePageClick= ({selected})=>{
        setCurrentPage(selected);
    }
    return (
        <>
            <div className="main-banner">
                <div className="owl-carousel owl-banner">
                    <div className="item item-1">
                        <div className="header-text">
                            <span className="category">Toronto, <em>Canada</em></span>
                            <h2>Hurry!<br />Get the Best Villa for you</h2>
                        </div>
                    </div>
                    <div className="item item-2">
                        <div className="header-text">
                            <span className="category">Melbourne, <em>Australia</em></span>
                            <h2>Be Quick!<br />Get the best villa in town</h2>
                        </div>
                    </div>
                    <div className="item item-3">
                        <div className="header-text">
                            <span className="category">Miami, <em>South Florida</em></span>
                            <h2>Act Now!<br />Get the highest level penthouse</h2>
                        </div>
                    </div>

                </div>

            </div>
            <div className='section' style={{padding:'0 80px'}}>
                <div className='section-container'>
                    <p>| Properties</p>

                    <h2>We Provide The Best <br />Property You Like</h2>
                </div>
                {<Searching/>}                
                <div>
                    <h3>Gợi ý cho bạn</h3>
                </div>
                <div className='section-products' style={{marginBottom:'20px'}}>
                    
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
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
                />
            </div>
            <Contact />

        </>
    );
};

export default Home;
