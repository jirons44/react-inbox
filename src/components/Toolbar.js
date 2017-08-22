import React from 'react';

const Toolbar = ({
         messages,
         onBulkChecked,
         onMarkCheckedRead
}) => {

    const numOfUnreadMessages = () => {
        let count= messages.reduce( (sum, message) => {
            return sum + (message.read ? 0:1)
        }, 0);

        // console.log("numOfUnreadMessages count=", count );

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
        console.log("handleAddLabel= " );
    }

    return (

        <div className="row toolbar">
            <div className="col-md-12">

                <p className="pull-right">
                    <span className="badge badge">{ numOfUnreadMessages() }</span>
                    unread messages
                </p>

                <button className="btn btn-default">
                    <i className={`fa fa-${areAllMessagesSelected()  ? 'check-' : areSomeMessagesSelected() ? 'minus-': ''}square-o`}
                       onClick={ handleMessagesSelected } ></i>
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
                        selected="Apply Label">
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select className="form-control label-select"
                        disabled={ !areSomeMessagesSelected() }
                        selected="Remove Label"
                        onChange={this.handleAddLabel}>
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default"
                        disabled={ !areSomeMessagesSelected() }>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
}

export default Toolbar;