import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Test from '@/components/ui/test';
import '../global.css';

export default function BaseComponent() {
  return (
    <View className=" flex justify-center items-center h-full">
      <Test />
      <StatusBar style="auto" />
    </View>
  );
}
