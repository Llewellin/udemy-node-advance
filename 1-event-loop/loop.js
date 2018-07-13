// node myFile.js

const pendingTimers = [];
// something related to network module. e.g. 'https'
const pendingOSTasks = [];
// related to Thread Pool
const pendingOperations = [];

// New timers, tasks, opertaions are recorded from myFile running
myFile.runContents();


const shouldCOntinue = () => {
    // Check one: Any pending setTimeout, setInterval. setImmediate?
    // Check two: Any pending OS tasks? (Like server listening to port)
    // Check three: Any pending long running opertations? (Like fs module)
    //  - fs module uses threadPool

    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

// Event loop
// Entire body executes in one 'tick'
while (shouldCOntinue()) {
    // 1) Node looks at pendingTimers and sees if any functions are ready to be called
    //  setTimout, setInverval

    // 2) Node looks at pendingOSTasks and pendingOperations and call relevant callbacks

    // 3) Node Pause execution. Cantinue when...
    //  - a new pendingOSTask is done
    //  - a new pendingOperation is done
    //  - a timer is about to complete

    // 4) Look at pendingTimers. Call any setImmediate

    // 5) Handle any 'close' events
    //  Example:
    //  readStream.on('close', () => {
    //      console.log('Clean up code');   
    // })

}



// exit back to ternimal