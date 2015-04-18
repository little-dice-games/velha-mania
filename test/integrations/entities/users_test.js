'use strict';

describe('Users::Entities', function () {
    before(function() {
        this.email = 'john@doe.com';
        this.users = new VelhaMania.Entities.Users();
    })

    it('should users is empty', function () {
        assert.isTrue(this.users.isEmpty());
    })

    it('should user create', function() {
        this.users.create(this.email)
        expect(this.users).to.have.property('models').with.length(1)
        assert.isTrue(this.users.isEmpty());
    })

    it('should add user', function() {
        this.users.addOrUpdateUser({ email: 'foo@foo.com' })
        expect(this.users).to.have.property('models').with.length(2)
        assert.isFalse(this.users.isEmpty());
    })

    it('should remove user', function() {
        this.users.removeUser({ email: 'foo@foo.com' });
        expect(this.users).to.have.property('models').with.length(1)
        assert.isTrue(this.users.isEmpty());
    })

    it('should add many users', function() {
        var usersToAdd = [
            { email: 'foo@foo.com' },
            { email: 'bar@bar.com' }
        ];

        this.users.addUsers(usersToAdd)
        expect(this.users).to.have.property('models').with.length(3)
    })

    it('should return current user', function () {
        var currentUser = this.users.getCurrentUser();
        assert.equal(currentUser.get('email'), this.email)
    })

    it('should get user by email', function() {
        var user = this.users.byEmail(this.email);

        assert.isObject(user)
        assert.equal(user.get('email'), this.email)
    })

    it('should update user info', function() {
        var user = this.users.byEmail(this.email);

        assert.isFalse(user.get('isPlaying'));
        this.users.addOrUpdateUser({ email: this.email, isPlaying: true })
        assert.isTrue(user.get('isPlaying'));
    })

    it('should be a localstorage', function() {
        assert.isObject(this.users.localStorage)
    })

    describe('Events', function() {

        describe('ReqRes', function() {
            before(function() {
                this.app = VelhaMania;
            })

            it('should trigger user:entities', function() {
                var users = this.app.request('user:entities');
                expect(users).to.be.instanceof(VelhaMania.Entities.Users)
            })

            it('should trigger user:entity', function() {
                var user = this.app.request('user:entity');
                expect(user).to.be.instanceof(VelhaMania.Entities.User)
            })

            it('should trigger new:user:entity', function() {
                var user = this.app.request('new:user:entity', this.email);
                expect(user).to.be.instanceof(VelhaMania.Entities.User)
            })

            it('should trigger user:by:email:entity', function() {
                var user = this.app.request('user:by:email:entity', this.email);
                expect(user).to.be.instanceof(VelhaMania.Entities.User)
            })

            it('should trigger logout:user:entity', function() {
                var spy = sinon.spy();
                var user = this.app.request('user:entity');
                user.on('destroy', spy)

                var logout = this.app.request('logout:user:entity');

                expect(logout).to.be.instanceof(VelhaMania.Entities.User)
                sinon.assert.calledOnce(spy)
                assert.isTrue(spy.called)
            })
        })
    })
})