// meant for handling fetch requests to the backend for events

// For demo purposes
export const fetchEventsByTab = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts"); // placeholder API for demo purposes
    const data = await response.json();

    const formattedData = data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.body,
      image: `https://picsum.photos/seed/${item.id}/400/200`, // Placeholder image
      userId: item.userId,
    }));

    return {
      official: formattedData.filter((event) => event.userId === 1),
      student: formattedData.filter((event) => event.userId !== 1),
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return { official: [], student: [] };
  }
};

import * as Notifications from "expo-notifications";

export const scheduleEventReminder = async (event) => {
  const eventTime = new Date(event.startTime);
  const triggerTime = new Date(eventTime.getTime() - 60 * 60 * 1000); // 1 hour before

  if (triggerTime > new Date()) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Upcoming Event! 🗓️",
        body: `${event.title} starts in 1 hour.`,
        data: { type: "EVENT_REMINDER", eventId: event.id },
      },
      trigger: triggerTime,
    });
  }
};
