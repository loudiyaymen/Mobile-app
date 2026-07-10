import React from "react";
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { styles } from "../../themes/styles";
import { typography } from "../../themes/typography";
import { colors } from "../../themes/color";
import {
  DeviceRotateIcon,
  LightbulbIcon,
  ForkKnifeIcon,
  StorefrontIcon,
  FirstAidIcon,
} from "phosphor-react-native";
import { NavigationArrowIcon } from "phosphor-react-native";

export default function NavigateScreen() {
  const [startingPoint, setStartingPoint] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [isSwapped, setIsSwapped] = React.useState(false);

  const amenitiesList = [
    { id: 1, name: "Marketplace Food Court", icon: ForkKnifeIcon },
    { id: 2, name: "Tim Hortons", icon: ForkKnifeIcon },
    { id: 3, name: "Starbucks", icon: ForkKnifeIcon },
    { id: 4, name: "Connections", icon: StorefrontIcon },
    { id: 5, name: "The Fix", icon: ForkKnifeIcon },
    { id: 6, name: "Health Services", icon: FirstAidIcon },
  ];

  const amenitiesItems = amenitiesList.map((amenity) => (
    <Pressable key={amenity.id} style={styles.amenityItem} onPress={() => handleAmenityPress(amenity)}>
      <amenity.icon size={20} color={colors.Primary_Charcoal} weight="bold" />
      <Text style={typography.body}>{amenity.name}</Text>
    </Pressable>
  ));

  const handleSwap = () => {
    setStartingPoint(destination);
    setDestination(startingPoint);
    setIsSwapped(!isSwapped);
  };

  const handleStartNavigation = () => {
    // Implement navigation logic here, e.g., integrate with a mapping API
    Alert.alert(
      "Starting navigation",
      `From: ${startingPoint}\nTo: ${destination}`,
    );
  };

  const handleAmenityPress = (amenity) => {
    // Implement amenity details logic here, e.g., show a modal with more info
    Alert.alert("Amenity Details", `Name: ${amenity.name}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationCard}>
        <View style={styles.fieldsRow}>
          {/* Dots and line */}
          <View style={styles.timeline}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineLine} />
            <View style={styles.timelineDot} />
          </View>

          {/* Inputs */}
          <View style={styles.inputsColumn}>
            <TextInput
              style={styles.input}
              placeholder="Starting Point"
              placeholderTextColor={colors.Primary_Charcoal}
              value={startingPoint}
              onChangeText={setStartingPoint}
            />
            <TextInput
              style={[styles.input, { marginBottom: 0 }]}
              placeholder="Destination"
              placeholderTextColor={colors.Primary_Charcoal}
              value={destination}
              onChangeText={setDestination}
            />
          </View>

          {/* Swap Icon */}
          <Pressable>
            <DeviceRotateIcon
              size={28}
              color={colors.primary_AC_Green}
              weight="bold"
              onPress={handleSwap}
            />
          </Pressable>
        </View>

        {/* Button */}
        <Pressable
          style={[
            styles.buttonContainer,
            {
              backgroundColor: colors.primary_AC_Green,
              justifyContent: "center",
            },
          ]}
          onPress={handleStartNavigation}
        >
          <NavigationArrowIcon
            size={26}
            color={colors.primary_White}
            weight="bold"
          />
          <Text
            style={[typography.secondaryBody, { color: colors.primary_White }]}
          >
            Start navigation
          </Text>
        </Pressable>
      </View>

      <View style={[styles.navigationCard, { gap: 12 }]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <LightbulbIcon size={20} weight="bold" />
          <Text style={typography.h4}>Amenities</Text>
        </View>
        <View>{amenitiesItems}</View>
      </View>
    </View>
  );
}
