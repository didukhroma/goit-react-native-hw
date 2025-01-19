import { TouchableOpacity, StyleSheet } from 'react-native';

import { colors } from '../styles/colors';

const StyledButton = ({ children, onPress, buttonStyles }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyles]}>
      {children}
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.orange,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 100,
  },
});
