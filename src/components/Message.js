import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggelMessageSelected, updateMessageStarred } from '../actions/messageActions';

const Message = ({
     message,
     actions
}) => {

    const handleMessageSelected = () => {
        actions.toggelMessageSelected(message.id);
    }

    const handleStarredClicked = () => {
        actions.updateMessageStarred(message.id, !message.starred);
    }

    const renderLabels = () => {
        return message.labels &&
            message.labels.map((label, i) => {
                return <span key={ i } className="label label-warning">{ label }</span>
        });
    }

    const rowClassName = () => {
        let className = 'row message';
        className += message.read ? ' read': ' unread';
        if (message.selected) {
            className += ' selected';
        }
        return className;
    }

    return (
        <div>
            <div className={ rowClassName() }>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox"
                                   name="messageChecked"
                                   checked={ !!message.selected }
                                   onChange={ handleMessageSelected }
                            />
                        </div>
                        <div className="col-xs-2">
                            <i className={`star fa fa-star${!!message.starred ? '' : '-o'}`}
                               onClick = { handleStarredClicked }></i>
                        </div>
                    </div>
                </div>

                <div className="col-xs-11">
                    {
                       renderLabels()
                    }
                    <a onClick={ handleMessageSelected }>{ message.subject }</a>
                </div>

            </div>
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            toggelMessageSelected,
            updateMessageStarred
        }, dispatch)
    };
}


export default connect(null, mapDispatchToProps)(Message);
