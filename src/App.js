import { Route, Routes } from "react-router-dom";
import "./styles.css";
import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Login from "./components/Login";
import { GlobalContext } from "./context/GlobalState";
import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetching Users API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://6300279d34344b643105731e.mockapi.io/api/v1/users"
      );
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <GlobalContext.Provider
        value={{
          users,
          setUsers,
          loading,
          setLoading,
          fetchUsers,
          isSubmitted,
          setIsSubmitted,
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<Books />} />
          <Route path="/books/details/:id" element={<BookDetails />} />
        </Routes>
      </GlobalContext.Provider>
      <Footer />
    </>
  );
}
