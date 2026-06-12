import React, { useState, useCallback } from "react";
import { View, Text, Pressable, FlatList, BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { styles } from "../../themes/styles";
import { colors } from "../../themes/color";

export default function ReportHomeScreen() {
  const navigation = useNavigation();
  const [reports, setReports] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );

  const loadReports = async () => {
    const stored = await AsyncStorage.getItem("reports");
    if (stored) {
      setReports(JSON.parse(stored));
    } else {
      setReports([]);
    }
  };

  // reload whenever screen is opened
  useFocusEffect(
    React.useCallback(() => {
      loadReports();
    }, []),
  );

  if (reports.length === 0) {
    return (
      <View
        style={[
          styles.container,
          {
            padding: 16,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Ionicons
          name="document-text-outline"
          size={160}
          color={colors.Grey}
          style={{ marginBottom: 20 }}
        />

        <Text style={styles.confirmCardTitle}>No Reports Yet</Text>

        <Text style={[styles.instructionsText, { marginBottom: 24 }]}>
          Submit an incident report to help keep our campus safe
        </Text>

        <Pressable
          style={styles.reportButton}
          onPress={() => navigation.navigate("Select Category")}
        >
          <Ionicons name="add" size={22} color={colors.primary_White} />
          <Text style={styles.callSecurityButtonText}>Submit new report</Text>
        </Pressable>
      </View>
    );
  }
  // LIST VIEW
  return (
    <View style={[styles.container, { padding: 16, alignItems: "center" }]}>
      <Pressable
        style={styles.reportButton}
        onPress={() => navigation.navigate("Select Category")}
      >
        <Ionicons name="add" size={22} color={colors.primary_White} />
        <Text style={styles.callSecurityButtonText}>Submit new report</Text>
      </Pressable>
      <FlatList
        style={[styles.container, { marginTop: 16, width: "100%" }]}
        data={reports}
        keyExtractor={(item) => `${item.id}-${item.type}-${item.createdAt}`}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.type}</Text>

            {item.location && <Text>{item.location}</Text>}

            <Text style={styles.itemReference}>
              {new Date(item.createdAt).toLocaleDateString()} •{" "}
              {new Date(item.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>

            <Text style={styles.itemReference}>Ref: {item.referenceCode}</Text>
          </View>
        )}
      />
    </View>
  );
}
