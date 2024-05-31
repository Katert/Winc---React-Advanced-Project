// Core
import React, { useState } from "react";

// Components
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";

// Hooks
import { useEvents } from "../../context/EventsContext";

export const AddEventForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { categories } = useEvents();

  const handleCategoryChange = (checkedItems) => {
    setSelectedCategories(checkedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = {
      createdBy: 1,
      title,
      description,
      image: imageUrl,
      startTime,
      endTime,
      location,
      categoryIds: selectedCategories,
    };

    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      if (response.ok) {
        const newEvent = await response.json();
        console.log("Event added successfully:", newEvent);
      } else {
        throw new Error("Failed to add the event");
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <Box p={4} maxW="md" mx="auto">
      <form onSubmit={handleSubmit}>
        <FormControl id="title" mb={4} isRequired>
          <FormLabel>Event Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl id="description" mb={4} isRequired>
          <FormLabel>Event Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl id="imageUrl" mb={4} isRequired>
          <FormLabel>URL to Event Image</FormLabel>
          <Input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </FormControl>
        <FormControl id="location" mb={4} isRequired>
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormControl>
        <FormControl id="startTime" mb={4} isRequired>
          <FormLabel>Start Time</FormLabel>
          <Input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </FormControl>
        <FormControl id="endTime" mb={4} isRequired>
          <FormLabel>End Time</FormLabel>
          <Input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </FormControl>
        <FormControl id="categories" mb={4} isRequired>
          <FormLabel>Categories</FormLabel>
          <CheckboxGroup
            value={selectedCategories}
            onChange={handleCategoryChange}
          >
            <Stack spacing={2}>
              {categories.map((category) => (
                <Checkbox
                  key={category.id}
                  value={category.id.toString()}
                  required={false}
                >
                  {category.name}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full" onClose={onClose}>
          Submit
        </Button>
      </form>
    </Box>
  );
};
