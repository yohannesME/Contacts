import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ResetPassword } from "../features/user/userSlice";
import { FormRow } from "../components";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const intialPassword = {
  password: "",
  comfirmPassword: "",
};

const ResetPasswordForm = () => {
  const [password, setPassword] = useState(intialPassword);

  const { isLoading, passwordReseted } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPassword({ ...password, [name]: value });
  };

  useEffect(() => {
    if (passwordReseted) {
      setTimeout(() => {
        navigate("/register");
      }, 1000);
    }
  }, [passwordReseted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.password) {
      toast.error("Please Provide Password.");
      return;
    }

    if (password.password !== password.comfirmPassword) {
      toast.error("Password Does not Match.");
      return;
    }

    dispatch(
      ResetPassword({
        email: query.get("email"),
        token: query.get("token"),
        password: password.password,
      })
    );
  };
  return (
    <Wrapper className="page">
      {
        <form
          className={isLoading ? "form form-loading" : "form"}
          onSubmit={handleSubmit}
        >
          <h4>reset password</h4>
          <FormRow
            type="password"
            name="password"
            value={password.password}
            handleChange={handleChange}
          />
          <FormRow
            type="password"
            name="comfirmPassword"
            value={password.comfirmPassword}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "New Password"}
          </button>
        </form>
      }
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h4,
  p {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
  }
`;

export default ResetPasswordForm;
