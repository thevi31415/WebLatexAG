import React, { useState, useRef, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import Guid from "./pages/Guid";

const App = () => {
  const appContainerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    // overflow: "hidden", // Prevents any overflow causing scrollbars
  };

  const headerStyle = {
    flex: "0 0 0px", // Fixed height for header
    overflow: "hidden", // Prevents overflow in the header
  };

  const mainContentStyle = {
    flex: "1 0 auto",
    overflow: "hidden", // Prevents overflow causing scrollbars

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const footerStyle = {
    flex: "0 0 60px", // Fixed height for footer
    overflow: "hidden", // Prevents overflow in the footer
  };

  return (
    <div style={appContainerStyle}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <main
        style={{
          height: "100dvh",
          minHeight: "100%",
          position: "relative",
          overflowY: "hidden",
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gioithieu" element={<About />} />
          <Route path="/huongdan" element={<Guid />} />

          <Route path="/lienhe" element={<Contact />} />
        </Routes>
        {/* <Footer /> */}
      </main>
    </div>
  );
};

export default App;
