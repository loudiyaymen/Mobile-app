import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "../../themes/styles";
import { typography } from "../../themes/typography";
import Card from "../../components/Cards";
import { fetchEventsByTab } from "../../services/eventService";

export default function EventsScreen() {
  const [eventGroups, setEventGroups] = useState({ official: [], student: [] });
  const [activeTab, setActiveTab] = useState("official");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const result = await fetchEventsByTab();
      setEventGroups(result);
      setLoading(false);
    }
    
    loadData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={typography.h3}>Upcoming Events</Text>

      <View style={{ flexDirection: "row", marginVertical: 15 }}>
        <TouchableOpacity 
          onPress={() => setActiveTab("official")}
          style={{ 
            paddingBottom: 5, 
            marginRight: 20, 
            borderBottomWidth: activeTab === "official" ? 2 : 0 
          }}
        >
          <Text style={activeTab === "official" ? { fontWeight: "bold" } : {}}>Official</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setActiveTab("student")}
          style={{ 
            paddingBottom: 5, 
            borderBottomWidth: activeTab === "student" ? 2 : 0 
          }}
        >
          <Text style={activeTab === "student" ? { fontWeight: "bold" } : {}}>Student</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.eventsContainer}
      >
        {eventGroups[activeTab].map((event) => (
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