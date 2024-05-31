// Core
import React from "react";

// Components
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box mb={8}>
      <nav>
        <ul style={{ listStyle: "none" }}>
          <li style={{ fontSize: "20px" }}>
            <Link to="/">Events</Link>
          </li>
        </ul>
      </nav>
    </Box>
  );
};
