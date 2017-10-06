import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Switch, Route, withRouter } from 'react-router-dom';

import * as messageActions from '../actions/messageActions';
import { getSelectedMessageIds,
        numOfUnreadMessages,
        areAllMessagesSelected,
        areSomeMessagesSelected } from '../utilities/messagesHelper';

const Toolbar = ({
         messages,
         actions,
}) => {

    const renderButtonSelectedClassName = () => {
        let className = 'fa fa';

        if (areAllMessagesSelected(messages)) {
            className += '-check'
        } else if (areSomeMessagesSelected(messages)) {
            className += '-minus'
        }

        className += '-square-o';

        return className;
    }

    const selectProps = () => {
        return {
            className: 'form-control label-select',
            disabled:  !areSomeMessagesSelected(messages),
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
                    <span className="badge badge">{ numOfUnreadMessages(messages) }</span>
                    unread message{ numOfUnreadMessages(messages)>1?'s':''}
                </p>

                <Switch>
                    <Route path="/compose" exact render={() => (
                        <Link to="/" className="btn btn-danger">
                            <i className='fa fa-minus'></i>
                        </Link>
                    )}/>
                    <Route render={() => (
                        <Link to="/compose" className="btn btn-danger">
                            <i className='fa fa-plus'></i>
                        </Link>
                    )}/>
                </Switch>

                <button className="btn btn-default"
                        onClick={ () => actions.bulkMessageSelected(!areAllMessagesSelected(messages)) }>
                    <i className={renderButtonSelectedClassName()}></i>
                </button>

                <button className="btn btn-default"
                        disabled={ !areSomeMessagesSelected(messages) }
                        onClick={ () => actions.updateMessageReadUnread(getSelectedMessageIds(messages), true) }>
                    Mark As Read
                </button>

                <button className="btn btn-default"
                        disabled={ !areSomeMessagesSelected(messages) }
                        onClick={ () => actions.updateMessageReadUnread(getSelectedMessageIds(messages), false) }>
                    Mark As Unread
                </button>

                <select {...selectProps() }
                        onChange={ (e) => actions.addLabel(getSelectedMessageIds(messages), e.target.value) }>
                    <option value="">Apply label</option>
                    { selectOptions() }
                </select>

                <select {...selectProps()}
                        onChange={ (e) => actions.removeLabel(getSelectedMessageIds(messages), e.target.value) }>
                    <option value="">Remove label</option>
                    { selectOptions() }
                </select>

                <button className="btn btn-default"
                        disabled={ !areSomeMessagesSelected(messages) }
                        onClick={ () => actions.deleteSelectedMessages(getSelectedMessageIds(messages))}
                >
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
