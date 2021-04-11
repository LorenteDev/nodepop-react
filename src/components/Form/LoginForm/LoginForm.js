import { useState } from "react";
import storage from "../../../utils/storage";
import axios from "axios";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    await axios
      .post(`${process.env.REACT_APP_BACK_END_BASE_URL}/api/auth/login`, {
        email,
        password,
      })
      .then((response) => {
        if (response.status !== 201) {
          setError(response.statusText);
        }
        setIsLoading(false);
        return response.data;
      })
      .then(async (data) => {
        if (remember) {
          await storage.set("Authorization", data.accessToken);
        } else {
          await storage.sessionSet("Authorization", data.accessToken);
        }
        console.log("LOGIN OK");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <form className="login-form text-center col" onSubmit={handleSubmit}>
        <label className="row">
          Email
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="row">
          Contraseña
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="row align-items-center">
          Recuérdame
          <input
            type="checkbox"
            value={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
        </label>
        <button className="row" disabled={isLoading}>
          Iniciar sesión
        </button>
      </form>
      {error && <span className="login-error-message">{error}</span>}
    </>
  );
}

export default LoginForm;
