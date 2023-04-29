import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

const LetterAnimation = ({ text,style }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (currentIndex >= text.length) return;

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 30,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        animatedValue.setValue(0);
      }
    });
  }, [currentIndex]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [text]);

  const currentText = text.slice(0, currentIndex);

  return (
    <View>
      <Text style={style}>
        {currentText}
        <Animated.Text
          style={{
            opacity: animatedValue,
          }}
        >
          {text[currentIndex]}
        </Animated.Text>
      </Text>
    </View>
  );
};

export default LetterAnimation;
