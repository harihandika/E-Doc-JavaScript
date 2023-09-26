import React from "react";
import { Container, Header, Title, Description } from "./style";

const Paper = ({ children, style, title, description }) => {
  return (
    <>
      <Container style={{ ...style }}>
        {title && (
          <Header>
            <Title>{title}</Title>
            {description && <Description>{description}</Description>}
          </Header>
        )}

        {children}
      </Container>
    </>
  );
};

export default Paper;
