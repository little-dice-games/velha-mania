'use strict';

describe('Users::Entities', function () {
    var users;

    before(function() {
        users = new VelhaMania.Entities.Users();
    });

    it('should users is empty', function () {
        assert.equal(users.isEmpty(), true);
    })
})