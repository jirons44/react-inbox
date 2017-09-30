import React from 'react';
import { shallow } from 'enzyme';

import UserStory from '../UserStory';

let wrapper;
let mockFn = jest.fn();

const createUserStoryComponent = updateStatus => {
    wrapper = shallow(<UserStory updateStatus={updateStatus} />)
}

describe('UserStory Component', () => {
    beforeEach(() => {
       createUserStoryComponent(mockFn);
       mockFn.mockClear();
    });

    describe("Renders" , () => {
        it('renders two buttons', () => {
            const component = wrapper.find('button');

            expect(component.length).toEqual(2);
        })

        it('renders first button with deliver title', () => {
            const component = wrapper.find('button').at(0);

            expect(component.text()).toEqual('Deliver');
        })

        it('renders second button with Finish title', () => {
            const component = wrapper.find('button').at(1);

            expect(component.text()).toEqual('Finish');
        })
    })

    describe("button click" , () => {

        it('finish button click executes function with parameter finnished', () => {
            const finishButton = wrapper.find('button').at(1);

            finishButton.simulate('click');

            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(mockFn).toHaveBeenCalledWith('finished');
        })

        it('deliver button click executes function with parameter delivered', () => {
            // had to change button from onChange to onClick
            const finishButton = wrapper.find('button').at(0);
            finishButton.simulate('click');

            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(mockFn).toHaveBeenCalledWith('delivered');
        })

    })


});

/*

 add enzyme to apps create with 'react starter


 yarn add enzyme react-test-renderer jest-enzyme --dev
 echo "import 'jest-enzyme';" >> src/setupTests.js

 */



