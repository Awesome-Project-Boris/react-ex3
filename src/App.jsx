import { useState } from 'react'
import Profile from './FuncComps/Profile'
import SystemAdmin from './FuncComps/SystemAdmin'
import Register from './FuncComps/Register'
import Login from './FuncComps/Login'
import EditDetails from './FuncComps/EditDetails'


import './App.css'
import { useEffect } from 'react'

function App() {
  const [activeUser, setActiveUser] = useState(() => {const storedUser = sessionStorage.getItem('activeUser'); return storedUser ? JSON.parse(storedUser) :  {username: "", password: "", confirmPassword: "", picture: null, firstName: "", surname: "", email: "", birthDate: "", city: "", street: "", number: ""}; });
  const [userList, setUserList] = useState(() => {const storedUsers = localStorage.getItem('users');return storedUsers ? JSON.parse(storedUsers) : []; });
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showProfile, setShowProfile] = useState(() => { return activeUser.username !== "" && activeUser.username !== "admin"; });
  const [editingUser, setEditingUser] = useState(null);
  const [showAdminPanel, setShowAdminPanel ] = useState(true)

  const openEditDetails = (user) => {
  setEditingUser(user);
  setShowProfile(false); 
  };
  

  useEffect(() => {
    // Ensure admin user exists
  const admin = { username: "admin", password: "ad12343211ad", email: "admin@gmail.com", picture: null, firstName: "", surname: "", birthDate: "", city: "", street: "", number: "" };

  if (!userList.some(user => user.username === admin.username)) {
    const updatedUsers = [...userList, admin];
    setUserList(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Sync to storage
  }
  }, [userList]);
   

  const loginUser = (user) => 
    {
      setActiveUser(user);
      sessionStorage.setItem('activeUser', JSON.stringify(user));
      setShowLoginForm(false);
      setShowRegisterForm(false);
      setShowProfile(true);
    }
  

  const registerUser = (newUser) => 
    {
      const updatedUserList = [...userList, newUser]
      setUserList(updatedUserList)
      localStorage.setItem("users",JSON.stringify((updatedUserList)));
      setActiveUser(newUser)
      sessionStorage.setItem('activeUser', JSON.stringify(newUser));
      setShowRegisterForm(false)
      setShowProfile(true)
      setShowLoginForm(false)
    }
  
  const logoutUser = (email) =>
  {
    if (email)
    {
    const loggedInUser = JSON.parse(sessionStorage.getItem('activeUser') || {} )

    if ( loggedInUser && email === loggedInUser.email )
    {
    sessionStorage.clear('activeUser');
    setActiveUser({
      username: "",
      password: "",
      confirmPassword: "",
      picture: null,
      firstName: "",
      surname: "",
      email: "",
      birthDate: "",
      city: "",
      street: "",
      number: "",
    });
    setShowProfile(false);
    sessionStorage.clear('activeUser');
  }
  }
}

  const deleteUser =(email) => 
    {
      if (email) {
        const updatedUserList = userList.filter((user) => user.email !== email);
    
        setUserList(updatedUserList);
        localStorage.setItem("users", JSON.stringify(updatedUserList));
    }
  }

  const editUser = (updatedUser) => {
    const updatedUserList = userList.map((user) =>
      user.email === updatedUser.email ? updatedUser : user
    );
    setUserList(updatedUserList);
    localStorage.setItem("users", JSON.stringify(updatedUserList));

    if (activeUser.email === updatedUser.email) {
      setActiveUser(updatedUser);
      sessionStorage.setItem("activeUser", JSON.stringify(updatedUser));
    }
  };

  const getDataFromProfile = (data) => {
    if ( data.action == 'edit')
    {
      editUser(data.user)
    }
    if (data.action == 'logout')
    {
      logoutUser(data.info);
    }

    }

  return (
    <>
      <div
        className="topBar"
        style={{
          width: "100%",
          height: 30,
          backgroundColor: "lightblue",
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
        }}
      >
        {activeUser.username === "" ? (
          <div>Hello, Guest</div>
        ) : (
          <div>Hello, {activeUser.username}</div>
        )}
        {activeUser.username === "" && (
          <div style={{ display: "flex", gap: "15px" }}>
            <div
              style={{
                cursor: "pointer",
                marginRight: 50,
                border: "1px solid gray",
                borderRadius: 5,
                padding: 10,
              }}
              onClick={() => {
                setShowLoginForm(true);
                setShowRegisterForm(false);
              }}
            >
              Login
            </div>
            <div
              style={{
                cursor: "pointer",
                marginRight: 50,
                border: "1px solid gray",
                borderRadius: 5,
                padding: 10,
              }}
              onClick={() => {
                setShowRegisterForm(true);
                setShowLoginForm(false);
              }}
            >
              Register
            </div>
          </div>
        )}
        {activeUser.username !== "" && <div
          style={{
            cursor: "pointer",
            marginRight: 50,
            border: "1px solid gray",
            borderRadius: 5,
            padding: 10,
          }}
          onClick={() => {
            logoutUser(activeUser.email);
            setShowProfile(false);
            setEditingUser(null);
          }}
        >
          Sign out
        </div>}
      </div>
  
      {activeUser.username === "admin" && showAdminPanel && <SystemAdmin props={userList} onEditUser={(user) => {setEditingUser(user); setShowAdminPanel(false); setShowProfile(false); }} onDeleteUser={deleteUser} />}
      {(activeUser.username !== "" && activeUser.username !== "admin") && showProfile && (<Profile props={activeUser} sendDataToMain={getDataFromProfile} onEdit={openEditDetails} />)}
      {activeUser.username === "" && !showRegisterForm && !showLoginForm && (<div> Please login or register to continue</div>)}
      {showRegisterForm && activeUser.username === "" && (<Register onRegister={registerUser} />)}
      {showLoginForm && activeUser.username === "" && (<Login loginIn={loginUser} />)}
      {editingUser && (<EditDetails userData={editingUser} onSave={(updatedUser) => { editUser(updatedUser); setEditingUser(null); setShowProfile(false); setShowAdminPanel(true); }} onCancel={() => { setEditingUser(null); setShowProfile(false); setShowAdminPanel(true); setShowProfile(true)}} />)}

    </>
  );
  
}

export default App
