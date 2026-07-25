import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LeadForm from "../components/LeadForm";
import Footer from "../components/Footer";
import "./Home.css";
import api from "../services/api";
function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
    const postdetails = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/lead", {
    
      name,
      email,
      budget,
      message,
    });

    alert(response.data.message);

    setName("");
    setEmail("");
    setBudget("");
    setMessage("");
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};
    

  return (
  <>
    <Navbar />

    <Hero />

    <section id="contact">
      <LeadForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        budget={budget}
        setBudget={setBudget}
        message={message}
        setMessage={setMessage}
        postdetails={postdetails}
      />
    </section>

    <Footer />
  </>
);
}

export default Home;