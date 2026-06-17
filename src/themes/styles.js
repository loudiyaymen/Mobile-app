import { StyleSheet } from "react-native";
import { colors } from "./color";

const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.primary_White,
  },
  eventsContainer: {
    paddingHorizontal: 5,
    margin: 12,
    gap: 24,
  },
  labelContainer: {
    paddingHorizontal: 5,
    marginHorizontal: 12,
  },
  headerContainer: {
  paddingVertical: 16,
  gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconTextGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
},

  // Home screen styles
  homeTitleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  homeTitle: {
    fontSize: 18,
    color: colors.Primary_Charcoal,
    textAlign: "center",
    fontWeight: "600",
  },

  // FAB styles
  fabContainer: {
    position: "absolute",
    right: 20,
    bottom: 30,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  progressCircleContainer: {
    position: "absolute",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  progressCircleBase: {
    width: 80,
    height: 80,
    transform: [{ rotate: "-90deg" }],
  },
  progressCircleFill: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.SOS_Red,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
  },
  fab: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.SOS_Red,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: colors.Primary_Charcoal,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  fabIcon: {
    color: colors.primary_White,
    fontSize: 16,
    fontWeight: "bold",
  },
  fabPaper: {
    backgroundColor: colors.SOS_Red,
  },

  // Confirm screen styles
  confirmScreenBackground: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  confirmCard: {
    backgroundColor: colors.primary_White,
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    elevation: 4,
    shadowColor: colors.Primary_Charcoal,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  shieldIconContainer: {
    marginBottom: 20,
  },
  shieldIconBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmCardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.Primary_Charcoal,
    marginBottom: 12,
    textAlign: "center",
  },
  confirmCardSubtitle: {
    fontSize: 16,
    color: colors.Primary_Charcoal,
    textAlign: "center",
    marginBottom: 30,
  },
  countdownCircleContainer: {
    marginBottom: 40,
  },
  countdownCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  countdownProgressArc: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: "transparent",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: colors.primary_AC_Green,
    borderLeftColor: colors.primary_AC_Green,
  },
  countdownCircleNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: colors.primary_AC_Green,
    marginBottom: 4,
  },
  countdownCircleLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.Primary_Charcoal,
    letterSpacing: 1,
  },

  // Button container
  buttonContainer: {
    width: "100%",
    gap: 15,
  },
  confirmButtonContainer: {
    width: "100%",
    gap: 12,
  },
  tabButtonContainer: {
    paddingVertical: 6,
    borderRadius: 12,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    flex: 1,
    marginInlineStart: 12,
    marginInlineEnd: 12,
  },

  // Button base styles
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  registerButton: {
    backgroundColor: colors.primary_AC_Green,
  },
  confirmEmergencyButton: {
    backgroundColor: colors.primary_AC_Green,
    width: "100%",
    elevation: 4,
    shadowColor: colors.Primary_Charcoal,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  confirmEmergencyButtonText: {
    color: colors.primary_White,
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButtonNew: {
    backgroundColor: colors.primary_White,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.Light_Grey,
  },
  cancelButtonTextNew: {
    color: colors.Primary_Charcoal,
    fontSize: 16,
    fontWeight: "600",
  },

  // Calling Security screen styles
  callingContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  callingContent: {
    alignItems: "center",
    width: "100%",
  },
  callingIconContainer: {
    marginBottom: 30,
  },
  callingIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.SOS_Red,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: colors.Primary_Charcoal,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  callingTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.Primary_Charcoal,
    marginBottom: 16,
    textAlign: "center",
  },
  callingStatus: {
    fontSize: 16,
    color: colors.Primary_Charcoal,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  phoneNumberContainer: {
    backgroundColor: colors.Light_Grey,
    borderRadius: 12,
    padding: 20,
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  phoneNumberLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
  },
  phoneNumber: {
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  instructionsContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  instructionsText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  callSecurityButton: {
    backgroundColor: colors.primary_AC_Green,
    width: "100%",
    paddingVertical: 18,
    marginBottom: 16,
    elevation: 4,
    shadowColor: colors.Primary_Charcoal,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  callSecurityButtonText: {
    color: colors.primary_White,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  returnHomeButton: {
    backgroundColor: colors.Cloud_Grey,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  returnHomeButtonText: {
    fontSize: 16,
    color: colors.Primary_Charcoal,
    fontWeight: "600",
  },

  reportButton: {
    backgroundColor: colors.primary_AC_Green,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    borderRadius: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.primary_AC_Green,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: colors.primary_White,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputField: {
    flex: 1,
    height: 48,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.Secondary_New_Growth_Green,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 14,
    backgroundColor: colors.primary_White,
  },
  mediaBox: {
    height: 200,
    borderWidth: 1,
    borderColor: colors.primary_AC_Green,
    borderRadius: 12,
    marginBottom: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_White,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  photoPreview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 14,
  },
  dangerBanner: {
    backgroundColor: colors.Secondary_New_Growth_Green,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  listItem: {
    backgroundColor: colors.primary_White,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.Primary_Charcoal,
  },
  itemReference: {
    color: colors.Primary_Charcoal,
    marginTop: 6,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.Secondary_New_Growth_Green,
    borderRadius: 10,
    padding: 12,
    minHeight: 230,
    marginBottom: 14,
    backgroundColor: colors.primary_White,
    textAlignVertical: "top",
    shadowColor: colors.Primary_Charcoal,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  category: {
    backgroundColor: colors.primary_AC_Green,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  lostFound: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginRight: 6,
    backgroundColor: colors.primary_White,
    alignItems: "center",
  },
  categoryButtonText: {
    color: colors.primary_White,
    fontWeight: "bold",
  },
  categoryButtonDescription: {
    color: colors.primary_White,
    paddingTop: 16,
  },

  //section styles
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.Primary_Charcoal,
    marginBottom: 12,
  },
  sectionHeader: {
    marginBottom: 12,
  },

  eventImage: {
    width: "100%",
    height: 220,
  },
  detailsContent: {
    padding: 16,
  },
  media: {
    marginVertical: 20,
    alignItems: "center",
    padding: 42,
    borderWidth: 1,
    borderColor: colors.Secondary_New_Growth_Green,
    borderRadius: 12,
  },

  // Report Incident screen styles
  label: {
    marginTop: 12,
    marginBottom: 4,
  },
});

export { styles };
