import React from "react";
import "./index.css";
import Popular from "./components/Popular";
import Battle from "./components/Battle";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="App">
      <Popular />
      <Battle />
      <Footer />
    </div>
  )
}


