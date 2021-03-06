import React from 'react';
import renderer from 'react-test-renderer';

import Messages  from '../Messages';
import MessagesApi from '../../api/mockMessagesApi'
import { getAllIds, getByIds } from '../../utilities/messagesHelper';

const emptyMessages = {
    allIds: [],
    byIds: {}
};

const testMessages = {
    allIds: getAllIds(MessagesApi.getAllMessages()),
    byIds: getByIds(MessagesApi.getAllMessages())
};


test('renders the same way every time', () => {

    //TODO: passing in messages gives invariant messatge
    const tree = renderer.create(
        <Messages.WrappedComponent messages={emptyMessages}/>)
        .toJSON();

    expect(tree).toMatchSnapshot();
});
