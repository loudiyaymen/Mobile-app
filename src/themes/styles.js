import { StyleSheet } from "react-native";
import { colors } from "./color";
import { typography } from "./typography";
import { overlay } from "react-native-paper";


export const scaledFont = (base, fontScale) => base * fontScale;

const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.primary_White,
  },
  bodyContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
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
  navigationCard: {
    backgroundColor: "#EFF4EC",
    margin: 16,
    borderRadius: 12,
    padding: 18,
    shadowColor: colors.Primary_Charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 4,
    gap: 18,
  },
  shadowContainer: {
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: colors.primary_White,
    // ios
    shadowColor: colors.Primary_Charcoal,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    //Android
    elevation: 3,
    overflow: "visible",
  },
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  overlay: {
    backgroundColor: "#EFF4EC",
    paddingTop: 24,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  infoContainer: {
    backgroundColor: colors.primary_White,
    padding: 12,
    marginVertical: 12,
    borderRadius: 12,
    alignItems: "left",
    alignSelf: "stretch",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconTextGroup: {
    flexDirection: "row",
    alignItems: "center",
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
    shadowRadius: 4,
  },
  fabIcon: {
    color: colors.primary_White,
    fontSize: 24,
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
    borderRadius: 12,
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
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
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
  navCategoryButton: {
    backgroundColor: colors.primary_AC_Green,
    paddingVertical: 22,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "left",
    gap: 16,
    width: "100%",
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: colors.Primary_Charcoal,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  navCategoryButtonTextContainer: {
    flex: 1,
    flexDirection: "column",
  },

  // Button base styles
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  closeOverlayButton: {
    backgroundColor: colors.primary_AC_Green,
    color: colors.primary_White,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  registerButton: {
    backgroundColor: colors.primary_AC_Green,
    color: colors.primary_White,
    paddingVertical: 16,
    paddingBottom: 16,
    paddingHorizontal: 32,
    marginBottom: 30,
    borderRadius: 12,
    position: "fixed",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    elevation: 4,
    shadowColor: colors.Primary_Charcoal,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    shadowRadius: 4,
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
    shadowRadius: 4,
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
    marginTop: 8,
    marginBottom: 32,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.primary_AC_Green,
    borderRadius: 12,
    paddingHorizontal: 12,
    minHeight: 56,
    backgroundColor: colors.primary_White,
  },
  fieldsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeline: {
    alignItems: "center",
    marginRight: 12,
    paddingVertical: 14,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.Secondary_New_Growth_Green,
    backgroundColor: "transparent",
  },
  timelineLine: {
    width: 1,
    flex: 1,
    backgroundColor: colors.Secondary_New_Growth_Green,
    marginVertical: 8,
  },
  inputsColumn: {
    flex: 1,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary_White,
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },

  inputField: {
    flex: 1,
    height: 24,
    fontSize: 16,
    fontFamily: "Metropolis-Regular",
    color: colors.Primary_Charcoal,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.Secondary_New_Growth_Green,
    borderRadius: 12,
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
    borderStyle: "dashed",
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
    backgroundColor: `${colors.Warning_background}75`,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,

    borderLeftWidth: 5,
    borderLeftColor: colors.Warning_line,
  },
  listItem: {
    backgroundColor: colors.primary_White,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: colors.Primary_Charcoal,
  },
  itemReference: {
    color: colors.Primary_Charcoal,
    marginTop: 6,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.primary_AC_Green,
    borderRadius: 12,
    padding: 12,
    minHeight: 230,
    backgroundColor: colors.primary_White,
    textAlignVertical: "top",
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    lineHeight: undefined,
    verticalAlign: "middle",
    height: "100%",
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
    borderRadius: 12,
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
  //settings screen styles
  settingsGroupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
  },
  groupBox: {
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  row: {
    flexDirection: "row",        
    justifyContent: "space-between",
    alignItems: "center",        
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,

    marginBottom: 8,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    
  },
  rowText: {
    fontSize: 16,
    fontFamily: "Metropolis-Medium",
  },
  container:        { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingHorizontal: 16, 
    paddingTop: 60 
  },
  backRow:          { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    marginBottom: 24 
  },
  
  subText:          { 
    fontSize: 13, 
    color: '#888', 
    marginTop: 2 
  },
  sectionLabel:     { 
    fontSize: 13, 
    color: '#6B6B6B', 
    textTransform: 'uppercase', 
    letterSpacing: 0.5, 
    marginBottom: 8, 
    paddingLeft: 4 
  },
  previewText:      { 
    textAlign: 'center', 
    color: '#555', 
    marginTop: 8, 
    marginBottom: 4 
  },
  colorRow:         { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    padding: 12, 
    backgroundColor: '#F2F2F7', 
    borderRadius: 12, 
    marginBottom: 10 
  },
  colorRowSelected: { 
    borderWidth: 1.5, 
    borderColor: colors.Primary_Green, 
    backgroundColor: '#F0F7F0' 
  },
  colorSwatch:      { 
    width: 44, 
    height: 44, 
    borderRadius: 10, 
    overflow: 'hidden', 
    flexDirection: 'row' 
  },
  emptyCircle:      { 
    width: 22, 
    height: 22, 
    borderRadius: 11, 
    borderWidth: 1.5, 
    borderColor: '#C7C7CC' 
  },
});


export { styles };
