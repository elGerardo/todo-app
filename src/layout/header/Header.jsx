import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import buttons from "../../assets/global/buttons.module.css";

let Header = () => {
    
    let content = (
        <header className={`bg-white w-100 shadow`}>
            <Container className={`d-flex justify-content-between py-3`}>
                <Link to="/" className={`d-inline`}>Login</Link>
                <div>
                    <Link to="login" className={`${buttons.secondary} ${buttons.header_style} d-inline`}>Login</Link>
                    <Link to="signin" className={`${buttons.primary} ${buttons.header_style} d-inline mx-5`}>Create Account</Link>
                </div>
            </Container>
        </header>
    );

    return content;
}

export default Header;