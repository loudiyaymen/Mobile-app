import { StyleSheet } from "react-native";

// Algonquin College Brand Colors
const COLORS = {
  ALGONQUIN_GREEN: '#006341',     
  CHARCOAL: '#212721',           
  WHITE: '#FFFFFF',                 
  NEW_GROWTH_GREEN: '#43B02A',      
  DARK_ALGONQUIN_GREEN: '#003328',  
};

const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  // Home screen styles
  homeTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  homeTitle: {
    fontSize: 18,
    color: COLORS.CHARCOAL,
    textAlign: 'center',
    fontWeight: '600',
  },

  // FAB (Floating Action Button) styles
  fabContainer: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleContainer: {
    position: 'absolute',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleBase: {
    width: 80,
    height: 80,
    transform: [{ rotate: '-90deg' }],
  },
  progressCircleFill: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: COLORS.ALGONQUIN_GREEN,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
  fab: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.ALGONQUIN_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: COLORS.CHARCOAL,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  fabIcon: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Confirm screen styles
  confirmScreenBackground: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  confirmCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.CHARCOAL,
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
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmCardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.CHARCOAL,
    marginBottom: 12,
    textAlign: 'center',
  },
  confirmCardSubtitle: {
    fontSize: 16,
    color: COLORS.CHARCOAL,
    textAlign: 'center',
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
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  countdownProgressArc: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: 'transparent',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.ALGONQUIN_GREEN,
    borderLeftColor: COLORS.ALGONQUIN_GREEN,
  },
  countdownCircleNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.ALGONQUIN_GREEN,
    marginBottom: 4,
  },
  countdownCircleLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.CHARCOAL,
    letterSpacing: 1,
  },

  // Button container
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  confirmButtonContainer: {
    width: '100%',
    gap: 12,
  },

  // Button base styles
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  confirmEmergencyButton: {
    backgroundColor: COLORS.ALGONQUIN_GREEN,
    width: '100%',
    elevation: 4,
    shadowColor: COLORS.CHARCOAL,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  confirmEmergencyButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonNew: {
    backgroundColor: COLORS.WHITE,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonTextNew: {
    color: COLORS.CHARCOAL,
    fontSize: 16,
    fontWeight: '600',
  },

  // Calling Security screen styles
  callingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  callingContent: {
    alignItems: 'center',
    width: '100%',
  },
  callingIconContainer: {
    marginBottom: 30,
  },
  callingIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.ALGONQUIN_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.CHARCOAL,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  callingTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.CHARCOAL,
    marginBottom: 16,
    textAlign: 'center',
  },
  callingStatus: {
    fontSize: 16,
    color: COLORS.CHARCOAL,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  phoneNumberContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  phoneNumberLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '600',
  },
  phoneNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.ALGONQUIN_GREEN,
    letterSpacing: 2,
  },
  instructionsContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  instructionsText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  callSecurityButton: {
    backgroundColor: COLORS.ALGONQUIN_GREEN,
    width: '100%',
    paddingVertical: 18,
    marginBottom: 16,
    elevation: 4,
    shadowColor: COLORS.CHARCOAL,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  callSecurityButtonText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  returnHomeButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnHomeButtonText: {
    fontSize: 16,
    color: COLORS.CHARCOAL,
    fontWeight: '600',
  },
});

export { styles, COLORS };