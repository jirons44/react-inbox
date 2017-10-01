import React from 'react';
import renderer from 'react-test-renderer';
import { connect } from 'react-redux';


import Messages from '../Messages';
import MessagesApi from '../../api/mockMessagesApi'


test('renders the same way every time', () => {
    // const myMessages = MessagesApi.getAllMessages();
    //
    // const tree = renderer.create(<Messages messages={[]} />).toJSON();
    //
    // expect(tree).toMatchSnapshot();
});