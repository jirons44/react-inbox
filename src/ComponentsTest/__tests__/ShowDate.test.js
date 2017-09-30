import React from 'react';
import renderer from 'react-test-renderer';

import ShowDate from '../ShowDate';

test('renders the same way every time', () => {
    const tree = renderer.create( <ShowDate /> ).toJSON();
    expect(tree).toMatchSnapshot();
});