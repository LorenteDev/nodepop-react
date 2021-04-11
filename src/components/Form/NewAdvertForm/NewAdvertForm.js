import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import storage from "../../../utils/storage";
import axios from "axios";
let token;
if (storage.get("Authorization")) {
  token = storage.get("Authorization");
} else {
  token = storage.sessionGet("Authorization");
}

function NewAdvertForm() {
  const [name, setName] = useState("");
  const [sale, setSale] = useState(false);
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [apiTags, setApiTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    var formData = new FormData();

    var file = new Blob([photo], { type: "multipart/form-data" });

    formData.append("name", name);
    formData.append("sale", sale);
    formData.append("price", price);
    formData.append("tags", tags);
    if (photo) {
      formData.append("photo", file);
    }

    if (price === 0) {
      setError("El precio no puede ser 0");
      setIsLoading(false);
    } else if (tags.length === 0) {
      setError("Selecciona al menos un tag");
      setIsLoading(false);
    } else {
      await axios
        .post(
          `${process.env.REACT_APP_BACK_END_BASE_URL}/api/v1/adverts`,
          formData,
          config
        )
        .then((response) => {
          if (response.status !== 201) {
            setError(response.statusText);
          }
          setIsLoading(false);
          history.push(`/advert/${response.data.id}`);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_END_BASE_URL}/api/v1/adverts/tags`)
      .then((response) => {
        setApiTags(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateTags = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((currentTag) => currentTag !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          ¿En venta?
          <input
            type="checkbox"
            value={sale}
            onChange={(e) => setSale(e.target.checked)}
          />
        </label>
        <label>
          Precio
          <input
            type="number"
            required
            value={price}
            min="0"
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
        </label>
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
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/png, image/jpeg, image/jpg"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <button disabled={isLoading}>Crear anuncio</button>
      </form>
      {error && <span className="new-advert-error-message">{error}</span>}
    </div>
  );
}

export default NewAdvertForm;
