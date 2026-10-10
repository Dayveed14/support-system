import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

export default function Login() {
<<<<<<< HEAD
=======
<<<<<<< HEAD
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const result = login(email, password);
    if (!result.success) setError(result.error);
  };

=======
>>>>>>> 9604213 (sync)
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const isRegister = mode === "register";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    const result = isRegister
      ? await register(name, email, password)
      : await login(email, password);
    setBusy(false);
    if (!result.success) setError(result.error);
  };

  const switchMode = () => {
    setMode(isRegister ? "login" : "register");
    setError("");
  };

<<<<<<< HEAD
=======
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
  return (
    <div className="login-root">
      <div className="login-bg-grid" />
      <div className="login-bg-glow" />
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">🎫</div>
          <div className="login-logo-text">SupportDesk</div>
        </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Sign in to access your support dashboard</p>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label">Email Address</label>
            <input
              className="login-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-field">
            <label className="login-label">Password</label>
            <input
              className="login-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="login-error">⚠ {error}</div>}
          <button type="submit" className="login-btn">Sign In →</button>
        </form>
=======
>>>>>>> 9604213 (sync)
        <h1 className="login-title">{isRegister ? "Create your account" : "Welcome back"}</h1>
        <p className="login-subtitle">
          {isRegister ? "Register to get help from our support team" : "Sign in to access your support dashboard"}
        </p>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="login-field">
              <label className="login-label" htmlFor="name">Full Name</label>
              <input id="name" className="login-input" type="text" placeholder="Your full name"
                value={name} onChange={(event) => setName(event.target.value)} minLength={2} maxLength={100} required autoComplete="name" />
            </div>
          )}
          <div className="login-field">
            <label className="login-label" htmlFor="email">Email Address</label>
            <input id="email" className="login-input" type="email" placeholder="you@example.com"
              value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
          </div>
          <div className="login-field">
            <label className="login-label" htmlFor="password">Password</label>
            <input id="password" className="login-input" type="password" placeholder={isRegister ? "At least 8 characters" : "••••••••"}
              value={password} onChange={(event) => setPassword(event.target.value)} minLength={isRegister ? 8 : undefined}
              maxLength={72} required autoComplete={isRegister ? "new-password" : "current-password"} />
          </div>
          {error && <div className="login-error" role="alert">⚠ {error}</div>}
          <button type="submit" className="login-btn" disabled={busy}>
            {busy ? "Please wait…" : isRegister ? "Create Account →" : "Sign In →"}
          </button>
        </form>
        <p className="login-switch">
          {isRegister ? "Already have an account?" : "New to SupportDesk?"}{" "}
          <button type="button" onClick={switchMode}>{isRegister ? "Sign in" : "Create an account"}</button>
        </p>
<<<<<<< HEAD
=======
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
      </div>
    </div>
  );
}
