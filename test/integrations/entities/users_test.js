'use strict';

describe('Users::Entities', function () {
    var users = void 0,
        email = 'john@doe.com';

    before(function() {
        users = new VelhaMania.Entities.Users();
    })

    it('should users is empty', function () {
        assert.isTrue(users.isEmpty());
    })

    it('should user create', function() {
        users.create(email)
        expect(users).to.have.property('models').with.length(1)
        assert.isTrue(users.isEmpty());
    })

    it('should add user', function() {
        users.addOrUpdateUser({ email: 'foo@foo.com' })
        expect(users).to.have.property('models').with.length(2)
        assert.isFalse(users.isEmpty());
    })

    it('should remove user', function() {
        users.removeUser({ email: 'foo@foo.com' });
        expect(users).to.have.property('models').with.length(1)
        assert.isTrue(users.isEmpty());
    })

    it('should add many users', function() {
        var usersToAdd = [
            { email: 'foo@foo.com' },
            { email: 'bar@bar.com' }
        ];

        users.addUsers(usersToAdd)
        expect(users).to.have.property('models').with.length(3)
    })

    it('should return current user', function () {
        var currentUser = users.getCurrentUser();
        assert.equal(currentUser.get('email'), email)
    })

    it('should get user by email', function() {
        var user = users.byEmail(email);

        assert.isObject(user)
        assert.equal(user.get('email'), email)
    })

    it('should update user info', function() {
        var user = users.byEmail(email);

        assert.isFalse(user.get('isPlaying'));
        users.addOrUpdateUser({ email: email, isPlaying: true })
        assert.isTrue(user.get('isPlaying'));
    })

    it('should be a localstorage', function() {
        assert.isObject(users.localStorage)
    })
})