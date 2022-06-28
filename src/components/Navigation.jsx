import {Navbar, Nav, Container} from 'react-bootstrap';
import {NavLink} from 'react-router-dom'; 
/* import useAuth from '../auth/useAuth'; */
 
const Navigation = () => {

    /* const {logout} = useAuth(); */
    return (
    
        <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
            <Container>
                
                <Navbar.Brand as={NavLink} to="/">PAÑUELOS AL AIRE</Navbar.Brand>
               
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
               
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='me-auto'>
                        <Nav.Link as={NavLink} to="/">Dashboard</Nav.Link>
                        <Nav.Link as={NavLink} to="/alumnos">Alumnos</Nav.Link>
                        <Nav.Link as={NavLink} to="/registro">Registro</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                        <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                        <Nav.Link as={NavLink} to="/cuenta">Account</Nav.Link>
                        {/* <Nav.Link to="/login" onClick={logout}>Logout</Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation