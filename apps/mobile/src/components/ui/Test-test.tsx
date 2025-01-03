import { PropsWithChildren } from 'react';
import { View } from 'react-native';

export default function Test({ children }: PropsWithChildren) {
  return <View>{children}</View>;
}
