

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
});