import { useState } from "react";

import { login } from "./utils/login";

export default function App() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      await login({ email, password });

      alert("Login efetuado com sucesso!");
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(
          "Falha no login. Verifique suas credenciais e tente novamente."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabledButton = (): boolean => {
    return !email || password.length < 6 || isLoading;
  };

  return (
    <div className="wrapper">
      <div className="login-form">
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        <div className="row">
          <label htmlFor={"email"}>Email</label>
          <input
            id={"email"}
            type={"email"}
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor={"password"}>Password</label>
          <input
            id={"password"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="button">
          <button disabled={isDisabledButton()} onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
