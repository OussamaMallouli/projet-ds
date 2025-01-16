import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

const Home = () => {
  const [entreprises, setEntreprises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/Projet/webapi/entreprises")
      .then((response) => setEntreprises(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/Projet/webapi/entreprises/${id}`)
      .then(() => setEntreprises(entreprises.filter((ent) => ent.id !== id)))
      .catch((error) => console.error("Error deleting entreprise:", error));
  };

  return (
    <div>
      <h1>Entreprises</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Description</th>
            <th>Creation Date</th>
            <th>Logo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entreprises.map((ent) => (
            <tr key={ent.id}>
              <td>{ent.id}</td>
              <td>{ent.nomEntreprise}</td>
              <td>{ent.email}</td>
              <td>{ent.numTel}</td>
              <td>{ent.description}</td>
              <td>{ent.dateDeCreation}</td>
              <td>
                <img src={ent.logo} alt="Logo" width="50" />
              </td>
              <td>
                <Button
                  as={Link}
                  to={`/entreprises/edit/${ent.id}`}
                  variant="warning"
                  className="me-2"
                >
                  Edit
                </Button>
                <Button onClick={() => handleDelete(ent.id)} variant="danger">
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
