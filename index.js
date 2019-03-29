const request = require('request');

/**
 * 
 * @param {String} apiKey Thatbot API access key.
 * @param {String} scope Login, signup or action.
 * @param {Integer} timeout Request timeout.
 */
module.exports.createTask = (apiKey, scope, timeout) => {
    return new Promise((res, rej) => {
        request.post('https://roblox.developer-variety.com/api/rcd/create-task', {
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": apiKey
            },
            json: {
                "scope": scope
            },
            timeout: timeout
        }, (error, response, body) => {
            if (error) return rej({ "message": `There was an error with the request! Code: ${error.code}` });

            if (body.status == 'success') {
                body.data['message'] = "Task created successfully!";
                res(body.data);
            } else {
                rej(body.data);
            }
        })
    })
}

/** 
 * @param {String} apiKey Thatbot API access key.
 * @param {Integer} taskID ID of task to poll.
 * @param {Integer} timeout Request timeout.
*/
module.exports.pollServer = (apiKey, taskID, timeout) => {
    return new Promise((res, rej) => {
        function poll() {
            request.post('https://roblox.developer-variety.com/api/rcd/task-result', {
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": apiKey
                },
                json: {
                    "taskId": taskID
                },
                timeout: timeout
            }, (error, response, body) => {
                if (error) return rej({ "message": `There was an error with the request! Code: ${error.code}` });

                if (body.status == 'success') {
                    if (body.data.ready == true) {
                        res(body.data);
                    } else {
                        poll()
                    }
                } else {
                    rej(body.data);
                }
            })
        }

        poll()
    })
}