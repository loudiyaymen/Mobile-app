import React, { useState, useCallback } from "react";
import { View, Text, Pressable, FlatList, BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FileTextIcon, PlusCircleIcon, PlusIcon } from "phosphor-react-native";
import { styles } from "../../themes/styles";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";

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
        <FileTextIcon
          name="EmptyReport"
          size={75}
          color={colors.Secondary_Dark_AC_Green}
          style={{ marginBottom: 12 }}
        />

        <View style={styles.headerContainer}>
          <Text style={typography.h4}>No Reports Yet</Text>
        </View>

        <Pressable
          style={styles.reportButton}
          onPress={() => navigation.navigate("Select Category")}
        >
          <PlusCircleIcon name="add" size={24} color={colors.primary_White} />
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
        data={reports}
        style={{ flexGrow: 0, width: "100%" }}
        contentContainerStyle={{ paddingBottom: 20 }}
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
        style={styles.reportButton}
        onPress={() => navigation.navigate("Select Category")}
      >
        <PlusCircleIcon name="add" size={24} color={colors.primary_White} />
        <Text style={styles.callSecurityButtonText}>Submit new report</Text>
      </Pressable>
    </View>
  );
}
