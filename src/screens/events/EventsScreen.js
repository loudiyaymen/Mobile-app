import { View, Text, ScrollView } from "react-native";
import { styles } from "../../themes/styles";
import Card from "../../components/Cards";
import { typography } from "../../themes/typography";

export default function EventsScreen() {
  const events = [
    {
      id: 1,
      title: "Self-Defense Workshop",
      description: "Learn basic self-defense techniques in this hands-on workshop.",
      image: "https://www.shutterstock.com/image-photo/athlete-red-trunks-delivers-strong-600nw-2646352499.jpg"
    },
    {
      id: 2,
      title: "Cyber Escape Room",
      description: "Solve puzzles and challenges while learning about cybersecurity.",
      image: "https://img.freepik.com/free-photo/html-css-collage-concept-with-hacker_23-2150061984.jpg?semt=ais_rp_50_assets&w=740&q=80"
    },
  ];

  return (
    <View>
      <Text style={typography.h3}>Upcoming Events</Text>
      
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.eventsContainer}>
        {events.map((event) => (
          <Card
            key={event.id}
            image={event.image}
            title={event.title}
            description={event.description}
          />
        ))} 
      </ScrollView>
    </View>
  );
}