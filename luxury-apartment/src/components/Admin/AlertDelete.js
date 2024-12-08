import axios from 'axios';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
const AlertDelete = ({ idApartment, onClose }) => {
    // const navigate = useNavigate();
    const [result, setResult] = useState(false);
    async function ConfirmDelete() {
        try {
            const response = await axios.delete(`http://localhost:5000/apartment/${idApartment}`)
            if (response.data.result === 'ok') {
                setResult(true);
            } else {
                setResult(false);
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (result) {
            setTimeout(
                () => {
                    onClose();
                    window.location.reload();
                },1000
            )
            
        }
    }, [result,onClose]);

    return (
        <>
            <div className="alert-container" style={{ zIndex: '9', position: 'fixed', top: '0', right: '0', bottom: '0', left: '0', display: 'flex', justifyContent: 'center', alignItems: "flex-start", paddingTop: '150px', backgroundColor: 'rgba(24,31,42,0.6)' }}>
                <div style={{ backgroundColor: 'white', padding: '10px', width: '500px', borderRadius: '20px', boxShadow: '0 0 10px white', position: 'relative', overFlow: 'hidden' }}>
                    <h2 style={{ borderBottom: 'solid 1px gray', paddingBottom: '5px' }}>Confirm delete ?</h2>
                    <p>Data after backup cannot be restored !</p>
                    <p style={{ textAlign: 'right' }}>
                        <button onClick={ConfirmDelete} style={{ border: 'none', margin: '0 10px', cursor: 'pointer', padding: '5px 30px', fontSize: 'large', backgroundColor: 'red', color: 'white', borderRadius: '10px ' }}>Confirm</button>
                        <button onClick={onClose} style={{ border: 'none', cursor: 'pointer', padding: '5px 30px', fontSize: 'large', backgroundColor: 'green', color: 'white', borderRadius: '10px ' }}>Cancel</button>
                    </p>
                    {result && (
                        <div style={{ position: 'absolute', opacity: '1', transition: 'opacity 1s ease-in-out', top: '0px', backgroundColor: 'green', left: '0', right: '0', textAlign: 'center', borderRadius: '20px 20px 0 0' }}>
                            <span style={{ color: 'white', padding: '5px' }}>Deleted apartment successfully !</span>
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}
export default AlertDelete;