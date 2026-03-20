import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "motion/react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: err } = await signIn(email, password);

    if (err) {
      setError("Email ou mot de passe incorrect");
      setLoading(false);
    } else {
      navigate("/admin");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #F5F5F5 0%, #ECECEC 50%, #F0F0F0 100%)",
        padding: "24px",
      }}
    >
      <motion.div
        style={{ width: "100%", maxWidth: 420 }}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            boxShadow: "0 4px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}
        >
          {/* Header band */}
          <div
            style={{
              background: "linear-gradient(135deg, #E40714 0%, #C00612 100%)",
              padding: "32px 32px 28px",
              textAlign: "center",
            }}
          >
            <motion.div
              style={{
                width: 52,
                height: 52,
                background: "rgba(255,255,255,0.2)",
                borderRadius: 16,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
                backdropFilter: "blur(10px)",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </motion.div>
            <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
              Administration
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 6 }}>
              Connectez-vous pour acceder au panel
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ padding: "28px 32px 32px" }}>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginBottom: 20,
                  padding: "12px 16px",
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: 12,
                  color: "#DC2626",
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                {error}
              </motion.div>
            )}

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@metalr.com"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "1.5px solid #E5E7EB",
                  fontSize: 14,
                  color: "#1B1B1B",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  background: "#FAFAFA",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#E40714";
                  e.target.style.boxShadow = "0 0 0 3px rgba(228,7,20,0.1)";
                  e.target.style.background = "#fff";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E5E7EB";
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "#FAFAFA";
                }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "1.5px solid #E5E7EB",
                  fontSize: 14,
                  color: "#1B1B1B",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  background: "#FAFAFA",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#E40714";
                  e.target.style.boxShadow = "0 0 0 3px rgba(228,7,20,0.1)";
                  e.target.style.background = "#fff";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E5E7EB";
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "#FAFAFA";
                }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                background: loading ? "#F87171" : "#E40714",
                color: "#fff",
                border: "none",
                borderRadius: 14,
                fontSize: 14,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.2s",
                letterSpacing: "0.01em",
              }}
              whileHover={!loading ? { scale: 1.01, boxShadow: "0 4px 20px rgba(228,7,20,0.35)" } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }}>
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" fill="none" strokeDasharray="31.4" strokeDashoffset="10" strokeLinecap="round" />
                  </svg>
                  Connexion...
                </span>
              ) : (
                "Se connecter"
              )}
            </motion.button>
          </form>
        </div>

        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: 11, color: "#9CA3AF", marginTop: 20, letterSpacing: "0.05em" }}>
          METALR &middot; Panel d'administration
        </p>
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
