import React from 'react'
import Button from "../common/Button";
import { render } from 'react-native-testing-library';
import { TouchableOpacity } from 'react-native';

test('renders Hello World button', () => {
    const { getByTestId } = render(<Button title="Hello World" />);
    const component = getByTestId('title');
    expect(component.props.children).toBe('Hello World');
    
})

test('renders Random Number button ', () => {
    const { getByTestId } = render(<Button title="Random Number" />);
    const component = getByTestId('title');
    expect(component.props.children).toBe('Random Number'); 
})

test('emiting event ', () => {
    const fn = jest.fn();
    const { getByTestId, update, rerender } = render(<Button onPress={fn} />);
    const button = getByTestId('button');
    button.props.onPress();
    button.props.onPress();
    expect(fn).toHaveBeenCalledTimes(2);
})

  