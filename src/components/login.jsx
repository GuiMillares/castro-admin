import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "../firebase";
import {
  getFriendlyErrorMessage,
  handleEmailLogin,
  handleGoogleLogin,
} from "../utils/authHelpers";
import "./login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // novo estado

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/dashboard');
      } else {
        setLoading(false); // agora pode mostrar a tela de login
      }
    });
    return unsubscribe;
  }, [navigate]);
  
  if (loading) return null; 

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await handleEmailLogin(email, password, setError);
    if (success) {
      navigate('/dashboard'); // Adicionar redirecionamento
    }
  };

  const handleGoogleSignIn = async () => {
    const success = await handleGoogleLogin(setError);
    if (success) {
      navigate('/dashboard'); // Adicionar redirecionamento
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
      setError("");
    } catch (err) {
      setError(getFriendlyErrorMessage(err.code));
    }
  };

  return (
    <div className="main-content">
      <div className="left-panel">
        <div className="motivational-text">
          <div className="brand">Syncro</div>
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
          {error && (
            <div className="error-message">
              {error}
              {error.includes("Google") && (
                <button onClick={handleGoogleSignIn} className="retry-button">
                  Tentar novamente
                </button>
              )}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <input
              className="email"
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
              <a href="#" onClick={() => setShowResetModal(true)}>
                Esqueci a senha
              </a>
            </div>
            <button type="submit">Entrar</button>
          </form>

          <div className="social-login">
            <button onClick={handleGoogleSignIn} className="google-btn">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                alt="Google"
                className="google-icon"
              />
              Entrar com Google
            </button>
          </div>
        </div>
      </div>

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
