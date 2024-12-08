import ListApartments from '../../components/Admin/ListApartments';
import AddForm from '../../components/Admin/AddApartmentForm';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
const AdminProduct = () => {
    const [apartments, setApartments] = useState([]);
    const [addForm, setAddForm] = useState(false);
    useEffect(() => {
        const getApartments = async () => {

            try {
                const response = await axios.get("http://localhost:5000");
                setApartments(response.data);
                //console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        getApartments();
    }, []);
    async function ShowAddForm() {
        setAddForm(true);
    }
    async function HideAddForm() {
        setAddForm(false);
    }
    const [currentPage, setCurrentPage] = useState(0);
    const apartmentPerPage = 3;
    const offset = currentPage * apartmentPerPage;
    const currentApartments = apartments.slice(offset, offset + apartmentPerPage);
    const pageCount = Math.ceil(apartments.length / apartmentPerPage);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    }

    return (
        <>
            {addForm && (<AddForm onClose={HideAddForm} />)}
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <span style={{ float: 'left', fontSize: 'larger' }}>Danh sách căn hộ hiện tại ({apartments.length})</span>
                <button onClick={ShowAddForm} style={{ fontSize: 'medium', border: 'none', color: 'var(--main-color' }}>+ Add apartment</button>
                <div style={{ clear: 'float' }}></div>
            </div>
            <div style={{ width: '100%', display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr)' }}>
                {apartments.length > 0 ? (
                    currentApartments.map((apartment) => (
                        <ListApartments key={apartment._id} apartment={apartment} />
                    ))
                ) : (
                    <p>Loadding apartments ...</p>
                )}

            </div>

            <ReactPaginate
                previousLabel={<i className="fa-solid fa-angle-left"></i>}
                nextLabel={<i className="fa-solid fa-angle-right"></i>}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />


        </>
    )
}
export default AdminProduct;