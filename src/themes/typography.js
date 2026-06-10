import { StyleSheet } from 'react-native';

export const typography = StyleSheet.create({
  // Primary Styles (Metropolis)
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
    color: '#000',
  },
  h2: {
    fontSize: 24,
    lineHeight: 31.2,
    fontWeight: '700',
    color: '#000',
  },
  h3: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '600',
    color: '#000',
  },
  h4: {
    fontSize: 18,
    lineHeight: 25.2,
    fontWeight: '600',
    color: '#000',
  },
  h5: {
    fontSize: 16,
    lineHeight: 22.4,
    fontWeight: '600',
    color: '#000',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: '#444',
  },
  caption: {
    fontSize: 12,
    lineHeight: 15.6,
    fontWeight: '400',
    color: '#666',
  },

  // Secondary Styles (Arial)
  secondaryH3: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: '500',
    color: '#666',
  },
  secondaryBody: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: '#666',
  },
  secondaryCaption: {
    fontSize: 12,
    lineHeight: 16.8,
    fontWeight: '400',
    color: '#888',
  }
});