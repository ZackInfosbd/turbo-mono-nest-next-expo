import * as React from 'react';
import renderer from 'react-test-renderer';

import { Text } from 'react-native';
import Test from '../ui/Test-test';

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
