import { fakeAsync, flush, tick } from "@angular/core/testing";


fdescribe ('Async Testing Examples', () => {
    // done:DoneFn is used so that the test will continue to run until all
    // assertions are verified.  if not there, the test will give a false
    // positive, as the expect assertion is never actually ran.

    // Done is an inconvenient solution, but I should know it can be done.
    it('Asynchronous test example with Jasmine done()', (done:DoneFn) => {

        let test = false;

        setTimeout(() => {

            console.log('running assertions');

            test = true;

            expect(test).toBeTruthy();

            // needed to mark the test as complete see argument in the function call.
            done();

        }, 1000);
    });

    // fakeAsync simulates the passage of time allowing for ALL tests to be completed asynchronously,
    // so all assertions are run on the current state of page
    it('Asynchronous test example - setTimeout()', fakeAsync(() => {
        let test = false;

        setTimeout(() => {});
        setTimeout(() => {
            console.log('running assertions setTimeout()');

            test = true;

        }, 1000);

        // see the correlation between the time in settTimeout and tick. you can set multiple ticks,
        // if you need to test multiple bits of code that need time to pass to execute.
        // but the tick values should always match the time set for timeout
        // tick can only be called in a fakeAsync zone, if called outside of a fakeAsync zone you will error
        tick(500);
        // insert testing criteria here
        tick(499);
        // insert testing criteria here
        tick(1);
        // with this, assertions no longer have to be applied within a timeout block.
        expect(test).toBeTruthy();

        // flush executes ALL timeouts executed by fakeAsync Zone
        flush();
    }));

    // Order of operations
    // any synchronous code ie: sets and assertions meaning your expect will be evaluated before any micro or macrotasks can be run
    // 2. microtasks ie: promises
    // 3. macrotasks(tasks) ie: setTimeout
    fit('Asynchronous test example - plain promise', () => {
        let test = false;

        console.log('creating promise');

        // only added to test as a demonstration of task ordering
        // setTimeout(() => {
        //     console.log('setTimeout() first callback triggered');
        // });

        // setTimeout(() => {
        //     console.log('setTimeout() second callback triggered');
        // });

        Promise.resolve().then(() =>{

            console.log('Promise first then() evaluated successfully');

            return Promise.resolve();
        })
        .then(() => {
            console.log('Promise second then() evaluated successfully');

            test = true;
        });

        console.log('Running test assertions');
        expect(test).toBeTruthy();
    });
});