import React, { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { styles, COLORS } from "../../themes/styles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReportHomeScreen() {
  const navigation = useNavigation();
  const [reports, setReports] = useState([]);

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
      <SafeAreaView style={styles.container}>
        <Ionicons
          name="document-text-outline"
          size={180}
          color={COLORS.GREY}
          style={{ marginBottom: 20 }}
        />

        <Text style={styles.confirmCardTitle}>No Reports Yet</Text>

        <Text style={styles.instructionsText}>
          Submit an incident report to help keep our campus safe
        </Text>

        <Pressable
          style={styles.reportButton}
          onPress={() => navigation.navigate("Select Category")}
        >
          <Ionicons name="add" size={22} color={COLORS.WHITE} />
          <Text style={styles.callSecurityButtonText}>Submit new report</Text>
        </Pressable>
      </SafeAreaView>
    );
  }
  // LIST VIEW
  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingBottom: 32, paddingHorizontal: 16, alignItems: "center" },
      ]}
    >
      <Pressable
        style={styles.reportButton}
        onPress={() => navigation.navigate("Select Category")}
      >
        <Ionicons name="add" size={22} color={COLORS.WHITE} />
        <Text style={styles.callSecurityButtonText}>Submit new report</Text>
      </Pressable>
      <FlatList
        style={[
          styles.container,
          { marginTop: 8, padding: 2, width: "90%", height: "100%" },
        ]}
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

      <Pressable
        style={[styles.button, { marginTop: 10 }]}
        onPress={() => navigation.navigate("ReportCategory")}
      >
        <Text style={{ color: COLORS.WHITE }}>Submit new report</Text>
      </Pressable>
    </SafeAreaView>
  );
}
