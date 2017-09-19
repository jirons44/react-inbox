import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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

const mapStateToProps = state => ({
    messages: state.messages
})

export default withRouter(connect(
    mapStateToProps
)(Messages));
