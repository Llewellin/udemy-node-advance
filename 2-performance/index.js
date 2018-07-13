// ---------------- with native cluster mode ------------------//
// process.env.UV_THREADPOOL_SIZE = 1;

// const cluster = require('cluster');

// if (cluster.isMaster) {
//     cluster.fork();
//     cluster.fork();
// } else {
//     const express = require('express');
//     const app = express();
//     const crypto = require('crypto');
//     // const doWork = duration => {
//     //     const start = Date.now();
//     //     while (Date.now() - start < duration) {}
//     // };

//     app.get('/', (req, res) => {
//         // doWork(5000);
//         crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
//             res.send('Hi there');
//         });
//     });

//     app.get('/fast', (req, res) => {
//         res.send('This was fast');
//     });

//     app.listen(4000);
// }

// ---------------- with native cluster mode ------------------//

//-------------------------  with pm2 ----------------------//
// const express = require('express');
// const app = express();
// const crypto = require('crypto');

// app.get('/', (req, res) => {
//     crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
//         res.send('Hi there');
//     });
// });

// app.get('/fast', (req, res) => {
//     res.send('This was fast');
// });

// app.listen(4000);
//-------------------------  with pm2 ----------------------//

//---------------------- with workder ----------------------//
const express = require('express');
const app = express();
const Worker = require('webworker-threads').Worker;

app.get('/', (req, res) => {
    const worker = new Worker(function() {
        this.onmessage = function() {
            let counter = 0;
            while (counter < 1e9) counter++;

            postMessage(counter);
        };
    });

    worker.onmessage = function(message) {
        console.log(message.data);
        res.send('' + message.data);
    };

    worker.postMessage();
});

app.get('/fast', (req, res) => {
    res.send('This was fast');
});

app.listen(4000);
