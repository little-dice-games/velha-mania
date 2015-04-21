'use strict';

describe('User::Entities', function () {
    before(function() {
        this.user = new VelhaMania.Entities.User({
            email: 'john@doe.com',
            itsMe: true
        });
    })

    it('should get username', function () {
        assert.equal(this.user.get('username'), 'john');
    })

    it('should get avatar', function () {
        assert.match(this.user.get('avatar'), /www\.gravatar\.com/);
    })

    it('should get value of attribute itsMe', function () {
        assert.isTrue(this.user.itsMe())
    })

    it('should verify if has logged', function () {
        assert.isTrue(this.user.hasLogged())

        this.user.set({
            itsMe: false
        })

        assert.isFalse(this.user.hasLogged())
        expect(this.user.hasLogged()).to.be.a('boolean')
    })

    it('should verify if is playing', function () {
        assert.equal(this.user.isPlaying(), false);

        this.user.set({
            isPlaying: true
        })

        assert.equal(this.user.isPlaying(), true);
        expect(this.user.isPlaying()).to.be.a('boolean')
    })

    it('should be have itsMe and isPlaying on default attributes', function() {
        assert.deepProperty(this.user.defaults, 'itsMe');
        assert.deepProperty(this.user.defaults, 'isPlaying');
    })

    it('should be a false to itsMe and isPlaying property on default attributes', function() {
        assert.propertyVal(this.user.defaults, 'itsMe', false);
        assert.propertyVal(this.user.defaults, 'isPlaying', false);
    })

    it('should user logout', function () {
        var spy = sinon.spy();
        this.user.on('destroy', spy)
        this.user.logout()

        sinon.assert.calledOnce(spy)
        assert.isTrue(spy.called)
    })
})