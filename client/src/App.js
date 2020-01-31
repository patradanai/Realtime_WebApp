import React from "react";
import Menu from "../src/components/Menu/Menu";
import Footer from "../src/components/Footer/Footer";
import Route from "../src/Route/Route";
import "./App.css";
import { Form, Container } from "semantic-ui-react";

function App() {
  return (
    <div className="App">
      <Container className="containerApp">
        <Menu />
        <Route />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
