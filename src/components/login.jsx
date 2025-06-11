import React, { useState } from "react";
import {
    auth,
    googleProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "../firebase";
import "./login.css";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
></link>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const [error, setError] = useState("");

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login bem-sucedido - redirecionar ou fazer algo
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Login com Google bem-sucedido
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      setError("Por favor, insira seu e-mail");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert(`E-mail de redefinição enviado para ${resetEmail}`);
      setShowResetModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="main-content">
      <div className="left-panel">
        <div className="motivational-text">
          <div className="brand">Castro Admin</div>
          <h1>Agende com facilidade, gerencie com precisão.</h1>
          <p>
            Agendamentos automáticos, gestão de equipe e serviços tudo em um só
            lugar. Deixe a burocracia para nós e foque no que importa: seus
            clientes.
          </p>
        </div>
      </div>
      <div className="login-panel">
        <div className="login-box">
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleLogin}>
            <input
              classname="email"
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={togglePassword} className="toggle-password">
                <span className="material-icons">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </span>
            </div>
            <div className="options">
              <label>
                <input type="checkbox" /> Lembrar-me
              </label>
              <a href="#" onClick={() => setShowResetModal(true)}>
                Esqueci a senha
              </a>
            </div>
            <button type="submit">Entrar</button>
          </form>

          <div className="social-login">
            <button onClick={handleGoogleLogin} className="google-btn">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                alt="Google"
              />
              Entrar com Google
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Esqueci a Senha */}
      {showResetModal && (
        <div className="modal-overlay">
          <div className="reset-modal">
            <h3>Redefinir Senha</h3>
            <p>Digite seu e-mail para receber o link de redefinição</p>
            <input
              className="email"
              type="email"
              placeholder="Seu e-mail"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handlePasswordReset}>Enviar</button>
              <button onClick={() => setShowResetModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
