const MESSAGES_URL = '/api/messages'
const DELAY_URL = '?delay=0'

const callPatchAPI = async ( req ) => {
    return await fetch(`${MESSAGES_URL}`, {
        method: 'PATCH',
        body: JSON.stringify(req),
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
        }
    })
}

const callPostAPI = async ( req ) => {
    return await fetch(`${MESSAGES_URL}`, {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
        }
    })
}

class MessagesApi {

    static async getAllMessages() {
        const messageResponse = await fetch(`${MESSAGES_URL}${DELAY_URL}`);
        const messagesJson = await messageResponse.json();
        return messagesJson._embedded.messages;
    }

    static async getMessage(id) {
        const messageResponse = await fetch(`${MESSAGES_URL}/${id}${DELAY_URL}`);
        const message = await messageResponse.json();
        return message;
    }


    static async addMessage(subject, body) {
        const req = {
            subject,
            body
        }

        const response = await callPostAPI(req);
        const message = await response.json();
        return message;
    }

    static async updateStarredMessage(messageId, isStarred) {
        if (!messageId ) {
            return {success: true};
        }

        const req = {
            messageIds: [messageId],
            command: 'star',
            star: isStarred
        };

        const response = await callPatchAPI(req);
        return {success: response.ok};
    }

    static async updateReadMessage(messageIds, isRead) {
        if (messageIds && !messageIds.length > 0) {
            return {success: true};
        }

        const req = {
            messageIds,
            command: 'read',
            read: isRead
        };

        const response = await callPatchAPI( req );
        return {success: response.ok};
    }

    static async addRemoveLabel(messageIds, isAdd, label) {
        if (messageIds && !messageIds.length > 0) {
            return {success: true};
        }

        const req = {
            messageIds,
            command: isAdd ? 'addLabel':'removeLabel',
            label
        };

        const response = await callPatchAPI( req );
        return {success: response.ok};
    }

    static async deleteMessages(messageIds) {
        if (messageIds && !messageIds.length > 0) {
            return {success: true};
        }

        const req = {
            messageIds,
            command: 'delete'
        };

        const response = await callPatchAPI( req );
        return {success: response.ok};
    }
}

export default MessagesApi;




/*
* ******* DEPLOY NOTES ***************
*
*  ###Deploying client/server to same domain:
*    - root-relative paths to make http calls ( no need for host name prefix ) fetch('/api/messages')
*    - sever does not need CORS
*    - server needs some sort of wildcard route to handle client-side calls
*
*    PROXY:  Add a PROXY to package.json and point to the server so u can use 'relative-pathing'
*            you need this b/c react out of the box locally, react scripts creates a local react server
*            to host up the app
*
*
*  ###Deploying to differnt domain:
*   -needs env-specific config vars when building the client-side app
*   -server does need CORS
*   -server does not need client side routes info
* */
