import { Link } from "react-router-dom";
import '../../css/Access.css';  // Đảm bảo import file CSS nếu chưa

const Access = () => {
    return (
        <div className="access-container">
            <Link to='login'>
                <span>Login</span>
            </Link>
            <span className="divider">|</span>
            <Link to='register'>
                <span>Sign up</span>
            </Link>
        </div>
    )
}

export default Access;
