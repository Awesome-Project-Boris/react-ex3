import { useState } from "react";

export default function EditDetails({ userData, onSave, onCancel }) {

   const userList = JSON.parse(localStorage.getItem('users'));

  const cities = [
    "נתניה",
    "תל אביב",
    "הרצליה",
    "זכרון יעקב",
    "כפר מונש",
    "קריית גת",
    "חדרה",
    "חיפה",
    "קריית שמונה",
    "ראשון לציון",
    "עפולה",
    "נהריה",
    "רמת השרון",
    "חולון",
    "ניו יורק",
    "גזר",
    "נוף הגליל",
    "עתלית",
  ];

  

  const [data, setData] = useState({
    username: userData.username,
    password: "",
    confirmPassword: "",
    picture: null,
    firstName: userData.firstName,
    surname: userData.surname,
    email: userData.email, // Only pre-fill email
    birthDate: userData.birthDate,
    city: userData.city,
    street: userData.street,
    number: userData.number,
  });

  const [errorText, setErrorText] = useState({});

  const validateFieldValue = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "username":
        if (!value) {
          error = "Username cannot be empty.";
        }
        else if (userList.some((user) => user.username === value && user.email !== userData.email)) {
          error = "You cannot change your username to an existing username.";
        }
        else if (
          !/^[a-zA-Z0-9!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?]+$/.test(value)
        ) {
          error =
            "Username can only contain English letters, numbers, and special characters (!@#$%^&*()_+-=[]{};:'\"\\|,.<>/?).";
        } else if (value.length > 60) {
          error = "Username cannot exceed 60 characters.";
        }
        break;

      case "password":
        if (value.length < 7 || value.length > 12) {
          error = "Password must be between 7 and 12 characters long.";
        }
        if (!/[A-Z]/.test(value)) {
          error += "Password must include at least one uppercase letter. ";
        }
        if (!/[0-9]/.test(value)) {
          error += "Password must include at least one number. ";
        }
        if (!/[!@#$%^&*]/.test(value)) {
          error += "Password must include at least one special character (!@#$%^&*). ";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Please enter value for both fields.";
        } else if (value !== data.password) {
          error = "Passwords do not match.";
        }
        break;

      case "picture":
        if (value instanceof File && !["image/jpeg", "image/jpg"].includes(value.type)) {
          error = "Profile picture must be a .jpg or .jpeg file.";
        }
        break;

      case "birthDate":
        if (value) {
          const today = new Date();
          const Bday = new Date(value);
          const age = today.getFullYear() - Bday.getFullYear();
          const monthDifference = today.getMonth() - Bday.getMonth();
          const finalAge =
            monthDifference > 0 || (monthDifference === 0 && today.getDate() >= Bday.getDate())
              ? age
              : age - 1;

          if (finalAge < 18) {
            error = "You must be over 18 to register.";
          } else if (finalAge > 120) {
            error = "You can't be that old. Enter a valid birth date.";
          }
        }
        break;

      case "city":
        if (!/^[\u0590-\u05FF\s]+$/.test(value)) {
          error = "City name must be in Hebrew.";
        }
        break;

      case "street":
        if (!/^[\u0590-\u05FF\s]+$/.test(value)) {
          error = "Street name must be in Hebrew.";
        }
        break;

      case "number":
        if (!/^\d+$/.test(value)) {
          error = "Number must contain digits only.";
        }
        if (value < 0) {
          error = "Number cannot be negative.";
        }
        if (value > 200) {
          error = "Street number too high.";
        }
        break;

      case "firstName":
        if (!value) {
          error = "First name cannot be empty.";
        }
        break;

      case "surname":
        if (!value) {
          error = "Surname cannot be empty.";
        }
        break;

      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "picture" && files && files[0]) {
      const file = files[0];
  
      if (!["image/jpeg", "image/jpg"].includes(file.type)) {
        setErrorText({ ...errorText, picture: "Profile picture must be a .jpg or .jpeg file." });
        return; 
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        setData({ ...data, picture: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setData({ ...data, [name]: value });
    }
  
    const error = validateFieldValue(name, value);
    setErrorText({ ...errorText, [name]: error });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    let isFormValid = true;

    Object.keys(data).forEach((field) => {
      const error = validateFieldValue(field, data[field]);
      if (error) {
        newErrors[field] = error;
        isFormValid = false;
      }
    });

    setErrorText(newErrors);

    if (isFormValid) {
      onSave(data);
    }
  };

  return (
    <div className="edit-details-form-holder">
      <h2>Edit Details</h2>
      <form className="edit-details-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            className="form-control"
          />
          {errorText.username && <p className="error-text">{errorText.username}</p>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="form-control"
          />
          {errorText.password && <p className="error-text">{errorText.password}</p>}
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
            className="form-control"
          />
          {errorText.confirmPassword && (
            <p className="error-text">{errorText.confirmPassword}</p>
          )}
        </div>

        <div className="form-group">
          <label>Profile Picture:</label>
          <input
            type="file"
            name="picture"
            onChange={handleChange}
            className="form-control"
          />
          {errorText.picture && <p className="error-text">{errorText.picture}</p>}
        </div>

        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            className="form-control"
          />
          {errorText.firstName && <p className="error-text">{errorText.firstName}</p>}
        </div>

        <div className="form-group">
          <label>Surname:</label>
          <input
            type="text"
            name="surname"
            value={data.surname}
            onChange={handleChange}
            className="form-control"
          />
          {errorText.surname && <p className="error-text">{errorText.surname}</p>}
        </div>

        <div className="form-group">
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={data.email}
            readOnly
            className="form-control"
            style= {{backgroundColor: "lightgray"}}
          />
        </div>

        <div className="form-group">
          <label>Birth Date:</label>
          <input
            type="date"
            name="birthDate"
            value={data.birthDate}
            onChange={handleChange}
            className="form-control"
          />
          {errorText.birthDate && <p className="error-text">{errorText.birthDate}</p>}
        </div>

        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            list="city-options"
            value={data.city}
            onChange={handleChange}
            className="form-control"
          />
          <datalist id="city-options">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
          {errorText.city && <p className="error-text">{errorText.city}</p>}
        </div>

        <div className="form-group">
          <label>Street Name:</label>
          <input
            type="text"
            name="street"
            value={data.street}
            onChange={handleChange}
            className="form-control"
          />
          {errorText.street && <p className="error-text">{errorText.street}</p>}
        </div>

        <div className="form-group">
          <label>Number:</label>
          <input
            type="number"
            name="number"
            value={data.number}
            onChange={handleChange}
            className="form-control"
          />
          {errorText.number && <p className="error-text">{errorText.number}</p>}
        </div>

        <div className="form-actions">
          <button className="submit-button" type="submit"
          style={{marginTop: 20, marginRight: 20}}>
            Save Changes
          </button>
          <button
            type="button"
            className="submit-button" 
            style= {{backgroundColor: "lightgray"}}
            onClick={() => onCancel()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
