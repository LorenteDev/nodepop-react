import "./Advert.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/button";
import Modal from "react-bootstrap/modal";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import placeholderImage from "../../../assets/placeholder.jpg";
import storage from "../../../utils/storage";

const Advert = (props) => {
  let token;
  if (storage.get("Authorization")) {
    token = storage.get("Authorization");
  } else {
    token = storage.sessionGet("Authorization");
  }
  const baseUrl = process.env.REACT_APP_BACK_END_BASE_URL;
  const data = props.data;
  const [show, setShow] = useState(false);
  const history = useHistory();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteAdvert = () => {
    axios
      .delete(
        `${process.env.REACT_APP_BACK_END_BASE_URL}/api/v1/adverts/${data.id}`,
        config
      )
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="text-center">
        <Card className="single-advert text-center">
          <div>
            <img
              className="mt-2 advert-picture"
              src={data.photo ? baseUrl + data.photo : placeholderImage}
              alt={data.name}
            />
          </div>
          <div>
            <span className="advert-name">{data.name}</span>
          </div>
          <div>
            <span className="advert-price">{data.price}€</span>
          </div>
          <div className="advert-tag-list d-flex flex-column">
            {data.tags.map((tag) => (
              <span className="advert-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div>
            <span className="advert-sale">
              {data.sale ? "En venta" : "Se compra"}
            </span>
          </div>
          <span className="advert-date">
            {new Date(Date.parse(data.createdAt)).toLocaleString("es-ES")}
          </span>
          <div className="mb-2">
            <Button variant="danger" onClick={handleShow}>
              Eliminar anuncio
            </Button>
          </div>
        </Card>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar anuncio</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Seguro que quieres eliminar {data.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={deleteAdvert}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Advert;
