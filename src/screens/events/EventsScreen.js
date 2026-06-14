import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "../../themes/styles";
import { typography } from "../../themes/typography";
import Card from "../../components/Cards";
import { fetchEventsByTab } from "../../services/eventService";
import { colors } from "../../themes/color";

export default function EventsScreen() {
  const [eventGroups, setEventGroups] = useState({ allEvents: [], myEvents: [] });
  const [activeTab, setActiveTab] = useState("allEvents");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const result = await fetchEventsByTab();
      setEventGroups({
        allEvents: result?.allEvents ?? result?.official ?? [],
        myEvents: result?.myEvents ?? result?.student ?? [],
      });
      setLoading(false);
    }
    
    loadData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View>
      <View style={{ flexDirection: "row", marginVertical: 15, justifyContent: "center", gap: 16 }}>
        <TouchableOpacity 
          onPress={() => setActiveTab("allEvents")}
          style={{
                  paddingVertical: 8,
                  paddingHorizontal: 32,
                  borderRadius: 8,
                  justifyContent: "center",
                  backgroundColor: activeTab === "allEvents" ? colors.primary_AC_Green : "transparent",
                  borderColor: activeTab === "allEvents" ? colors.primary_AC_Green : colors.Primary_Charcoal,
                  borderWidth: 1,
          }}
        >
          <Text
            style={[
              { color: activeTab === "allEvents" ? colors.primary_White : colors.Primary_Charcoal },
              activeTab === "allEvents" ? { fontWeight: "bold" } : null,
            ]}
          >
            All Events
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setActiveTab("myEvents")}
          style={{ 
                  paddingVertical: 8,
                  paddingHorizontal: 32,
                  borderRadius: 8,
                  justifyContent: "center",
                  backgroundColor: activeTab === "myEvents" ? colors.primary_AC_Green : "transparent",
                  borderColor: activeTab === "myEvents" ? colors.primary_AC_Green : colors.Primary_Charcoal,
                  borderWidth: 1,
          }}
        >
          <Text
          style={[
              { color: activeTab === "myEvents" ? colors.primary_White : colors.Primary_Charcoal },
              activeTab === "myEvents" ? { fontWeight: "bold" } : null,
            ]}>
            My Events
          </Text>
        </TouchableOpacity>
      </View>
    <ScrollView>
      <Text style={typography.h3}>Security Events</Text>

      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.eventsContainer}
      >
        {(eventGroups[activeTab] ?? []).map((event) => (
          <Card
            key={event.id}
            image={event.image}
            title={event.title}
            description={event.description}
          />
        ))} 
      </ScrollView>

      <Text style={typography.h3}>Scavenger Hunts</Text>

      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.eventsContainer}
      >
        {(eventGroups[activeTab] ?? []).map((event) => (
          <Card
            key={event.id}
            image={event.image}
            title={event.title}
            description={event.description}
          />
        ))} 
      </ScrollView>

      <Text style={typography.h3}>Academic Events</Text>

      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.eventsContainer}
      >
        {(eventGroups[activeTab] ?? []).map((event) => (
          <Card
            key={event.id}
            image={event.image}
            title={event.title}
            description={event.description}
          />
        ))} 
      </ScrollView>
    </ScrollView>
    </View>
  );
}