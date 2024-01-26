import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import { OneTimePassword } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const OTPPage = () => {
  const [OTP, setOTP] = useState("");
  const { isLoading, user, email } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();

  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log(email);
    e.preventDefault();

    if (!OTP || !email) {
      toast.error("Please Provide an OTP");
      return;
    }

    dispatch(OneTimePassword({ OTPassword: OTP, email }));
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [user]);

  return (
    <Wrapper className="page">
      {
        <form
          className={isLoading ? "form form-loading" : "form"}
          onSubmit={handleSubmit}
        >
          <h4>One Time Password</h4>
          <FormRow
            type="text"
            name="OTP"
            value={OTP}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "Get Reset Password Link"}
          </button>
        </form>
      }
    </Wrapper>
  );
};

const Wrapper = styled.main`
  h4,
  p {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
  }
  .login-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-500);
    cursor: pointer;
  }
`;

export default OTPPage;
