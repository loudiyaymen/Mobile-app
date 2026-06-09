import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressBar } from "react-native-paper";

import {
  NavigationArrowIcon,
  ArrowLeftIcon,
  BellIcon,
  PaperPlaneTiltIcon,
  CameraIcon,
  QrCodeIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  MapPinIcon,
} from "phosphor-react-native";

import {
  campusGraph,
  findShortestPath,
  generateInstructions,
  locationList,
} from "../../utils/navigationEngine";
import { styles, COLORS } from "../../themes/styles";

export default function MapScreen() {
  const [currentView, setCurrentView] = useState("home");

  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [instructions, setInstructions] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectingFor, setSelectingFor] = useState(null);

  const openDropdown = (type) => {
    setSelectingFor(type);
    setModalVisible(true);
  };

  const selectLocation = (location) => {
    if (selectingFor === "start") setStartPoint(location);
    if (selectingFor === "end") setEndPoint(location);
    setModalVisible(false);
  };

  const handleStartNavigation = () => {
    if (!startPoint || !endPoint) {
      alert("Please select both a start and end point.");
      return;
    }
    const path = findShortestPath(campusGraph, startPoint.id, endPoint.id);
    const generatedInstructions = generateInstructions(campusGraph, path);

    setInstructions(generatedInstructions);
    setCurrentStepIndex(0);
  };

  const resetToHome = () => {
    setCurrentView("home");
    setInstructions([]);
    setCurrentStepIndex(0);
    setStartPoint(null);
    setEndPoint(null);
  };

  const handleNextStep = () => {
    if (currentStepIndex < instructions.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setInstructions([]);
      setCurrentStepIndex(0);
    }
  };

  const getInstructionIcon = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("right"))
      return <ArrowRightIcon size={32} color={COLORS.CHARCOAL} weight="bold" />;
    if (lowerText.includes("left"))
      return <ArrowLeftIcon size={32} color={COLORS.CHARCOAL} weight="bold" />;
    if (lowerText.includes("arrived"))
      return (
        <MapPinIcon size={32} color={COLORS.ALGONQUIN_GREEN} weight="fill" />
      );
    return <ArrowUpIcon size={32} color={COLORS.CHARCOAL} weight="bold" />;
  };

  const renderLocationModal = () => (
    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      <View style={localStyles.modalContainer}>
        <View style={localStyles.modalContent}>
          <Text style={localStyles.modalTitle}>Select Location</Text>
          <FlatList
            data={locationList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={localStyles.modalItem}
                onPress={() => selectLocation(item)}
              >
                <Text style={localStyles.modalItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={localStyles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={localStyles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (currentView === "home") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={localStyles.headerContainer}>
          <View>
            <Text style={localStyles.mainTitle}>Wayfinder</Text>
            <Text style={localStyles.mainSubtitle}>
              Plan your navigation route or scan a QR code
            </Text>
          </View>
          <BellIcon size={28} color={COLORS.ALGONQUIN_GREEN} />
        </View>

        <View style={localStyles.cardsContainer}>
          <TouchableOpacity
            style={[
              localStyles.actionCard,
              { backgroundColor: COLORS.ALGONQUIN_GREEN },
            ]}
            onPress={() => setCurrentView("plan")}
          >
            <PaperPlaneTiltIcon
              size={32}
              color={COLORS.WHITE}
              weight="regular"
            />
            <View style={localStyles.cardTextContainer}>
              <Text style={localStyles.cardTitle}>Plan navigation route</Text>
              <Text style={localStyles.cardSubtitle}>
                Choose your starting point and destination
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[localStyles.actionCard, { backgroundColor: "#5A5A5A" }]}
          >
            <CameraIcon size={32} color={COLORS.WHITE} weight="regular" />
            <View style={localStyles.cardTextContainer}>
              <Text style={localStyles.cardTitle}>Scan QR code</Text>
              <Text style={localStyles.cardSubtitle}>
                Scan a starting point QR code and choose your destination
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={localStyles.helpCard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <QrCodeIcon size={24} color={COLORS.CHARCOAL} />
              <Text style={localStyles.helpCardText}>
                How to identify wayfinder QR codes?
              </Text>
            </View>
            <ArrowRightIcon size={20} color={COLORS.CHARCOAL} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isNavigating = instructions.length > 0;
  const progress = isNavigating
    ? (currentStepIndex + 1) / instructions.length
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={localStyles.planHeader}>
        <TouchableOpacity onPress={resetToHome} style={{ marginRight: 15 }}>
          <ArrowLeftIcon size={28} color={COLORS.CHARCOAL} />
        </TouchableOpacity>
        <View>
          <Text style={localStyles.mainTitle}>Plan Route</Text>
          <Text style={localStyles.mainSubtitle}>
            Choose your starting point and destination
          </Text>
        </View>
      </View>

      <View style={localStyles.formWrapper}>
        <View style={localStyles.routeInputContainer}>
          <View style={localStyles.connectorColumn}>
            <View style={localStyles.circleEmpty} />
            <View style={localStyles.connectorLine} />
            <View style={localStyles.circleEmpty} />
          </View>

          <View style={localStyles.inputsColumn}>
            <TouchableOpacity
              style={localStyles.inputBox}
              onPress={() => openDropdown("start")}
            >
              <Text
                style={
                  startPoint
                    ? localStyles.inputText
                    : localStyles.placeholderText
                }
              >
                {startPoint ? startPoint.name : "Choose starting point"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={localStyles.inputBox}
              onPress={() => openDropdown("end")}
            >
              <Text
                style={
                  endPoint ? localStyles.inputText : localStyles.placeholderText
                }
              >
                {endPoint ? endPoint.name : "Choose destination"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {!isNavigating ? (
        <View style={localStyles.buttonWrapper}>
          <Pressable
            style={({ pressed }) => [
              localStyles.startButton,
              pressed && { backgroundColor: COLORS.DARK_ALGONQUIN_GREEN },
            ]}
            onPress={handleStartNavigation}
          >
            <NavigationArrowIcon
              size={20}
              color={COLORS.WHITE}
              style={{ marginRight: 10 }}
            />
            <Text style={localStyles.startButtonText}>Start navigation</Text>
          </Pressable>
        </View>
      ) : (
        <View style={localStyles.navigationCard}>
          <View style={localStyles.navInstructionRow}>
            {getInstructionIcon(instructions[currentStepIndex])}
            <View style={localStyles.navTextContainer}>
              <Text style={localStyles.instructionMainText}>
                {instructions[currentStepIndex]}
              </Text>
            </View>
          </View>

          <ProgressBar
            progress={progress}
            color={COLORS.ALGONQUIN_GREEN}
            style={localStyles.progressBar}
          />
          <Pressable
            style={({ pressed }) => [
              localStyles.nextButton,
              pressed && { backgroundColor: COLORS.DARK_ALGONQUIN_GREEN },
            ]}
            onPress={handleNextStep}
          >
            <Text style={localStyles.nextButtonText}>
              {currentStepIndex === instructions.length - 1 ? "Finish" : "Next"}
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              localStyles.backButton,
              currentStepIndex === 0 && { borderColor: "#E0E0E0" },
              pressed &&
                currentStepIndex !== 0 && { backgroundColor: "#F0F5F2" },
            ]}
            onPress={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentStepIndex === 0}
          >
            <Text
              style={[
                localStyles.backButtonText,
                currentStepIndex === 0 && { color: "#A0A0A0" },
              ]}
            >
              Back
            </Text>
          </Pressable>
        </View>
      )}

      {renderLocationModal()}
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.CHARCOAL,
  },
  mainSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 15,
  },
  actionCard: {
    flexDirection: "row",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  cardTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  cardTitle: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardSubtitle: {
    color: COLORS.WHITE,
    fontSize: 13,
    opacity: 0.9,
  },
  helpCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
  },
  helpCardText: {
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.CHARCOAL,
    fontWeight: "500",
  },
  formWrapper: {
    backgroundColor: "#F3F6F3",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  routeInputContainer: {
    flexDirection: "row",
  },
  connectorColumn: {
    width: 30,
    alignItems: "center",
    paddingVertical: 15,
  },
  circleEmpty: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS.ALGONQUIN_GREEN,
    backgroundColor: "transparent",
  },
  connectorLine: {
    flex: 1,
    width: 1,
    backgroundColor: COLORS.ALGONQUIN_GREEN,
    marginVertical: 5,
  },
  inputsColumn: {
    flex: 1,
    gap: 15,
  },
  inputBox: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.ALGONQUIN_GREEN,
    padding: 16,
    borderRadius: 10,
  },
  placeholderText: {
    color: "#888",
    fontSize: 15,
  },
  inputText: {
    color: COLORS.CHARCOAL,
    fontSize: 15,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
  },
  startButton: {
    backgroundColor: COLORS.ALGONQUIN_GREEN,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
  },
  startButtonText: {
    color: COLORS.WHITE,
    fontWeight: "bold",
    fontSize: 16,
  },

  navigationCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1.5,
    borderColor: COLORS.ALGONQUIN_GREEN,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: COLORS.CHARCOAL,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navInstructionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  navTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  instructionMainText: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.CHARCOAL,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#E0E0E0",
  },
  nextButton: {
    backgroundColor: COLORS.ALGONQUIN_GREEN,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  nextButtonText: {
    color: COLORS.WHITE,
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.CHARCOAL,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: COLORS.CHARCOAL,
    fontWeight: "bold",
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: COLORS.CHARCOAL,
  },
  modalItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalItemText: {
    fontSize: 16,
    color: COLORS.CHARCOAL,
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    fontWeight: "bold",
    color: COLORS.CHARCOAL,
    fontSize: 16,
  },
});
