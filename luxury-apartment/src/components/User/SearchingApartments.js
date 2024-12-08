import { useState } from 'react';
import axios from 'axios';
import ListApartments from '../../components/User/ListApartments';
const Searching = () => {
    const [keyword, setKeyword] = useState("");
    const [apartments, setApartments] = useState();
    const [status, setStatus] = useState(false);
    const FindApartment = async (e) => {
        e.preventDefault();
        setStatus(true);
        try {
            const response = await axios.get(`http://localhost:5000/search/?keyword=${keyword}`);
            if (response.data) {
                setApartments(response.data);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="searching" style={{ margin: '20px 0px' }}>
                <div className="searching__container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="searching__input" style={{ width: '100%', position: 'relative' }}>
                        <form method='get' onSubmit={FindApartment}>
                            <input value={keyword}
                                onChange={(e) => {
                                    setKeyword(e.target.value);
                                    setStatus(false)
                                }}
                                style={{ width: '100%' }} type="text" placeholder="Find the apartment you want..." />
                            <button style={{ position: 'absolute', right: '0', bottom: '0px', border: 'none', fontSize: '24px', color: 'white', backgroundColor: 'var(--main-color)', padding: '2px 30px', borderRadius: '0 5px 5px 0', cursor: 'pointer' }} type="submit">

                                <i style={{ color: 'white' }} className="fa-solid fa-magnifying-glass"></i>

                            </button>

                        </form>
                    </div>
                </div>
            </div>
            {status && (apartments && apartments.length > 0 ? (
                <div>
                    <h3>Kết quả tìm được cho từ khóa '{keyword}'</h3>
                    <div style={{ display: 'grid', gap:'10px',gridTemplateColumns: 'repeat(auto-fit,minmax(300px, 1fr))' }}>
                        {apartments.map(apartment => (
                            <ListApartments key={apartment._id} apartment={apartment} />
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h3>Không tìm thấy kết quả nào cho từ khóa '{keyword}'</h3>
                </div>
            ))}

        </>
    )
}
export default Searching; 