import React from 'react';

import Message from './Message';

const Messages = ({ messages, onChanged }) => (
    <div>

        {
            messages.map( (message, i) => {
                return (
                    <Message
                        key={i}
                        message={ message }
                        onChange={ onChanged }
                    />
                )
            })
        }
    </div>
)

export default Messages;
