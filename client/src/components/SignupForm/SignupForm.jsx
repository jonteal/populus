import React, { useState, useEffect } from "react";
import "./signupForm.css";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });

  const [validated] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [createUser, { data, error }] = useMutation(ADD_USER);

  const [inputPassword, setInputPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    error ? setShowAlert(true) : setShowAlert(false);
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    setInputPassword(value);
  };

  const handlePasswordCheck = (event) => {
    event.preventDefault();
    (inputPassword === checkPassword) ? setPasswordMatch(true) : setPasswordMatch(false);
    if (inputPassword !== checkPassword){
      setPasswordError("Your passwords do not match, try again")
    } else {
      setPasswordError("")
    }
    
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await createUser({
        variables: { ...userFormData },
      });

      Auth.login(data.createUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-start">
        <div className="bg-white p-8 rounded shadow-2xl w-3/4">
          <h2 className="text-3xl font-bold mb-4 text-center">Create Your Account!</h2>
          <form className="space-y-3" noValidate validated={validated} onSubmit={handleFormSubmit}>
            {/* show alert if server response is bad */}
            {/* <alert
              dismissible
              onClose={() => setShowAlert(false)}
              show={showAlert}
              variant="danger"
            >
              Something went wrong with your signup!
            </alert> */}

            {/* Email */}
            <form>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter email address"
                name="email"
                onChange={handleInputChange}
                value={userFormData.email}
                required
                className="border-radius-5px"
              />
              {/* <div type="invalid">
                Email is required!
              </div> */}
            </form>

            {/* Password */}
            <form>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={handleInputChange}
                value={userFormData.password}
                onBlur={handlePasswordCheck}
                required
              />
                            <label htmlFor="passwordCheck">Retype Password</label>

              <input
                type="password"
                placeholder="Retype your password"
                name="passwordCheck"
                onChange={(event) => setCheckPassword(event.target.value)}
                onBlur={handlePasswordCheck}
                required
              />
            </form>
            {passwordMatch && <p>Your passwords match, great typing!</p>}
              <p>{passwordError}</p>
            {/* Submit Button */}
            <button
              disabled={!(userFormData.email && userFormData.password)}
              type="submit"
              variant="success"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;