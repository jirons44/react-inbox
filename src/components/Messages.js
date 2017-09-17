import React from 'react';

import Message from './Message';

const Messages = ({
  messages,
}) => (
    <div>

        {
            messages.allIds.map(id => {
              return (
                  <Message
                      key={id}
                      message={ messages.byIds[id] }
                  />
              )
            })
        }
    </div>
)

export default Messages;
