import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/create");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6b73ff, #000dff)",
        color: "#fff",
        flexDirection: "column",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ fontSize: "48px", marginBottom: "20px" }}
      >
        Welcome to CodeFolio
      </motion.h1>

      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ fontSize: "20px", marginBottom: "40px" }}
      >
        Build your developer portfolio instantly
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255,255,255,0.7)" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGetStarted}
        style={{
          padding: "15px 40px",
          fontSize: "18px",
          background: "#fff",
          color: "#000dff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Get Started
      </motion.button>
    </div>
  );
}

export default Home;