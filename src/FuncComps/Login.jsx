import { useState } from "react";

export default function Login({loginIn}) {

  const userList = JSON.parse(localStorage.getItem('users')) || []

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const loginClick = () => {
    const user = userList.find((user) => user.username === username && user.password === password );

    if (user) { loginIn(user)}
    else { setError("Invalid user name or password, please try again.")}

  }


  return (
    <div
      style={{
        width: 400,
        minHeight: 200,
        border: "1px solid lightgray",
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        marginTop: 100,
        padding: 20,
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2>Login</h2>
<div style={{ width: "100%", marginBottom: 10 }}>
  <input
    type="text"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    placeholder="Username" 
    style={{
      width: "70%",
      padding: 8,
      borderRadius: 5,
      border: "1px solid lightgray",
      marginTop: 5,
    }}
  />
</div>
<div style={{ width: "100%", marginBottom: 10 }}>
  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password" 
    style={{
      width: "70%",
      padding: 8,
      borderRadius: 5,
      border: "1px solid lightgray",
      marginTop: 5,
    }}
  />
</div>
      {error && <p style={{ color: "red", fontSize: 14 }}>{error}</p>}
      <button className="submit-button"
        onClick={loginClick}
      >
        Login
      </button>
    </div>
  );
}
