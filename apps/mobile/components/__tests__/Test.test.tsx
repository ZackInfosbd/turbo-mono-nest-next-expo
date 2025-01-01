import * as React from 'react';
import renderer from 'react-test-renderer';
import Test from '../ui/test';
import { Text } from 'react-native';

it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <Test>
        <Text>Snapshot test for children!</Text>
      </Test>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
