import {
    auth,
    googleProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "../firebase";

// Função para traduzir os códigos de erro
export const getFriendlyErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Usuário e/ou senha inválidos";
    case "auth/cancelled-popup-request":
    case "auth/popup-closed-by-user":
      return ""; // Não mostra mensagem quando o usuário cancela
    case "auth/account-exists-with-different-credential":
      return "Este e-mail já está cadastrado com outro método de login";
    case "auth/popup-blocked":
      return "O popup de login foi bloqueado. Por favor, permita popups para este site";
    case "auth/network-request-failed":
      return "Problema de conexão. Verifique sua internet";
    case "auth/google-login-failed":
      return "Falha ao conectar com o Google. Tente novamente";
    default:
      return "Ocorreu um erro inesperado. Tente novamente";
  }
};

// Handler para login tradicional
export const handleEmailLogin = async (email, password, setError) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true; // Login bem-sucedido
  } catch (err) {
    setError(getFriendlyErrorMessage(err.code));
    return false; // Login falhou
  }
};

// Handler para login com Google
export const handleGoogleLogin = async (setError) => {
  try {
    await signInWithPopup(auth, googleProvider);
    return true;
  } catch (err) {
    if (err.code !== "auth/cancelled-popup-request") {
      setError(getFriendlyErrorMessage(err.code || "auth/google-login-failed"));
    }
    return false;
  }
};
