import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

function Portfolio() {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://codefolio-89x6.onrender.com/api/user/${username}`) // ✅ FIXED
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
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

/* styles same as yours */

export default Portfolio;