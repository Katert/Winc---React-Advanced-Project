// Core
import React from "react";

// Hooks
import { useNavigate } from "react-router-dom";

// Components
import { Button } from "@chakra-ui/react";

export const NavigateButton = ({ href, children, ...props }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};
