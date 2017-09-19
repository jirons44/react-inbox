import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Switch, Route, withRouter } from 'react-router-dom';

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

    //todo: look at selector  or for messageHelper
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

    if (!messages.allIds.length) {
        return (
            <div>Loading...</div>)
    }
    return (

        <div className="row toolbar">
            <div className="col-md-12">

                <p className="pull-right">
                    <span className="badge badge">{ numOfUnreadMessages() }</span>
                    unread message{numOfUnreadMessages()>1?'s':''}
                </p>

                <Switch>
                    <Route path="/compose" exact render={() => (
                        <Link to="/" className="btn btn-danger">
                            <i className='fa fa-minus'></i> </Link>

                            )}/>
                    <Route render={() => (
                        <Link to="/compose" className="btn btn-danger">
                            <i className='fa fa-plus'></i> </Link>

                    )}/>

                </Switch>

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

const mapStateToProps = state => ({
    messages: state.messages
})

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            ...messageActions
        }, dispatch)
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar));
