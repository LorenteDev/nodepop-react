import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./AdvertCard.css";

const AdvertCard = (props) => {
  const data = props.data;
  const link = `/advert/${data.id}`;

  return (
    <Card className="advert-card">
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Subtitle>{data.price}€</Card.Subtitle>
        <Card.Text>{data.sale ? "En venta" : "Se compra"}</Card.Text>
        <div className="advert-tag-list d-flex gap-2">
          {data.tags.map((tag) => (
            <span className="mr-2" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </Card.Body>
      <Link to={link} className="stretched-link" />
    </Card>
  );
};

export default AdvertCard;
