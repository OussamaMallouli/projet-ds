import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Container } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

const Home = () => {
  const [entreprises, setEntreprises] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:8081/Projet/webapi/entreprises")
        .then((response) => setEntreprises(response.data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [user, navigate]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/Projet/webapi/entreprises/${id}`)
      .then(() => setEntreprises(entreprises.filter((ent) => ent.id !== id)))
      .catch((error) => console.error("Error deleting entreprise:", error));
  };

  const handleRowClick = (id) => {
    navigate(`/entreprises/details/${id}`);
  };

  return (
    <div>
      <Container>
        <h1>Entreprises</h1>
        <Button
          as={Link}
          to="/entreprises/create"
          variant="success"
          className="mb-3 mt-2"
        >
          <FaPlus className="me-2" />
          Create New Entreprise
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Creation Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entreprises.map((ent) => (
              <tr
                key={ent.id}
                onClick={() => handleRowClick(ent.id)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  <img
                    src={ent.logo}
                    alt="Logo"
                    className="d-block mx-auto"
                    width="75"
                    height="75"
                  />
                </td>
                <td>{ent.nomEntreprise}</td>
                <td>{ent.email}</td>
                <td>{ent.numTel}</td>
                <td>{ent.dateDeCreation.slice(0, -1)}</td>
                <td>
                  <Button
                    as={Link}
                    to={`/entreprises/edit/${ent.id}`}
                    variant="warning"
                    className="me-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(ent.id);
                    }}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Home;
