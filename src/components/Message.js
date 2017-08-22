import React from 'react';

const Message = ({ message, onChange }) => {

    const handleMessageSelected = () => {
        onChange( {...message, selected: !message.selected });
    }

    const handleStarClicked = () => {
        onChange( {...message, starred: !message.starred} );
    }

    return (
        <div>
            <div className={`row message ${message.read ? 'read' : 'unread'} ${message.selected ? 'selected' : ''}`}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox"
                                   name="messageChecked"
                                   checked={!!message.selected}
                                   onChange={ handleMessageSelected }
                            />
                        </div>
                        <div className="col-xs-2">
                            <i className={`star fa fa-star${!!message.starred ? '' : '-o'}`}
                               onClick = { handleStarClicked }></i>
                        </div>
                    </div>
                </div>

                <div className="col-xs-11">
                    {
                        message.labels.map((label, i) => {
                            return <span key={ i } className="label label-warning">{ label }</span>
                        })
                    }
                    <a href="#">{ message.subject }</a>
                </div>

            </div>
        </div>
    )
}

export default Message;
