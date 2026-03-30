import { useState } from "react";
import { createUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    name: "",
    bio: "",
    github: "",
    skills: "",
    profilePic: "",
  });

  const [projects, setProjects] = useState([
    { title: "", link: "", description: "" },
  ]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProjectChange = (index, e) => {
    const updated = [...projects];
    updated[index][e.target.name] = e.target.value;
    setProjects(updated);
  };

  const addProject = () => {
    setProjects([...projects, { title: "", link: "", description: "" }]);
  };

  const deleteProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...form,
      skills: form.skills.split(","),
      projects,
    };

    try {
      await createUser(data);
      alert("Profile Created ✅");
      navigate(`/profile/${form.username}`);
    } catch (err) {
      alert("Error ❌");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="card">
        <h2>Create Profile</h2>

        {["username", "name", "bio", "github", "profilePic", "skills"].map(
          (field) => (
            <input
              key={field}
              name={field}
              placeholder={
                field === "profilePic"
                  ? "Profile Image URL"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              value={form[field]}
              onChange={handleChange}
              className="input"
            />
          )
        )}

        <h3>Projects</h3>

        {projects.map((proj, index) => (
          <div key={index} className="projectCard">
            <input
              name="title"
              placeholder="Project Title"
              value={proj.title}
              onChange={(e) => handleProjectChange(index, e)}
              className="input"
            />
            <input
              name="link"
              placeholder="Project Link"
              value={proj.link}
              onChange={(e) => handleProjectChange(index, e)}
              className="input"
            />
            <input
              name="description"
              placeholder="Project Description"
              value={proj.description}
              onChange={(e) => handleProjectChange(index, e)}
              className="input"
            />

            <button
              type="button"
              onClick={() => deleteProject(index)}
              className="btn delete"
            >
              Delete Project
            </button>
          </div>
        ))}

        <button type="button" onClick={addProject} className="btn add">
          + Add Project
        </button>

        <button type="submit" className="btn submit">
          Create Profile
        </button>
      </form>

      {/* 🔥 FIXED CSS */}
      <style>{`
        * {
          box-sizing: border-box; /* 🔥 MAIN FIX */
        }

        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #6366f1, #3b82f6);
        }

        .card {
          width: 480px;
          max-width: 95%;
          background: white;
          padding: 22px;
          border-radius: 16px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.12);
        }

        h2 {
          text-align: center;
          margin-bottom: 15px;
        }

        h3 {
          margin-bottom: 8px;
        }

        .input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          background: #f9fafb;
          font-size: 13px;
        }

        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99,102,241,0.2);
          background: white;
          outline: none;
        }

        .projectCard {
          width: 100%; /* 🔥 ensure full width */
          padding: 14px;
          background: #f1f5f9;
          border-radius: 10px;
          margin-bottom: 12px;
          overflow: hidden; /* 🔥 extra safety */
        }

        .btn {
          width: 100%;
          padding: 11px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
        }

        .btn:active {
          transform: scale(0.97);
        }

        .add {
          background: #6366f1;
          color: white;
          margin-bottom: 8px;
        }

        .submit {
          background: #22c55e;
          color: white;
        }

        .delete {
          background: #ef4444;
          color: white;
          margin-top: 6px;
        }
      `}</style>
    </div>
  );
}

export default CreateProfile;