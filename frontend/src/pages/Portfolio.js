import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

function Portfolio() {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/user/${username}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [username]);

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

          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {user.name}
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {user.bio}
          </motion.p>

          {user.github && (
            <motion.a
              href={user.github}
              target="_blank"
              rel="noreferrer"
              style={btn}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              🔗 GitHub
            </motion.a>
          )}
        </motion.div>

        {/* 🧠 SKILLS */}
        <motion.div
          style={section}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          <h2>Skills</h2>

          <div style={skills}>
            {user.skills?.map((skill, i) => (
              <motion.span
                key={i}
                style={badge}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* 💼 PROJECTS */}
        <div style={section}>
          <h2>Projects</h2>

          <div style={grid}>
            {user.projects?.map((p, i) => (
              <motion.div
                key={i}
                style={projectCard}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                }}
              >
                <h3>{p.title}</h3>
                <p style={{ color: "#bbb" }}>{p.description}</p>

                {p.link && (
                  <motion.a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    style={link}
                    whileHover={{ scale: 1.1 }}
                  >
                    🔗 View Project
                  </motion.a>
                )}
              </motion.div>
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
  transition: "0.3s",
};

const link = {
  display: "inline-block",
  marginTop: "10px",
  color: "#60a5fa",
  textDecoration: "none",
};

export default Portfolio;