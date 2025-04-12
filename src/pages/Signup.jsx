import { useState } from "react";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles/Signup.css"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        display_name: name,
        email,
        isBlocked: false,
        password,
        role: "user",
      });
      navigate("/welcome");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup-page">

      <div className="left-side">
        <div className="form">
          <h2>Sign Up</h2>
          <form className="signup-form" onSubmit={handleSignup}>
            <input type="name" placeholder="Full Name" onChange={(e) => setName(e.target.value)} /> 
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign Up</button>
          </form>
          <p>Already had an account? <Link to="/login">Login here!</Link></p>
        </div>
      </div>

      <div className="right-side">
      <img className="signup-img" src="/signup.png" alt="checklist" />
      </div>
    </div>
  );
};

export default Signup;