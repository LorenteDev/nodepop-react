import Navbar from "../components/Nav/Navbar/Navbar";
import { useState, useEffect } from "react";
import Advert from "../components/Adverts/Advert/Advert";
import { useParams, useHistory } from "react-router-dom";
import storage from "../utils/storage";
import axios from "axios";
let token;
if (storage.get("Authorization")) {
  token = storage.get("Authorization");
} else {
  token = storage.sessionGet("Authorization");
}

const SingleAdvert = () => {
  //const [error, setError] = useState(null);
  //const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [data, setData] = useState({
    id: "",
    createdAt: "",
    name: "",
    sale: true,
    price: 0,
    tags: [],
    photo: "",
  });

  let { id } = useParams();

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(
        `${process.env.REACT_APP_BACK_END_BASE_URL}/api/v1/adverts/${id}`,
        config
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
        history.push("/404");
      });
  }, [id]);

  return (
    <>
      <Navbar />
      <Advert data={data} />
    </>
  );
};

export default SingleAdvert;
