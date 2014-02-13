/* global describe, it */

(function () {
    'use strict';
    suite('notify', function(){
        test('notify with message should return that message', function(){
            var msg = 'test', test = notify(msg);
            assert.equal(msg, test);
        });
    });

})();
