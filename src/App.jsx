import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Provider } from "react-redux";
import store from "./redux/store";
import Technologies from "./pages/technologies/Home";
import CreateTechnologie from "./pages/technologies/Create";
import EditTechnologie from "./pages/technologies/Edit";
import HomeEntreprise from "./pages/entreprises/Home";
import CreateEntreprise from "./pages/entreprises/Create";
import EditEntreprise from "./pages/entreprises/Edit";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar bg="dark" variant="dark" className="navbar sticky-top">
          <Container className="navbar-container">
            <Navbar.Brand as={Link} to="/">
              My App
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/technologies">
                Technologies
              </Nav.Link>
              <Nav.Link as={Link} to="/technologies/create">
                Create Technologie
              </Nav.Link>
              <Nav.Link as={Link} to="/entreprises">
                Entreprises
              </Nav.Link>
              <Nav.Link as={Link} to="/entreprises/create">
                Create Entreprise
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container className="container mt-3">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/technologies" element={<Technologies />} />
            <Route
              path="/technologies/create"
              element={<CreateTechnologie />}
            />
            <Route
              path="/technologies/edit/:id"
              element={<EditTechnologie />}
            />
            <Route path="/entreprises" element={<HomeEntreprise />} />
            <Route path="/entreprises/create" element={<CreateEntreprise />} />
            <Route path="/entreprises/edit/:id" element={<EditEntreprise />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
