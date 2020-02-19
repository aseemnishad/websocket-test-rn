import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Button = ({ title, onPress, style, disabled }) => {
  return (
    <TouchableOpacity
      testID="button"
      disabled={disabled}
      style={[styles.buttonContainer, style]}
      onPress={onPress}
    >
      <Text testID="title" style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.shape({}),
    disabled: PropTypes.bool.isRequired,
};

Button.defaultProps = {
    style: {}
}

export default Button;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff'
  },
  buttonContainer: {
    flex: 0.45,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#262626',
    borderRadius: 5
  }
});
