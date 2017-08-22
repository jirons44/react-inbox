import React from 'react';

const Toolbar = ({
         messages,
         onBulkChecked,
         onMarkCheckedRead,
         onAddRemoveLabel,
         onDeleteMessages
}) => {

    const numOfUnreadMessages = () => {
        let count= messages.reduce( (sum, message) => {
            return sum + (message.read ? 0:1)
        }, 0);

        return (count);
    }

    const areAllMessagesSelected = () => {
        return messages.every(message => message.selected);
    }

    const areSomeMessagesSelected = () => {
        return messages.some(message => message.selected);
    }

    const handleMessagesSelected = () => {
        onBulkChecked( !areAllMessagesSelected() );
    }

    const handleAddLabel = (e) => {
        if(e.target.value) onAddRemoveLabel(e.target.value, true);
    }

    const handleRemoveLabel = (e) => {
        if(e.target.value) onAddRemoveLabel(e.target.value, false);
    }

    return (

        <div className="row toolbar">
            <div className="col-md-12">

                <p className="pull-right">
                    <span className="badge badge">{ numOfUnreadMessages() }</span>
                    unread messages
                </p>

                <button className="btn btn-default" onClick={ handleMessagesSelected }>
                    <i className={`fa fa-${areAllMessagesSelected()  ? 'check-' : areSomeMessagesSelected() ? 'minus-': ''}square-o`}></i>
                </button>

                <button className="btn btn-default"
                        disabled={ !areSomeMessagesSelected() }
                        onClick={() => onMarkCheckedRead(true) }>
                    Mark As Read
                </button>

                <button className="btn btn-default"
                        disabled={ !areSomeMessagesSelected() }
                        onClick={()=> onMarkCheckedRead(false) }>
                    Mark As Unread
                </button>

                <select className="form-control label-select"
                        disabled={ !areSomeMessagesSelected() }
                        onChange={handleAddLabel}>
                    <option value="">Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select className="form-control label-select"
                        disabled={ !areSomeMessagesSelected() }
                        onChange={handleRemoveLabel}>
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default"
                        disabled={ !areSomeMessagesSelected() }
                        onClick={ onDeleteMessages }>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
}

export default Toolbar;