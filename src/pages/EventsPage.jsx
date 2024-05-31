// Core
import React, { useState } from "react";

// Components
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { EventCard } from "../components/ui";
import { EventModal } from "../components/ui";

// Forms
import { AddEventForm } from "../forms";

// Hooks
import { useEvents } from "../context/EventsContext";
import { useDisclosure } from "@chakra-ui/react";

export const EventsPage = () => {
  const { events, categories, categoryNames, isLoading, error } = useEvents();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Filter events based on search query and selected categories
  const filteredEvents = events.filter((event) => {
    const searchMatch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch =
      selectedCategories.length === 0 || // Show all if no category is selected
      event.categoryIds.some((id) =>
        selectedCategories.includes(id.toString())
      );
    return searchMatch && categoryMatch;
  });

  const handleCategoryChange = (nextValue) => {
    setSelectedCategories(nextValue);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <EventModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle="Add new event"
        hideButtons={true}
      >
        <AddEventForm onClose={onClose} />
      </EventModal>
      <Box overflow="scroll" pr={5}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>List of Events</Heading>
          <Button colorScheme="green" onClick={onOpen}>
            + Add Event
          </Button>
        </HStack>
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mb={4}
        />
        <CheckboxGroup
          value={selectedCategories}
          onChange={handleCategoryChange}
        >
          <HStack spacing={3} wrap="wrap" mb={4}>
            {categories.map((category) => (
              <Checkbox key={category.id} value={category.id.toString()}>
                {category.name}
              </Checkbox>
            ))}
          </HStack>
        </CheckboxGroup>
        {isLoading ? (
          <Text>Loading all events, please wait.</Text>
        ) : (
          <Stack spacing={4}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  description={event.description}
                  image={event.image}
                  categoryNames={event.categoryIds.map(
                    (id) => categoryNames[id]
                  )}
                  location={event.location}
                  startTime={event.startTime}
                  endTime={event.endTime}
                />
              ))
            ) : (
              <Text>No events found.</Text>
            )}
          </Stack>
        )}
      </Box>
    </>
  );
};
