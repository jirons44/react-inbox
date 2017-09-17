import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as toolbarActions from '../actions/toolbarActions';
import * as messageActions from '../actions/messageActions';
import { getSelectedMessageIds } from '../utilities/messagesHelper';

const Toolbar = ({
         messages,
         actions,
}) => {

    const handleDeleteMessages = () => {
        actions.deleteSelectedMessages(getSelectedMessageIds(messages));
    }

    const handleMessagesSelected = () => {
        actions.bulkMessageSelected(!areAllMessagesSelected());
    }

    const handleMessageReadSelected = () => {
        actions.updateMessageReadUnread(getSelectedMessageIds(messages), true);
    }

    const handleMessageUnreadSelected = () => {
        actions.updateMessageReadUnread(getSelectedMessageIds(messages), false);
    }

    const handleAddLabel = e => {
        actions.addLabel(getSelectedMessageIds(messages), e.target.value);
    }

    const handleRemoveLabel = (e) => {
        actions.removeLabel(getSelectedMessageIds(messages), e.target.value);
    }

    const handleToggleComposedForm = () => {
        actions.toggleComposedForm();
    }

    const numOfUnreadMessages = () => {
        return messages.allIds.reduce( (sum, id) => {
            return sum + (messages.byIds[id].read ? 0:1)}, 0);
    }

    const areAllMessagesSelected = () => {
        return messages.allIds.every(id => messages.byIds[id].selected);
    }

    const areSomeMessagesSelected = () => {
        return messages.allIds.some(id => messages.byIds[id].selected);
    }

    const renderButtonSelectedClassName = () => {
        let className = 'fa fa';

        if (areAllMessagesSelected()) {
            className += '-check'
        } else if (areSomeMessagesSelected()) {
            className += '-minus'
        }

        className += '-square-o';

        return className;
    }

    const selectProps = () => {
        return {
            className: 'form-control label-select',
            disabled:  !areSomeMessagesSelected(),
            value: ''
        }
    }

    const selectOptions = () => {
        return ['dev', 'personal', 'gschool'].map( (item, i)  => <option key={i} value={item}>{item}</option>);
    }

    return (

        <div className="row toolbar">
            <div className="col-md-12">

                <p className="pull-right">
                    <span className="badge badge">{ numOfUnreadMessages() }</span>
                    unread message{numOfUnreadMessages()>1?'s':''}
                </p>

                <a className="btn btn-danger" onClick={ handleToggleComposedForm }>
                    <i className="fa fa-plus"></i>
                </a>

                <button className="btn btn-default"
                        onClick={ handleMessagesSelected }>
                    <i className={renderButtonSelectedClassName()}></i>
                </button>

                <button className="btn btn-default"
                        disabled={ !areSomeMessagesSelected() }
                        onClick={ handleMessageReadSelected }>
                    Mark As Read
                </button>

                <button className="btn btn-default"
                        disabled={ !areSomeMessagesSelected() }
                        onClick={ handleMessageUnreadSelected }>
                    Mark As Unread
                </button>

                <select {...selectProps() } onChange={ handleAddLabel }>
                    <option value="">Apply label</option>
                    { selectOptions() }
                </select>

                <select {...selectProps()} onChange={ handleRemoveLabel }>
                    <option value="">Remove label</option>
                    { selectOptions() }
                </select>

                <button className="btn btn-default"
                        disabled={ !areSomeMessagesSelected() }
                        onClick={ handleDeleteMessages }>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            ...toolbarActions,
            ...messageActions
        }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(Toolbar);
