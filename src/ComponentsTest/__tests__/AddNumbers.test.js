import React from 'react';
import { shallow, mount } from 'enzyme';

import AddNumbers from '../AddNumbers';

let wrapper;
/*
        NOTE:  could not get 'mount' to work...shallow works
        get TypeError: Cannot read property 'rendered' of null
 */

const createAddNumbersComponent = () => {
    wrapper = mount(<AddNumbers/>);
}


describe('AddNumbers Component', () => {
    beforeEach(() => {
        createAddNumbersComponent();
    });

    describe('Renders' , () => {
        it('renders AddNumber component', () => {
            const component = wrapper.find('AddNumber');

            expect(component.exists()).toBeTruthy();
        });

        it('initializes state to empty array, when no numbers passed ', () => {
            expect(wrapper.state('numbers')).toEqual([]);
        });
    });

    describe('events', () => {
       it('execute onAdd even, which adds a number to number state with a new number equal to length ', () => {

           // console.log('$$$$$$$ b 4 ', wrapper.debug())
           const component = wrapper.find('button');
           component.simulate('click');

           expect(wrapper.find('Number').length).toEqual(1);

       })
    });
});
