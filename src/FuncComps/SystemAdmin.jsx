export default function SystemAdmin({ props, onEditUser, onDeleteUser }) {
  const usersWithoutAdmin = props.filter((user) => user.username !== "admin");

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h2 style={{ marginBottom: "20px", textAlign: "center", fontSize: "24px", color: "#333" }}>User List</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={{ padding: "12px", fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Picture</th>
            <th style={{ padding: "12px", fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Username</th>
            <th style={{ padding: "12px", fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Full Name</th>
            <th style={{ padding: "12px", fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Birth Date</th>
            <th style={{ padding: "12px", fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Address</th>
            <th style={{ padding: "12px", fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Email</th>
            <th style={{ padding: "12px", fontWeight: "bold", borderBottom: "2px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersWithoutAdmin.map((user, index) => (
            <tr key={user.email} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff", transition: "background-color 0.3s" }}>
              <td style={{ padding: "12px", textAlign: "center" }}>
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={`${user.username}'s profile`}
                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
                  />
                ) : (
                  <span style={{ color: "#888", fontStyle: "italic" }}>No Image</span>
                )}
              </td>
              <td style={{ padding: "12px", color: "#333" }}>{user.username}</td>
              <td style={{ padding: "12px", color: "#333" }}>{user.firstName} {user.surname}</td>
              <td style={{ padding: "12px", color: "#333" }}>{new Date(user.birthDate).toLocaleDateString("en-GB")}</td>
              <td style={{ padding: "12px", color: "#333" }}>{user.street} {user.number}, {user.city}</td>
              <td style={{ padding: "12px", color: "#333" }}>{user.email}</td>
              <td style={{ padding: "12px", textAlign: "center" }}>
                <button
                  style={{
                    marginRight: "10px",
                    padding: "6px 12px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onClick={() => onEditUser(user)}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
                >
                  Edit
                </button>
                <button
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onClick={() => onDeleteUser(user.email)}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#a71d2a"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "#dc3545"}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
