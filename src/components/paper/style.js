import styled from "styled-components";
import { colors } from "@/constants";

export const Container = styled.section`
  width: 100%;
  height: auto;
  padding: 20px;
  background-color: ${colors.light};
  border-radius: 8px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.025);
`;

export const Header = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const Title = styled.h1`
  font-size: 1.15rem;
  font-weight: bold;
`;

export const Description = styled.p`
  font-size: 0.9rem;
  color: ${colors.text2};
`;
