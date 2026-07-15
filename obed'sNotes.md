accessible for colorbling peeps theme in theme/color.js
along with setup for dark/light mode already there to use for contexts

  const { theme } = useTheme();
  const typography = useScaledTypography();

CODE REQWUIRED FOR DARK THEME TO WORK--->>>>
import { useTheme } from '../context/ThemeContext';

const { theme} = useTheme();
// background of the screen
<View style={{ backgroundColor: theme.colors.background }}>

// any text
<Text style={{ color: theme.colors.text }}>

// a card/surface
<View style={{ backgroundColor: theme.colors.surface }}>

// primary color (buttons, active states)
<View style={{ backgroundColor: theme.colors.primary }}>

// muted/secondary text
<Text style={{ color: theme.colors.subtext }}>




HOW TO USE SCALING JUST IMPORT,DECLARE then Use simple versio-->

import { useScaledTypography } from '../../themes/ScaledTypo';

//most of the app already uses typography. - so just declare below n it would would with it
  const typography = useScaledTypography();

//ex
<Text style={[styles.rowText, { color: theme.colors.text, fontSize: typography.h2.fontSize }]}>
Campus</Text>



depending on where the file is don't forget ../../ etc or ../