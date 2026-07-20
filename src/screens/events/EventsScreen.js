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
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EventsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const [eventGroups, setEventGroups] = useState({
    allEvents: [],
    myEvents: [],
  });
  const [activeTab, setActiveTab] = useState("allEvents");
  const [loading, setLoading] = useState(true);

  const groupedEvents = React.useMemo(() => {
    const rows = eventGroups[activeTab] ?? [];
    const map = new Map();

    rows.forEach((event) => {
      const type = String(event?.eventType || event?.type || "General").trim();
      const key = type.length > 0 ? type : "General";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(event);
    });

    return Array.from(map.entries()).map(([type, events]) => ({
      type,
      events,
    }));
  }, [activeTab, eventGroups]);

  useFocusEffect(
    React.useCallback(() => {
      async function loadData() {
        const result = await fetchEventsByTab();
        setEventGroups({
          allEvents: result?.allEvents ?? result?.official ?? [],
          myEvents: result?.myEvents ?? [],
        });
        setLoading(false);
      }

      loadData();
    }, []),
  );

  useEffect(() => {
    const requestedTab = route?.params?.activeTab;
    if (requestedTab === "allEvents" || requestedTab === "myEvents") {
      setActiveTab(requestedTab);
      navigation.setParams({ activeTab: undefined, refreshKey: undefined });
    }
  }, [route?.params?.activeTab, navigation]);

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
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 108 }}
      >
        {groupedEvents.length === 0 ? (
          <View style={[styles.labelContainer, { marginTop: 30 }]}>
            <Text style={typography.h5}>No events available.</Text>
          </View>
        ) : (
          groupedEvents.map((group) => (
            <View key={group.type}>
              <View style={styles.labelContainer}>
                <Text style={typography.h3}>{group.type}</Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.eventsContainer}
              >
                {group.events.map((event) => (
                  <Pressable
                    key={event.id}
                    onPress={() =>
                      navigation.navigate("Event Details", { event })
                    }
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
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
