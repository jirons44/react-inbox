import React from 'react';
import { shallow, mount } from 'enzyme';

import AddNumbers from '../AddNumbers';

let wrapper;
/*
        NOTE:  could not get 'mount' to work...shallow works
        get TypeError: Cannot read property 'rendered' of null
 */

const createAddNumbersComponent = () => {
    wrapper = shallow(<AddNumbers />);
}


describe('AddNumbers Component', () => {
    beforeEach(() => {
        createAddNumbersComponent();
    });

    describe('Renders' , () => {
        it('renders AddNumber Component', () => {
            const component = wrapper.find('AddNumber');

            expect(component.exists()).toBeTruthy();
        });
    });
});
