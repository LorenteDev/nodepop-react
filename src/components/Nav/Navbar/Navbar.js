import "./Navbar.css";
import { NavLink } from "react-router-dom";
import storage from "../../../utils/storage";
import Button from "react-bootstrap/Button";
import BootstrapNavbar from "react-bootstrap/Navbar";

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
    <BootstrapNavbar className="d-flex justify-content-between">
      <div>
        <NavLink className="mr-3" to="/">
          Inicio
        </NavLink>
        <NavLink to="/advert/new">Nuevo anuncio</NavLink>
      </div>
      <Button onClick={logout}>Logout</Button>
    </BootstrapNavbar>
  );
};

export default Navbar;
