import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { styles } from "../../themes/styles";
import { typography } from "../../themes/typography";
import Card from "../../components/Cards";
import { fetchEventsByTab } from "../../services/eventService";
import { colors } from "../../themes/color";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function EventsScreen() {
  const navigation = useNavigation();
  const [eventGroups, setEventGroups] = useState({
    allEvents: [],
    myEvents: [],
  });
  const [activeTab, setActiveTab] = useState("allEvents");
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      async function loadData() {
        const result = await fetchEventsByTab();
        setEventGroups({
          allEvents: result?.allEvents ?? result?.official ?? [],
          myEvents: result?.myEvents ?? result?.student ?? [],
        });
        setLoading(false);
      }

      loadData();
    }, []),
  );

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
              typography.h5,
              {
                color:
                  activeTab === "allEvents"
                    ? colors.primary_White
                    : colors.Secondary_Dark_AC_Green,
              },
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
              typography.h5,
              {
                color:
                  activeTab === "myEvents"
                    ? colors.primary_White
                    : colors.Secondary_Dark_AC_Green,
              },
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
            <Pressable
              key={event.id}
              onPress={() => navigation.navigate("EventDetails", { event })}
            >
              <Card
                key={event.id}
                image={event.image}
                title={event.title}
                description={event.description}
              />
            </Pressable>
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
            <Pressable
              key={event.id}
              onPress={() => navigation.navigate("EventDetails", { event })}
            >
              <Card
                key={event.id}
                image={event.image}
                title={event.title}
                description={event.description}
              />
            </Pressable>
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
            <Pressable
              key={event.id}
              onPress={() => navigation.navigate("EventDetails", { event })}
            >
              <Card
                key={event.id}
                image={event.image}
                title={event.title}
                description={event.description}
              />
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
