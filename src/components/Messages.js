import React from 'react';

import Message from './Message';

const Messages = ({
  messages,
  onChanged,
  onMessageChecked
}) => (
    <div>

        {
            messages.map( (message, i) => {
                return (
                    <Message
                        key={i}
                        message={ message }
                        onChange={ onChanged }
                        onMessageChecked={ onMessageChecked }
                    />
                )
            })
        }
    </div>
)

export default Messages;
