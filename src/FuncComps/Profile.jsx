export default function Profile({ props, sendDataToMain, onEdit }) 

{
    const upliftData = (data) => {
      sendDataToMain(data);
    };

    const openWebsite = () =>
    {
        window.open("https://www.gameflare.com/online-game/commando-2/", "_blank")
    }

    
  
    // for some reason the birthDate is flipped
    const formatBirthDate = (birthDate) => {
      if (!birthDate) return "";
      const date = new Date(birthDate);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };
  
    return (
      <div
        style={{
          width: 800,
          height: 300,
          border: "1px solid lightgray",
          borderRadius: 10,
          display: "flex",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          justifyContent: "space-between",
          marginTop: 100,
          alignItems: "center",
          padding: 20,
          backgroundColor: "#f9f9f9",
        }}
      >
        <div
          style={{
            width: 200,
          height: 200,
          border: "2px solid gray",
          borderRadius: "50%",
          backgroundImage: `url(${props.picture})`, 
          backgroundSize: "cover", 
          backgroundPosition: "center",
          backgroundColor: "#e0e0e0", 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          color: "#555",
          }}
        >
           {!props.picture && "Photo Here"} 
        </div>
        <div
          style={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: 20,
            gap: 10,
          }}
        >
          <p style={{ margin: 0, fontSize: 18, fontWeight: "bold", color: "#333" }}>
            {`${props.firstName} ${props.surname}`}
          </p>
          <p style={{ margin: 0, fontSize: 14, color: "#666" }}>{props.email}</p>
          <p style={{ margin: 0, fontSize: 14, color: "#666" }}>
            {`${props.street} ${props.number}, ${props.city}`}
          </p>
          <p style={{ margin: 0, fontSize: 14, color: "#666" }}>
            {formatBirthDate(props.birthDate)}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              justifyContent: "flex-start",
              marginTop: 20,
            }}
          >
            <button
              style={{
                border: "none",
                padding: "10px 20px",
                borderRadius: 5,
                cursor: "pointer",
                backgroundColor: "lightblue",
                fontSize: 14,
                fontWeight: "bold",
                color: "#333",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => onEdit(props)}
            >
              Edit Details
            </button>
            <button
              style={{
                border: "none",
                padding: "10px 20px",
                borderRadius: 5,
                cursor: "pointer",
                backgroundColor: "lightgreen",
                fontSize: 14,
                fontWeight: "bold",
                color: "#333",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => {
                openWebsite()
              }}
            >
              Favorite Game
            </button>
            <button
              style={{
                border: "none",
                padding: "10px 20px",
                borderRadius: 5,
                cursor: "pointer",
                backgroundColor: "crimson",
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => {
                upliftData({ action: "logout", info: props.email });
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
  }
  