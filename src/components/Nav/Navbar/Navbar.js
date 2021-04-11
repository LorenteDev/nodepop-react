import "./Navbar.css";
import { NavLink } from "react-router-dom";
import storage from "../../../utils/storage";
import Button from "react-bootstrap/Button";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Icon from "../../../assets/nodepop-icon.png";

const Navbar = () => {
  const logout = () => {
    let check = window.confirm("¿Cerrar sesión?");
    if (check) {
      storage.remove("Authorization");
      storage.sessionRemove("Authorization");
      window.location.reload();
    }
  };

  return (
    <BootstrapNavbar className="d-flex justify-content-between mb-3 navbar">
      <div>
        <NavLink className="mr-3 navlink" to="/">
          <img className="nav-logo" src={Icon} alt="logo" />
        </NavLink>
        <NavLink to="/" className="mr-3 navlink">
          Inicio
        </NavLink>
        <NavLink to="/advert/new" className="navlink">
          Nuevo anuncio
        </NavLink>
      </div>
      <Button onClick={logout} variant="danger" className="logout-button">
        Logout
      </Button>
    </BootstrapNavbar>
  );
};

export default Navbar;
