import Navbar from "../components/Nav/Navbar/Navbar";
import NotFoundImage from "../assets/notFound.gif";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();

  const goHome = () => {
    history.push("/");
  };

  return (
    <>
      <Navbar />
      <div className="text-center">
        <h1>404 | Not found</h1>
        <img src={NotFoundImage} alt="Not found" onClick={goHome} />
      </div>
    </>
  );
};

export default NotFound;
