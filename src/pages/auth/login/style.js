import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { colors } from "@/constants";

export const PageContainer = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const PageBackground = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  object-fit: cover;
`;

export const LoginCard = styled.div`
  width: 100%;
  max-width: 500px;
  height: auto;
  min-height: 200px;
  display: flex;
  z-index: 1;
  background-color: ${colors.light};
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  padding: 20px;
  flex-direction: column;
  align-items: center;
  margin: 15px;
`;

export const CompanyLogo = styled.img`
  height: 50px;
  margin: 15px 0 25px 0;
`;

export const CardTitle = styled.h1`
  font-size: 1.3rem;
  font-weight: 400;
  color: ${colors.primary};
  text-align: center;
`;

export const CardSubtitle = styled.p`
  font-size: 1rem;
  font-weight: 300;
  color: ${colors.primary};
  text-align: center;
`;

export const FormContainer = styled.div`
  width: 100%;
  height: auto;
  margin: 40px 0 20px 0;

  @media screen and (min-width: 425px) {
    padding: 0 10px 0 10px;
  }
`;

export const SubmitContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`;

export const ForgotPassword = styled(LinkR)`
  margin-top: 8px;
  font-size: 0.9rem;
  color: ${colors.textLink};
  font-weight: 300;
`;
