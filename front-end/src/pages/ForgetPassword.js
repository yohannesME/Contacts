import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import { ForgetPassword } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { isLoading , emailExist } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const {
  //     alert,
  //     showAlert,
  //     loading,
  //     setLoading,
  //     success,
  //     setSuccess,
  //     hideAlert,
  //   } = useLocalState();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please Provide an Email");
      return;
    }

    dispatch(ForgetPassword({email}))

  };

  useEffect(()=>{
    if(emailExist){
      setTimeout(() => {
        navigate("/register")
      }, 1000);
    }

  }, [emailExist])
  //     try {
  //       const { data } = await axios.post('/api/v1/auth/forgot-password', {
  //         email,
  //       });
  //       showAlert({ text: data.msg, type: 'success' });
  //       setSuccess(true);
  //     } catch (error) {
  //       showAlert({
  //         text: 'Something went wrong, please try again',
  //       });
  //       setSuccess(true);
  //     }
  //     setLoading(false);
  //   };
  return (
    <Wrapper className="page">
      {/* {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )} */}
      {
        <form
          className={isLoading ? "form form-loading" : "form"}
          onSubmit={handleSubmit}
        >
          <h4>Forgot password</h4>
          <FormRow
            type="email"
            name="email"
            value={email}
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

export default ForgotPassword;
