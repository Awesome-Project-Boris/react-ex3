import { useState } from "react";

export default function Register({onRegister}) {

const cities = ["נתניה","תל אביב","הרצליה","זכרון יעקב","כפר מונש","קריית גת","חדרה","חיפה","קריית שמונה","ראשון לציון","עפולה","נהריה","רמת השרון", "חולון","ניו יורק","גזר","נוף הגליל","עתלית"]

const [data, setData] = useState({
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

const [errorText, setErrorText ] = useState({});

const userList = JSON.parse(localStorage.getItem('users')) || [];

const validateFieldValue = ( fieldName, value ) =>
{
    let error = '';

    switch (fieldName)
    {


        case "username": {
            if (!value) {
              error = "username cannot be empty.";
            } else if (!/^[a-zA-Z0-9!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?]+$/.test(value)) {
              error =
                "username can only contain English letters, numbers, and special characters (!@#$%^&*()_+-=[]{};:'\"\\|,.<>/?).";
            } else if (value.length > 60) {
              error = "username cannot exceed 60 characters.";
            }
           else if (userList.some((user) => user.username === value)) {
            error = "Username already exists";
            }
            break;
          }

        case "password":
            if (value.length < 7 || value.length > 12 ) { error = "Password must be between 7 and 12 characters long. "}
            if (!/[A-Z]/.test(value)) {error += "Password must include at least one uppercase letter. "; }
            if (!/[0-9]/.test(value)) { error += "Password must include at least one number. ";}
            if (!/[!@#$%^&*]/.test(value)) { error += "Password must include at least one special character (!@#$%^&*). ";}
            break;

        case "confirmPassword":
            if (!value) { error = "Please enter value for both fields."}
            else if (value !== data.password) { error = "Passwords do not match."}
            break;
        
            case "picture":
    if (!value) {
        error = "No file selected.";
    } else if (value instanceof File && !["image/jpeg", "image/jpg"].includes(value.type)) {
        error = "Profile picture must be a .jpg or .jpeg file.";
    }
    break;

        case "email":
            console.log(value)
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { error = "Invalid email format. "; }
            else if (userList.some((user) => user.email === value)) {
              error = "This email is already taken.";
            }
              break;
        
        case "birthDate":
            if (!value)
            {
                error = "Please input a date of birth."
            }
            {
                const today = new Date()
            const Bday = new Date(value)
            const age = today.getFullYear() - Bday.getFullYear();
            const monthDifference = today.getMonth() - Bday.getMonth();
        
            const finalAge = monthDifference > 0 ||(monthDifference === 0 && today.getDate() >= Bday.getDate()) ? age : age - 1;

            if ( finalAge < 18 ) { error = "You must be over 18 to register. "}
            else if ( finalAge > 120 ) error = "You can't be that old. Enter a valid birth date. "
            break;
        }
        
        case "city":
        if (!/^[\u0590-\u05FF\s]+$/.test(value)) { error = "City name must be in Hebrew."; }
        break;

        case "street":
            if (!/^[\u0590-\u05FF\s]+$/.test(value)) { error = 'Street name must be in Hebrew.'; }
        break; 

        case "number":
            if (!/^\d+$/.test(value)) { error = "Number must contain digits only."; }
            if ( value < 0 ) { error = "Number cannot be negative" }
            if ( value > 200 ) { error = "Street number too high. "}
            break;

        case "firstName":
            if (!value) { error = "Name cannot be empty."}
            break;

        case "surname":
            if (!value) { error = "Surname cannot be empty."}
            break;

        default: 
            break;
    }
        return error;
}

const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "picture") {
    const reader = new FileReader();
    reader.onload = () => {
      setData({ ...data, picture: reader.result });
    };
    reader.readAsDataURL(files[0]);
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

    Object.keys(data).forEach((inputField) => 
    {
        const error = validateFieldValue(inputField, data[inputField])
        if (error) {
            newErrors[inputField] = error;
            isFormValid = false;
        }
    });

    setErrorText(newErrors)

    if (isFormValid) 
    {
      onRegister(data)
    }

}


return (
    <div className="registration-form-holder">
      <h2>Registration Form</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>username:</label>
          <input
            type="text"
            name="username" // Match this with the validation case
            value={data.username} // Ensure the correct data key is used
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
          <label>Last Name:</label>
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
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="form-control"
          />
          {errorText.email && <p className="error-text">{errorText.email}</p>}
        </div>
  
        <div className="form-group">
          <label>Birth Date:</label>
          <input
            type="date"
            name="birthDate"
            value={data.birthDate}
            onChange={handleChange}
            onFocus={(e) => e.target.showPicker()}
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
  
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  )};