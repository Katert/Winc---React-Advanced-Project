import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box, Container } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Container maxW="container.lg" my={8}>
        <Navigation />
        <Outlet />
      </Container>
    </Box>
  );
};
