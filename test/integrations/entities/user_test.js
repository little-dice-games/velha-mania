'use strict';

describe('User::Entities', function () {
    var user = void 0,
        email = 'john@doe.com';

    before(function() {
        user = new VelhaMania.Entities.User({
            email: email,
            itsMe: true
        });
    })

    it('should get username', function () {
        assert.equal(user.get('username'), 'john');
    })

    it('should get avatar', function () {
        assert.match(user.get('avatar'), /www\.gravatar\.com/);
    })

    it('should get value of attribute itsMe', function () {
        assert.isTrue(user.itsMe())
    })

    it('should verify if has logged', function () {
        assert.isTrue(user.hasLogged())

        user.set({
            itsMe: false
        })

        assert.isFalse(user.hasLogged())
        expect(user.hasLogged()).to.be.a('boolean')
    })

    it('should verify if is playing', function () {
        assert.equal(user.isPlaying(), false);

        user.set({
            isPlaying: true
        })

        assert.equal(user.isPlaying(), true);
        expect(user.isPlaying()).to.be.a('boolean')
    })

    it('should be have itsMe and isPlaying on default attributes', function() {
        assert.deepProperty(user.defaults, 'itsMe');
        assert.deepProperty(user.defaults, 'isPlaying');
    })

    it('should be a false to itsMe and isPlaying property on default attributes', function() {
        assert.propertyVal(user.defaults, 'itsMe', false);
        assert.propertyVal(user.defaults, 'isPlaying', false);
    })
})