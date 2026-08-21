import { useState, SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { setAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(password);
            setAuthenticated(true);
            navigate("/", { replace: true });
        } catch {
            setError("Mot de passe incorrect.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <h1>Backoffice</h1>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    placeholder="Entrez le mot de passe"
                />
                {error && <p className="error">{error}</p>}
                <button type="submit" className="primary" disabled={loading}>
                    {loading ? "Connexion..." : "Se connecter"}
                </button>
            </form>
        </div>
    );
}
