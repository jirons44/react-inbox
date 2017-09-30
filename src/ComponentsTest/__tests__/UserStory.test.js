import React from 'react';
// import { expect } from 'chai';
import { shallow } from 'enzyme';

import UserStory from '../UserStory';

describe('UserStory Component', () => {

    it('it renders without crashing', () => {
        shallow(<UserStory/>);
    });
});



