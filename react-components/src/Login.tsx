import axios from "axios";
import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

// INTERFACE FOR PROPS
interface Props {
  setUpdateNav: (s: string) => void;
}

function Login({ setUpdateNav }: Props) {
  // TAKE INPUT FROM USER
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // USED TO ROUTE TO ResultsAdmin.tsx AFTER LOGIN
  const history = useHistory();
  // USED TO DISPLAY MSG
  const [invalid, setInvalid] = useState("");

  // HANDLER FOR FORM SUBMIT
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    //POST REQUEST
    axios
      .post("http://localhost:3000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          // SAVE COOKIE IN LOCAL STORAGE
          localStorage.setItem(
            "IsLoggedIn",
            JSON.stringify(response.data.email)
          );
          // THIS WILL CAUSE RE-RENDER AND NAVBAR WILL BE UPDATED
          setUpdateNav("login");
          // ROUTE TO ResultsAdmin.tsx
          history.push("/resultsAdmin");
        }
      })
      .catch((err) => {
        console.log(err);
        // DISPLAY MESSAGE INCASE OF INVALID CREDS
        setInvalid("Invalid login credentials. Try again.");
      });
  };

  return (
    <>
      <h1>Login</h1>
      <hr />

      <form onSubmit={handleSubmit}>
        <label htmlFor="Email">Email address</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          id="Email"
          placeholder="Enter email"
          type="email"
          className="form-control"
          required
        />
        <label htmlFor="Password">Password</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          id="Password"
          placeholder="Password"
          type="password"
          className="form-control"
          required
        />
        <label>{invalid}</label>
        <br />
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
