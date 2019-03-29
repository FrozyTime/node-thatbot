# Node-thatbot



Node.JS library for [thatbot-rcd](https://github.com/dev-variety/thatbot-rcd).





### Installation 

`npm install thatbot --save`



### API

```js
.createTask(apiKey, scope, timeout)
```

| apiKey                  | scope                    | timeout          |
| ----------------------- | ------------------------ | ---------------- |
| Thatbot API access key. | Login, signup or action. | Request timeout. |



```js
.pollServer(apiKey, taskID, timeout)
```

| apiKey                  | taskID              | timeout          |
| ----------------------- | ------------------- | ---------------- |
| Thatbot API access key. | ID of task to poll. | Request timeout. |

**All functions return a promise.**

### Usage


```js
const tb = require('thatbot');

tb.createTask('api_key_here', 'login', 10000).then(result => {

​    console.log(result);

​    tb.pollServer('api_key_here', result.taskId).then(result => {

​        console.log(result);

​    }).catch(error => {

​        console.log(error)

​    })

}).catch(error => {

​    console.log(error)

})
```

