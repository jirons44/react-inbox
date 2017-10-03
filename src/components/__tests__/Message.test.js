import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { connect } from 'react-redux';
import { Link, Route, MemoryRouter } from 'react-router-dom';
import ReactDOM from 'react-dom'


import Message, { mapDispatchToProps } from '../Message';

let wrapper;
let mockCheckboxChangedFn = jest.fn();


const aMessage = {
    selected: false,
    read: true,
    id: 1,
    subject: "a subject",
    starred: false,
    labels: ["personal"]
}

const mockActions = {
    toggelMessageSelected: jest.fn(),
    updateMessageStarred: jest.fn()
}

const createMessageComponent = (message, actions) => {
    wrapper = shallow(
         <Message.WrappedComponent message={message} actions={actions} />
    );
}

describe('Message Component', () => {
    beforeEach(() => {
       createMessageComponent(aMessage, mockActions);
    });

    describe("Render" , () => {

        it('renders Message component', () => {
            expect(wrapper.exists()).toBeTruthy();
        });

        it('renders checkbox input with props', () => {
            const component = wrapper.find('input');

            expect(component.exists()).toBeTruthy();
            expect(component.prop('type')).toEqual('checkbox');
            expect(component.prop('name')).toEqual('messageChecked');
            expect(typeof(component.prop('onChange'))).toEqual('function');

        });

        it('renders italic "i" tag with props', () => {
            const component = wrapper.find('i');

            expect(component.exists()).toBeTruthy();
            expect(typeof(component.prop('onClick'))).toEqual('function');
        });

        describe('renders label', () => {

            it('renders label personal, when message has label personal', () => {
                const component = wrapper.find('span');

                expect(component.exists()).toBeTruthy();
                expect(component.prop('className')).toEqual('label label-warning');
                expect(component.text()).toEqual('personal');
            });

            it('renders labels abc and 123, when message has labels abc 123', () => {
                wrapper.setProps({message:{...aMessage, labels:["abc","123"]}});

                const component = wrapper.find('span');

                expect(component.at(0).text()).toEqual('abc');
                expect(component.at(1).text()).toEqual('123');
            });

            it('renders no labels, when message has no labels', () => {
                wrapper.setProps({message:{...aMessage, labels:[]}});

                const component = wrapper.find('span');

                expect(component.exists()).toBeFalsy();
            });

        });

        it('renders Link with props', () => {
            const component = wrapper.find('Link');

            expect(component.exists()).toBeTruthy();
            expect(typeof(component.prop('onClick'))).toEqual('function');
        });

        it('renders Route with props', () => {
            const component = wrapper.find('Route');

            expect(component.exists()).toBeTruthy();
        });

        it('does not render MessageBody Route path default', () => {
            const component = wrapper.find('MessageBody');

            expect(component.exists()).toBeFalsy();
        });

        it('renders MessageBody when Route path /messages/1', () => {
            //TODO: come on...get this test to work
            // const component = ReactDOM.render(
            //         <MemoryRouter initialEntries={[ '/messages/1' ]}>
            //             <Message message={aMessage} actions={mockActions} />
            //         </MemoryRouter>
            // , div);
            // createMessageComponent(aMessage, mockActions);

            // const component = renderer.create(
            //     <MemoryRouter initialEntries={[ '/messages/1' ]}>
            //         <Message.WrappedComponent message={aMessage} actions={mockActions} />
            //     </MemoryRouter>
            // );

//            console.log('@@@@', component);
        });

        describe('renders Classnames when the message is selected vs unselected', () => {

            it('className is "row message read selected", when message selected', () => {
                wrapper.setProps({message:{...aMessage, selected: true}});

                const component = wrapper.find('div').at(1);

                expect(component.prop('className')).toEqual('row message read selected');
            });

            it('renders className is "row message read", when message not selected', () => {
                wrapper.setProps({message:{...aMessage, selected: false}});

                const component = wrapper.find('div').at(1);

                expect(component.prop('className')).toEqual('row message read');
            });
        });


        describe('renders Classnames when the message is starred vs unstarred', () => {
            it('className is "star fa fa-star", when message starred true', () => {
                wrapper.setProps({message:{...aMessage, starred: true}});

                const component = wrapper.find('i');

                expect(component.prop('className')).toEqual('star fa fa-star');
            });

            it('className is "star fa fa-star-o", when message starred not true', () => {
                wrapper.setProps({message:{...aMessage, starred: false}});

                const component = wrapper.find('i');

                expect(component.prop('className')).toEqual('star fa fa-star-o');
            });

            it('className is "star fa fa-star-o", when message does not have a starred propery', () => {
                const noStarredMessage = {
                    selected: false,
                    read: true,
                    id: 1,
                    subject: "a subject",
                    labels: ["personal"]
                }

                wrapper.setProps({message:{noStarredMessage}});

                const component = wrapper.find('i');

                expect(component.prop('className')).toEqual('star fa fa-star-o');
            });

        });

        describe('renders Classnames when the message is read vs unread', () => {
            it('className is "row message read", when message read', () => {
                wrapper.setProps({message:{...aMessage, read: true}});

                const component = wrapper.find('div').at(1);

                expect(component.prop('className')).toEqual('row message read');
            });

            it('className is "row message unread", when message not read', () => {
                wrapper.setProps({message:{...aMessage, read: false}});

                const component = wrapper.find('div').at(1);

                expect(component.prop('className')).toEqual('row message unread');
            });

        })

    });

    describe("events" , () => {

        it('checkbox button checked executes function handleMessageSelected', () => {
            const checkBox = wrapper.find('input');

            checkBox.simulate('change');

            expect(mockActions.toggelMessageSelected).toHaveBeenCalledTimes(1);
        });

        it('starred executes function handleStarredClicked', () => {
            const checkBox = wrapper.find('i');

            checkBox.simulate('click');

            expect(mockActions.updateMessageStarred).toHaveBeenCalledTimes(1);
        })
    });

    describe('connect', () => {
       it('mapDispatchToProps', () => {
           const dispatch = jest.fn();

           const result = mapDispatchToProps(dispatch);

           result.actions.toggelMessageSelected();
           result.actions.updateMessageStarred();

           expect(dispatch.mock.calls.length).toBe(2);
       })
    });

});



/*

 add enzyme to apps create with 'react starter


 yarn add enzyme react-test-renderer jest-enzyme --dev
 echo "import 'jest-enzyme';" >> src/setupTests.js

 */