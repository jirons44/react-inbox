import React from 'react';

const Toolbar = ({
         messages,
         onBulkSelected,
         onAddRemoveLabel,
         onDeleteMessages,
         onReadUnreadClicked,
         onToggleComposedForm,
}) => {

    const handleMessagesSelected = () => {
        onBulkSelected( !areAllMessagesSelected() );
    }

    const handleAddLabel = e => {
        if(e.target.value) onAddRemoveLabel(e.target.value, true);
    }

    const handleRemoveLabel = (e) => {
        if(e.target.value) onAddRemoveLabel(e.target.value, false);
    }

    const numOfUnreadMessages = () => {
        return messages.reduce( (sum, message) => {return sum + (message.read ? 0:1)}, 0);
    }

    const areAllMessagesSelected = () => {
        return messages.every(message => message.selected);
    }

    const areSomeMessagesSelected = () => {
        return messages.some(message => message.selected);
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

                <a className="btn btn-danger" onClick={onToggleComposedForm}>
                    <i className="fa fa-plus"></i>
                </a>

                <button className="btn btn-default"
                        onClick={ handleMessagesSelected }>
                    <i className={renderButtonSelectedClassName()}></i>
                </button>

                <button className="btn btn-default"
                        disabled={ !areSomeMessagesSelected() }
                        onClick={() => onReadUnreadClicked(true) }>
                    Mark As Read
                </button>

                <button className="btn btn-default"
                        disabled={ !areSomeMessagesSelected() }
                        onClick={()=> onReadUnreadClicked(false) }>
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
                        onClick={ onDeleteMessages }>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
}

export default Toolbar;