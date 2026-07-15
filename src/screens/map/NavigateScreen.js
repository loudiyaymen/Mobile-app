// Used to navigate around campus - will be a simple mockup for now with hardcoded routes and amenities, but can be expanded in the future to integrate with a mapping API and real-time location data

import React from "react";
import { View, Text, Pressable, TextInput, Alert, Modal } from "react-native";
import { styles } from "../../themes/styles";
import { typography } from "../../themes/typography";
import { colors } from "../../themes/color";
import {
  DeviceRotateIcon,
  LightbulbIcon,
  ForkKnifeIcon,
  StorefrontIcon,
  FirstAidIcon,
  ArrowUpIcon,
  ArrowRightIcon,
  StarIcon,
  CheckIcon,
} from "phosphor-react-native";
import { NavigationArrowIcon } from "phosphor-react-native";

export default function NavigateScreen() {
  const [startingPoint, setStartingPoint] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [isNavigating, setIsNavigating] = React.useState(false);
  const [routeSteps, setRouteSteps] = React.useState([]);
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [activeSearchField, setActiveSearchField] = React.useState(null);
  const [showArrivalModal, setShowArrivalModal] = React.useState(false);

  const campusLocations = React.useMemo(
    () => [
      "Student Commons - Building E",
      "Room T127",
      "AC Hub",
      "Room D354",
      "Tim Hortons - Building A",
      "Marketplace Food Court",
      "Health Services",
      "Connections",
      "The Fix",
      "Library - Building C",
    ],
    [],
  );

  const amenitiesList = [
    { id: 1, name: "Marketplace Food Court", icon: ForkKnifeIcon },
    { id: 2, name: "Tim Hortons", icon: ForkKnifeIcon },
    { id: 3, name: "Starbucks", icon: ForkKnifeIcon },
    { id: 4, name: "Connections", icon: StorefrontIcon },
    { id: 5, name: "The Fix", icon: ForkKnifeIcon },
    { id: 6, name: "Health Services", icon: FirstAidIcon },
  ];

  const amenitiesItems = amenitiesList.map((amenity) => (
    <Pressable
      key={amenity.id}
      style={styles.amenityItem}
      onPress={() => handleAmenityPress(amenity)}
    >
      <amenity.icon size={20} color={colors.Primary_Charcoal} weight="bold" />
      <Text style={typography.body}>{amenity.name}</Text>
    </Pressable>
  ));

  const buildRouteSteps = React.useCallback((to) => {
    return [
      {
        id: 1,
        distance: "80m",
        instruction: "Head east on Campus Drive",
        direction: "right",
      },
      {
        id: 2,
        distance: "60m",
        instruction: "Continue straight",
        direction: "up",
      },
      {
        id: 3,
        distance: "10m",
        instruction: "Turn on T building",
        direction: "right",
      },
      {
        id: 4,
        distance: "20m",
        instruction: "Continue straight",
        direction: "up",
      },
      {
        id: 5,
        distance: "1m",
        instruction: `${to} will be on your right`,
        direction: "right",
      },
    ];
  }, []);

  const activeStep = routeSteps[currentStepIndex];
  const progressPercent = routeSteps.length
    ? ((currentStepIndex + 1) / routeSteps.length) * 100
    : 0;
  const activeSearchValue =
    activeSearchField === "start" ? startingPoint : destination;
  const filteredSuggestions = React.useMemo(() => {
    const query = activeSearchValue.trim().toLowerCase();
    if (!activeSearchField || query.length === 0) {
      return [];
    }

    return campusLocations
      .filter((location) => location.toLowerCase().includes(query))
      .slice(0, 5);
  }, [activeSearchField, activeSearchValue, campusLocations]);

  const handleSwap = () => {
    setStartingPoint(destination);
    setDestination(startingPoint);
  };

  const handleSearchChange = (field, value) => {
    if (field === "start") {
      setStartingPoint(value);
    } else {
      setDestination(value);
    }
    setActiveSearchField(field);
  };

  const handleSelectSuggestion = (field, value) => {
    if (field === "start") {
      setStartingPoint(value);
    } else {
      setDestination(value);
    }
    setActiveSearchField(null);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setActiveSearchField(null);
    }, 120);
  };

  const isSameLocation = (from, to) => {
    return from.trim().toLowerCase() === to.trim().toLowerCase();
  };

  const startNavigationSession = (from, to) => {
    const fromValue = from.trim();
    const toValue = to.trim();

    if (!fromValue || !toValue) {
      Alert.alert(
        "Missing route details",
        "Please enter both a starting point and destination.",
      );
      return;
    }

    if (isSameLocation(fromValue, toValue)) {
      Alert.alert(
        "Invalid route",
        "Starting point and destination cannot be the same.",
      );
      return;
    }

    setStartingPoint(fromValue);
    setDestination(toValue);
    const steps = buildRouteSteps(toValue);
    setRouteSteps(steps);
    setCurrentStepIndex(0);
    setIsNavigating(true);
  };

  const handleStartNavigation = () => {
    startNavigationSession(startingPoint, destination);
  };

  const handleNextStep = () => {
    if (currentStepIndex >= routeSteps.length - 1) {
      return;
    }
    setCurrentStepIndex((prev) => prev + 1);
  };

  const handleBackStep = () => {
    if (currentStepIndex === 0) {
      return;
    }
    setCurrentStepIndex((prev) => prev - 1);
  };

  const resetNavigationState = () => {
    setIsNavigating(false);
    setRouteSteps([]);
    setCurrentStepIndex(0);
    setStartingPoint("");
    setDestination("");
    setActiveSearchField(null);
  };

  const handleEndNavigation = () => {
    resetNavigationState();
  };

  const handleFinishNavigation = () => {
    resetNavigationState();
    setShowArrivalModal(true);
  };

  const handleCloseArrivalModal = () => {
    setShowArrivalModal(false);
  };

  const handleAmenityPress = (amenity) => {
    setDestination(amenity.name);
    setActiveSearchField(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationCard}>
        <View>
          <Text style={typography.h4}>Plan route</Text>
          <Text style={[typography.caption, { color: colors.Primary_Charcoal }]}>
            Choose your starting point and destination
          </Text>
        </View>

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
              onFocus={() => setActiveSearchField("start")}
              onBlur={handleSearchBlur}
              onChangeText={(value) => handleSearchChange("start", value)}
            />
            <TextInput
              style={[styles.input, { marginBottom: 0 }]}
              placeholder="Destination"
              placeholderTextColor={colors.Primary_Charcoal}
              value={destination}
              onFocus={() => setActiveSearchField("destination")}
              onBlur={handleSearchBlur}
              onChangeText={(value) => handleSearchChange("destination", value)}
            />

            {filteredSuggestions.length > 0 ? (
              <View style={styles.searchDropdown}>
                {filteredSuggestions.map((location) => (
                  <Pressable
                    key={location}
                    style={styles.searchDropdownItem}
                    onPress={() => handleSelectSuggestion(activeSearchField, location)}
                  >
                    <StarIcon size={16} color={colors.Warning_line} weight="fill" />
                    <Text
                      style={[
                        typography.body,
                        styles.searchDropdownText,
                        { color: colors.Primary_Charcoal },
                      ]}
                    >
                      {location}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>

          {/* Swap Icon */}
          <Pressable onPress={handleSwap}>
            <DeviceRotateIcon
              size={28}
              color={colors.primary_AC_Green}
              weight="bold"
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
            {isNavigating ? "Restart navigation" : "Start navigation"}
          </Text>
        </Pressable>
      </View>

      {isNavigating && activeStep ? (
        <View style={styles.navigationCard}>
          <View style={styles.routeDistanceRow}>
            {activeStep.direction === "up" ? (
              <ArrowUpIcon size={24} color={colors.Primary_Charcoal} weight="bold" />
            ) : (
              <ArrowRightIcon size={24} color={colors.Primary_Charcoal} weight="bold" />
            )}
            <Text style={[typography.h1, styles.routeDistanceText]}>
              {activeStep.distance}
            </Text>
          </View>

          <Text style={[typography.body, styles.routeActionText]}>
            {activeStep.instruction}
          </Text>

          <View style={styles.routeProgressTrack}>
            <View style={[styles.routeProgressFill, { width: `${progressPercent}%` }]} />
          </View>

          <Pressable
            style={[styles.buttonContainer, styles.routeButtonPrimary]}
            onPress={
              currentStepIndex === routeSteps.length - 1
                ? handleFinishNavigation
                : handleNextStep
            }
          >
            <Text style={[typography.secondaryBody, { color: colors.primary_White }]}>
              {currentStepIndex === routeSteps.length - 1 ? "Finish" : "Next"}
            </Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer, styles.routeButtonSecondary]}
            onPress={handleBackStep}
            disabled={currentStepIndex === 0}
          >
            <Text
              style={[
                typography.secondaryBody,
                {
                  color:
                    currentStepIndex === 0
                      ? colors.Light_Grey
                      : colors.Primary_Charcoal,
                },
              ]}
            >
              Back
            </Text>
          </Pressable>

          <Pressable
            style={[styles.buttonContainer, styles.routeButtonEnd]}
            onPress={handleEndNavigation}
          >
            <Text style={[typography.secondaryBody, { color: colors.SOS_Red }]}>
              End navigation
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={[styles.navigationCard, { gap: 12 }]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <LightbulbIcon size={20} weight="bold" />
            <Text style={typography.h4}>Amenities</Text>
          </View>
          <View>{amenitiesItems}</View>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent
        visible={showArrivalModal}
        onRequestClose={() => {}}
      >
        <View style={styles.arrivalModalBackdrop}>
          <View style={styles.arrivalModalScrim} />

          <View style={styles.arrivalModalCard}>
            <View style={styles.arrivalModalIconCircle}>
              <CheckIcon size={54} color={colors.primary_White} weight="bold" />
            </View>

            <Text
              style={[
                typography.h2,
                {
                  color: colors.primary_AC_Green,
                  textAlign: "center",
                },
              ]}
            >
              You have arrived at your destination
            </Text>

            <Pressable
              style={[styles.buttonContainer, styles.arrivalModalButton]}
              onPress={handleCloseArrivalModal}
            >
              <Text style={[typography.h4, { color: colors.primary_White }]}>
                Back to Wayfinder
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
