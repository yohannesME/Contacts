import React, { useEffect } from "react";
import { useLocation, Link  } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../features/user/userSlice";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyPage = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.user);

  const verifyToken = async () => {
    dispatch(
      verifyEmail({
        verificationToken: query.get("token"),
        email: query.get("email"),
      })
    );
  };

  useEffect(() => {
    if (!isLoading) {
      verifyToken();
    }
  }, []);

  if (isLoading) {
    return (
      <Wrapper className="page">
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="full">
        <div>
          <h2>Account Confirmed</h2>
          <Link to="/register" className="btn">
            Please login
          </Link>
          
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`

`;

export default VerifyPage;
