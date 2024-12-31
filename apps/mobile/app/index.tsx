import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Test from '@/components/test';

export default function BaseComponent() {
  return (
    <View>
      <Test />
      <StatusBar style="auto" />
    </View>
  );
}
