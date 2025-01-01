import React, { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

export default function Test({ children }: PropsWithChildren) {
  return (
    <View>
      <Text className=" text-red-200 font-bold text-xl p-2">
        there is something needs to be here. Or not!
      </Text>
      {children}
    </View>
  );
}
