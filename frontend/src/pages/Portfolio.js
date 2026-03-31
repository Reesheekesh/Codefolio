import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

function Portfolio() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://codefolio-89x6.onrender.com/api/user/${username}`);

        if (!res.ok) throw new Error("Server error");

        const data = await res.json();
        setUser(data);
        setError(false);
      } catch (err) {
        console.log("Retrying...");
        setError(true);
        setTimeout(fetchUser, 3000); // 🔁 retry after 3 sec
      }
    };

    fetchUser();
  }, [username]);

  if (error && !user)
    return <h2 style={{ textAlign: "center", color: "#fff" }}>Waking server... ⏳</h2>;

  if (!user)
    return <h2 style={{ textAlign: "center", color: "#fff" }}>Loading...</h2>;

  return (
    <div style={bgStyle}>
      <div style={container}>

        {/* 🧑 PROFILE */}
        <motion.div
          style={card}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={user.profilePic}
            alt="profile"
            style={image}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          <motion.h1>{user.name}</motion.h1>
          <motion.p>{user.bio}</motion.p>

          {user.github && (
            <motion.a
              href={user.github}
              target="_blank"
              rel="noreferrer"
              style={btn}
              whileHover={{ scale: 1.1 }}
            >
              🔗 GitHub
            </motion.a>
          )}
        </motion.div>

        {/* 🧠 SKILLS */}
        <motion.div style={section}>
          <h2>Skills</h2>
          <div style={skills}>
            {user.skills?.map((skill, i) => (
              <span key={i} style={badge}>
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 💼 PROJECTS */}
        <div style={section}>
          <h2>Projects</h2>
          <div style={grid}>
            {user.projects?.map((p, i) => (
              <div key={i} style={projectCard}>
                <h3>{p.title}</h3>
                <p style={{ color: "#bbb" }}>{p.description}</p>

                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    style={link}
                  >
                    🔗 View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* 🎨 STYLES */

const bgStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f0f1a, #1e1e2f)",
  padding: "40px 20px",
};

const container = {
  maxWidth: "900px",
  margin: "auto",
  color: "#fff",
};

const card = {
  textAlign: "center",
  padding: "30px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  marginBottom: "30px",
};

const image = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  marginBottom: "10px",
};

const btn = {
  display: "inline-block",
  marginTop: "10px",
  padding: "10px 18px",
  background: "#6366f1",
  borderRadius: "10px",
  color: "#fff",
  textDecoration: "none",
};

const section = {
  marginBottom: "30px",
};

const skills = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const badge = {
  padding: "6px 14px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.1)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
};

const projectCard = {
  padding: "20px",
  borderRadius: "15px",
  background: "rgba(255,255,255,0.05)",
};

const link = {
  display: "inline-block",
  marginTop: "10px",
  color: "#60a5fa",
  textDecoration: "none",
};

export default Portfolio;