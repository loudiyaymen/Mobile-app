import { StyleSheet } from "react-native";
import { colors } from "./color";

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.primary_White,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignSelf: 'flex-start',
  },
  innerContainer: {
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: colors.primary_White,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 10,
    paddingBottom: 35,
    alignItems: 'left',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.Primary_Charcoal,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: colors.Dark_Grey,
    lineHeight: 22,
  },
});