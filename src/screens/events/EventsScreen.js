import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { styles } from "../../themes/styles";
import { typography } from "../../themes/typography";
import Card from "../../components/Cards";
import { fetchEventsByTab } from "../../services/eventService";
import { colors } from "../../themes/color";

export default function EventsScreen() {
  const [eventGroups, setEventGroups] = useState({
    allEvents: [],
    myEvents: [],
  });
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
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 15,
          justifyContent: "center",
        }}
      >
        <Pressable
          onPress={() => setActiveTab("allEvents")}
          style={[
            styles.tabButtonContainer,
            {
              backgroundColor:
                activeTab === "allEvents"
                  ? colors.primary_AC_Green
                  : "transparent",
              borderColor:
                activeTab === "allEvents"
                  ? colors.primary_AC_Green
                  : colors.Secondary_Dark_AC_Green,
            },
          ]}
        >
          <Text
            style={[
              {
                color:
                  activeTab === "allEvents"
                    ? colors.primary_White
                    : colors.Secondary_Dark_AC_Green,
              },
              { font: typography.h5 },
            ]}
          >
            All Events
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab("myEvents")}
          style={[
            styles.tabButtonContainer,
            {
              backgroundColor:
                activeTab === "myEvents"
                  ? colors.primary_AC_Green
                  : "transparent",
              borderColor:
                activeTab === "myEvents"
                  ? colors.primary_AC_Green
                  : colors.Secondary_Dark_AC_Green,
            },
          ]}
        >
          <Text
            style={[
              {
                color:
                  activeTab === "myEvents"
                    ? colors.primary_White
                    : colors.Secondary_Dark_AC_Green,
              },
              { font: typography.h5 },
            ]}
          >
            My Events
          </Text>
        </Pressable>
      </View>
      <ScrollView>
        <View style={styles.labelContainer}>
          <Text style={typography.h3}>Security Events</Text>
        </View>
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
        <View style={styles.labelContainer}>
          <Text style={typography.h3}>Scavenger Hunts</Text>
        </View>
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
        <View style={styles.labelContainer}>
          <Text style={typography.h3}>Academic Events</Text>
        </View>
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
