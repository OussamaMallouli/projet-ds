import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Home = () => {
  const [technologies, setTechnologies] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:8081/Projet/webapi/technologies")
        .then((response) => setTechnologies(response.data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [user, navigate]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/Projet/webapi/technologies/${id}`)
      .then(() =>
        setTechnologies(technologies.filter((tech) => tech.id !== id))
      )
      .catch((error) => console.error("Error deleting technologie:", error));
  };

  return (
    <div>
      <h1>Technologies</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Version</th>
            <th>Description</th>
            <th>Platform</th>
            <th>Website</th>
            <th>Last Update</th>
            <th>Logo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {technologies.map((tech) => (
            <tr key={tech.id}>
              <td>{tech.id}</td>
              <td>{tech.nomTech}</td>
              <td>{tech.version}</td>
              <td>{tech.description}</td>
              <td>{tech.plateformSupporte}</td>
              <td>{tech.siteWeb}</td>
              <td>{tech.dateDerniereMAJ}</td>
              <td>
                <img
                  src={tech.logo}
                  alt={`${tech.nomTech} logo`}
                  width="50"
                  height="50"
                />
              </td>
              <td>
                <Button
                  as={Link}
                  to={`/technologies/edit/${tech.id}`}
                  variant="warning"
                  className="me-2"
                >
                  Edit
                </Button>
                <Button onClick={() => handleDelete(tech.id)} variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
