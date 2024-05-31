// Core
import React, { useState, useEffect } from "react";

// Hooks
import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";

// Components
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  CheckboxGroup,
  Checkbox,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { EventModal } from "../components/ui";

export const EventPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { events, updateEvent, categories } = useEvents();
  const event = events.find((e) => e.id.toString() === eventId);
  const [editFormData, setEditFormData] = useState({ ...event });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    if (event) {
      setEditFormData({
        ...event,
        categoryIds: event.categoryIds.map((id) => id.toString()), // Ensure the category IDs are strings for the CheckboxGroup
      });
    }
  }, [event]);

  if (!event) return <Box>No such event found.</Box>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (nextValue) => {
    setEditFormData((prev) => ({ ...prev, categoryIds: nextValue }));
  };

  const handleSubmit = async () => {
    try {
      await updateEvent({
        ...editFormData,
        categoryIds: editFormData.categoryIds.map(Number), // Convert category IDs back to numbers if necessary
      });
      onClose();
      toast({
        title: "Event Updated",
        description: "The event details have been updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update the event details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await fetch(`http://localhost:3000/events/${eventId}`, {
          method: "DELETE",
        });
        toast({
          title: "Event Deleted",
          description: "The event has been successfully deleted.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
        window.location.reload();
      } catch (error) {
        toast({
          title: "Deletion Failed",
          description: error.message || "Failed to delete the event.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box p={5}>
      <Heading mb={2}>{editFormData.title}</Heading>
      <Image src={editFormData.image} alt={editFormData.title} mb={2} />
      <Text fontSize="xl" mb={2}>
        {editFormData.description}
      </Text>
      <Text mb={1}>
        Start Time: {new Date(editFormData.startTime).toLocaleString()}
      </Text>
      <Text mb={1}>
        End Time: {new Date(editFormData.endTime).toLocaleString()}
      </Text>
      <Button colorScheme="blue" mr={3} onClick={onOpen}>
        Edit
      </Button>
      <Button colorScheme="red" onClick={handleDelete}>
        Delete
      </Button>

      <EventModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={editFormData.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={editFormData.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="image"
                value={editFormData.image}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="datetime-local"
                name="startTime"
                value={editFormData.startTime}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
                name="endTime"
                value={editFormData.endTime}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Location</FormLabel>
              <Input
                name="location"
                value={editFormData.location}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Categories</FormLabel>
              <CheckboxGroup
                colorScheme="green"
                value={editFormData.categoryIds}
                onChange={handleCategoryChange}
              >
                <VStack alignItems="flex-start">
                  {categories.map((category) => (
                    <Checkbox key={category.id} value={category.id.toString()}>
                      {category.name}
                    </Checkbox>
                  ))}
                </VStack>
              </CheckboxGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </EventModal>
    </Box>
  );
};
