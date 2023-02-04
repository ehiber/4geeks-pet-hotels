import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import {Input} from "../component/input.js"
import "../../styles/home.css";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [first_name, setFirst_name] = useState("");
  // const [last_name, setLast_name] = useState("");
  // const [country, setCountry] = useState("");
  // const [zip_code, setZip_code] = useState("");
  // const [phone_number, setPhone_number] = useState("");

  // REGEXS
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})/;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const zipCodeRegex = /^\d{3,10}$/;
  const phoneNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10,12}$/;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    country: "",
    zip_code: "",
    phone_number: ""
  });

  const [errors, setErrors] = useState({});

  const handleValidateForm = (ev) => {
    ev.preventDefault();
    let newErrors = {};
    // TODO Replace the ifs pattern with a loop
    for (let field in formData) {
      if (formData[field] === "") {
        newErrors[field] = `${field} is required`
      } else if (!emailRegex.test(Object.values(formData)[2])){
        newErrors.email = "You have entered an invalid email address!"
      } else if (!passwordRegex.test(Object.values(formData)[3])) {
          newErrors.password = "You have entered an invalid password!";
      } else if (Object.values(formData)[3] !== Object.values(formData)[4]) {
          newErrors.confirm_password = "Fields 'Password' and 'Confirm password' do not match";
      } else if (!zipCodeRegex.test(Object.values(formData)[6])) {
          newErrors.zip_code = "You have entered an invalid zip code!";
      } else if (!phoneNumberRegex.test(Object.values(formData)[7])) {
          newErrors.phone_number = "You have entered an invalid phone number!";
      }
    }
    // if (!formData.first_name) {
    //   newErrors.first_name = "First name is required";
    // }
    // if (!formData.last_name) {
    //   newErrors.last_name = "Last name is required";
    // }

    // if (!formData.email) {
    //   newErrors.email = "Email is required";
    // } else if (!emailRegex.test(formData.email)) {
    //   newErrors.email = "You have entered an invalid email address!";
    // }
    // if (!formData.password) {
    //   newErrors.password = "Password is required";
    // } else if (!passwordRegex.test(formData.password)) {
    //   newErrors.password = "You have entered an invalid password!";
    // }

    // if (!formData.confirm_password) {
    //   newErrors.confirm_password = "Please, confirm your password";
    // } else if (formData.confirm_password !== formData.password) {
    //   newErrors.confirm_password =
    //     "Fields 'Password' and 'Confirm password' do not match";
    // }
    // if (!formData.country) {
    //   newErrors.country = "Country is required";
    // }
    // if (!formData.zip_code) {
    //   newErrors.zip_code = "Zip code is required";
    // } else if (!zipCodeRegex.test(formData.zip_code)) {
    //   newErrors.zip_code = "You have entered an invalid zip code!";
    // }
    // if (!formData.phone_number) {
    //   newErrors.phone_number = "Phone number is required";
    // } else if (!phoneNumberRegex.test(formData.phone_number)) {
    //   newErrors.phone_number = "You have entered an invalid phone number!";
    // }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      handleSignupClick();
    }

    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.id]: ev.target.value });
  };

  const handleSignupClick = () => {
    fetch(process.env.BACKEND_URL + "/api/signup", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        country: formData.country,
        zip_code: formData.zip_code,
        phone_number: formData.phone_number,
      }),
      mode: "no-cors", //? are we sure?
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        "There was an error: ", error;
      });
  };

  return (
    <div className="text-center mt-5">
      <h1>Sign up</h1>
      <div className="forms">
        <form>
          <input
            type="hidden"
            id="crsf_token"
            value={formData.crsf_token}
            onChange={handleChange}
          />
          <Input 
          type="text" 
          placeholder="First name" 
          id="first_name" 
          value={formData.first_name}
          onChange={handleChange}
          />
          {errors.first_name && <p>{errors.first_name}</p>}
          <Input 
          type="text" 
          placeholder="Last name" 
          id="last_name" 
          value={formData.last_name}
          onChange={handleChange}
          />
          {errors.last_name && <p>{errors.last_name}</p>}
          <Input 
          type="text" 
          placeholder="Email" 
          id="email" 
          value={formData.email}
          onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
          <Input 
          type="password" 
          placeholder="Password" 
          id="password" 
          value={formData.password}
          onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
          <Input 
          type="password" 
          placeholder="Confirm password" 
          id="confirm_password" 
          value={formData.confirm_password}
          onChange={handleChange}
          />
          {errors.confirm_password && <p>{errors.confirm_password}</p>}
          <Input 
          type="text" 
          placeholder="Country" 
          id="country" 
          value={formData.country}
          onChange={handleChange}
          />
          {errors.country && <p>{errors.country}</p>}
          <Input 
          type="text" 
          placeholder="Zip code" 
          id="zip_code" 
          value={formData.zip_code}
          onChange={handleChange}
          />
          {errors.zip_code && <p>{errors.zip_code}</p>}
          <Input 
          type="text" 
          placeholder="Phone number" 
          id="phone_number" 
          value={formData.phone_number}
          onChange={handleChange}
          />
          {errors.phone_number && <p>{errors.phone_number}</p>}
          <button onClick={handleValidateForm}>Sign up</button>
        </form>
      </div>
    </div>
  );
};
