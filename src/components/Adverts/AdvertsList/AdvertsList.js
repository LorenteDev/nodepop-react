import AdvertCard from "../AdvertCard/AdvertCard";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import storage from "../../../utils/storage";
import axios from "axios";
import Button from "react-bootstrap/button";
let token;
if (storage.get("Authorization")) {
  token = storage.get("Authorization");
} else {
  token = storage.sessionGet("Authorization");
}

const AdvertsList = () => {
  const [name, setName] = useState("");
  const [sale, setSale] = useState(null);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [tags, setTags] = useState([]);
  const [apiTags, setApiTags] = useState([]);
  const [fullList, setFullList] = useState([]);
  const [list, setList] = useState([]);
  const history = useHistory();

  const createNew = () => {
    history.push("/advert/new");
  };

  const updateTags = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((currentTag) => currentTag !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const saleChange = (value) => {
    setSale(value);
  };

  const applyFilter = () => {
    setList(
      fullList.filter(function (advert) {
        const checkName = advert.name
          .toLowerCase()
          .includes(name.toLowerCase());

        let checkPrice;
        if (min === undefined) {
          setMin(0);
        }

        if (max === undefined) {
          setMax(0);
        }

        if (parseInt(max) === 0) {
          checkPrice = advert.price > min;
        } else {
          checkPrice = max > advert.price > min;
        }

        let checkTags;
        if (tags.length > 0) {
          checkTags = advert.tags.some((r) => tags.indexOf(r) >= 0);
        } else {
          checkTags = true;
        }

        let checkSale;

        if (sale === "true") {
          checkSale = advert.sale === true;
        } else if (sale === "false") {
          checkSale = advert.sale === false;
        } else {
          checkSale = true;
        }

        return checkName && checkPrice && checkTags && checkSale;
      })
    );
  };

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(`${process.env.REACT_APP_BACK_END_BASE_URL}/api/v1/adverts`, config)
      .then((response) => {
        setFullList(response.data);
        setList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${process.env.REACT_APP_BACK_END_BASE_URL}/api/v1/adverts/tags`)
      .then((response) => {
        setApiTags(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="filters">
        <label>
          Nombre
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <div className="radio-buttons">
          <label>
            En venta
            <input
              type="radio"
              id="sale"
              name="sale"
              value="true"
              onChange={(e) => saleChange(e.target.value)}
            />
          </label>
          <label>
            Se compra
            <input
              type="radio"
              id="sale"
              name="sale"
              value="false"
              onChange={(e) => saleChange(e.target.value)}
            />
          </label>
          <label>
            Todos
            <input
              type="radio"
              id="sale"
              name="sale"
              value=""
              onChange={(e) => saleChange(e.target.value)}
            />
          </label>
        </div>
        <div className="price-range">
          <label>
            Mínimo
            <input
              className="min-range"
              type="number"
              value={min}
              min="0"
              onChange={(e) => setMin(e.target.value)}
            />
          </label>
          <label>
            Máximo
            <input
              className="max-range"
              type="number"
              value={max}
              min="0"
              onChange={(e) => setMax(e.target.value)}
            />
          </label>
        </div>
        <div className="tags">
          {apiTags.map((tag) => (
            <label className="tag" key={tag}>
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
              <input
                type="checkbox"
                name="tags"
                value={tag}
                onChange={(e) => updateTags(e.target.value)}
              />
            </label>
          ))}
        </div>
        <Button variant="primary" onClick={applyFilter}>
          Filtrar
        </Button>
      </div>
      <div className="adverts-list">
        {fullList.length > 0 ? (
          list.map((data) => <AdvertCard key={data.id} data={data} />)
        ) : (
          <Button variant="primary" onClick={createNew}>
            ¡Crea el primer anuncio!
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdvertsList;
