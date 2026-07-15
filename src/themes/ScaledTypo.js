import { useTheme } from '../context/ThemeContext';

export function useScaledTypography() {
  const { fontScale } = useTheme();

  return {

    h1:      { fontSize: 32 * fontScale, lineHeight: 40 * fontScale,   fontFamily: 'Metropolis-Bold' },
    h2:      { fontSize: 24 * fontScale, lineHeight: 31.2 * fontScale, fontFamily: 'Metropolis-SemiBold' },
    h3:      { fontSize: 20 * fontScale, lineHeight: 27 * fontScale,   fontFamily: 'Metropolis-SemiBold' },
    h4:      { fontSize: 18 * fontScale, lineHeight: 25.2 * fontScale, fontFamily: 'Metropolis-SemiBold' },
    h5:      { fontSize: 16 * fontScale, lineHeight: 22.4 * fontScale, fontFamily: 'Metropolis-Medium' },
    body:    { fontSize: 16 * fontScale, lineHeight: 24 * fontScale,   fontFamily: 'Metropolis-Regular' },
    caption: { fontSize: 12 * fontScale, lineHeight: 15.6 * fontScale, fontFamily: 'Metropolis-Regular' },


    secondaryH3:      { fontSize: 20 * fontScale, lineHeight: 27 * fontScale,   fontFamily: 'Arial', fontWeight: '700' },
    secondaryH4:      { fontSize: 18 * fontScale, lineHeight: 25.2 * fontScale, fontFamily: 'Arial', fontWeight: '600' },
    secondaryH5:      { fontSize: 16 * fontScale, lineHeight: 22.4 * fontScale, fontFamily: 'Arial', fontWeight: '600' },
    secondaryBody:    { fontSize: 16 * fontScale, lineHeight: 24 * fontScale,   fontFamily: 'Arial', fontWeight: '400' },
    secondaryCaption: { fontSize: 12 * fontScale, lineHeight: 16.8 * fontScale, fontFamily: 'Arial', fontWeight: '400' },
  };
}