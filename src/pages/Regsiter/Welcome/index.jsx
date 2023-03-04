import React from "react";
import { Button } from "../../../molecules/Button";
import { Container } from "../../../molecules/Container";
import { Heading } from "../../../molecules/Heading";
import { Paragraph } from "../../../molecules/Paragraph";
import { StyledWelcomeScreen, StyledLink } from "./welcomeScreen";

const WelcomeScreen = () => {
  return (
    <StyledWelcomeScreen>
      <div className="text-center z-[1]">
        <Container>
          <Heading color="text-shades-white" size="lg">
            Welcome to BORN WAVE
          </Heading>
          <Heading
            as="h3"
            color="text-shades-white"
            size="sm"
            fontWeight="light"
          >
            Lets start by setting up your account
          </Heading>
          <Button color="white" size="lg" className="mt-20">
            Next
          </Button>
          <Paragraph
            color="text-accent-b-200"
            className="max-w-[195px] mx-auto mt-10"
          >
            Already have an account?
          </Paragraph>
          <StyledLink href="/signin" color="text-accent-b-200">
            Sign in
          </StyledLink>
        </Container>
      </div>
    </StyledWelcomeScreen>
  );
};

export default WelcomeScreen;
