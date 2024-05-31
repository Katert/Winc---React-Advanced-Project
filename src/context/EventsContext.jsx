// Core
import React, { createContext, useState, useEffect, useContext } from "react";

const EventsContext = createContext();

export const useEvents = () => useContext(EventsContext);

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState({});
  const [categoryNames, setCategoryNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching events and categories
  useEffect(() => {
    const fetchEventsAndCategories = async () => {
      try {
        const eventsFetch = fetch("http://localhost:3000/events");
        const categoriesFetch = fetch("http://localhost:3000/categories");

        const [eventsResponse, categoriesResponse] = await Promise.all([
          eventsFetch,
          categoriesFetch,
        ]);

        const eventsData = await eventsResponse.json();
        const categoriesData = await categoriesResponse.json();

        const categoryMap = categoriesData.reduce((map, category) => {
          map[category.id] = category.name;
          return map;
        }, {});

        setCategories(categoriesData);
        setCategoryNames(categoryMap);
        setEvents(eventsData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventsAndCategories();
  }, []);

  // Function to update an event in the local state and on the server
  const updateEvent = async (updatedEvent) => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/${updatedEvent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        }
      );
      if (response.ok) {
        const index = events.findIndex((event) => event.id === updatedEvent.id);
        const newEvents = [...events];
        newEvents[index] = updatedEvent;
        setEvents(newEvents);
      } else {
        throw new Error("Failed to update the event on the server");
      }
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        categories,
        categoryNames,
        isLoading,
        error,
        updateEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
