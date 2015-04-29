'use strict';

describe('Bot::Entities', function () {
    before(function() {
        this.board = VelhaMania.request('board:entities', { roomId: _.uniqueId('room') });
        this.currentUser = new VelhaMania.Entities.User({ id: _.uniqueId('me') });
        this.opponent = new VelhaMania.Entities.User({ id: _.uniqueId('opponent') });
    });

    it('does not return any of currentUser positions', function() {
        this.board.findWhere({ name: 'a1' }).set({ userId: this.currentUser.get('id') });
        this.board.findWhere({ name: 'b1' }).set({ userId: this.currentUser.get('id') });
        this.board.findWhere({ name: 'c1' }).set({ userId: this.opponent.get('id') });
        this.board.findWhere({ name: 'b2' }).set({ userId: this.currentUser.get('id') });

        var botPlay = VelhaMania.request('bot:play', { me: this.currentUser.get('id'), opponent: this.opponent.get('id') });

        var myPositions = this.board.where({ userId: this.currentUser.get('id') }).map(function(model) { return model.get('name') });

        assert.notInclude(myPositions, botPlay.get('name'));
    });

    it('returns one of free positions', function() {
        this.board.findWhere({ name: 'a1' }).set({ userId: this.currentUser.get('id') });
        this.board.findWhere({ name: 'b1' }).set({ userId: this.currentUser.get('id') });
        this.board.findWhere({ name: 'c1' }).set({ userId: this.opponent.get('id') });
        this.board.findWhere({ name: 'b2' }).set({ userId: this.opponent.get('id') });

        var botPlay = VelhaMania.request('bot:play', { me: this.currentUser.get('id'), opponent: this.opponent.get('id') });

        var freePositions = this.board.where({ play: _.noop }).map(function(model) { return model.get('name') });

        assert.include(freePositions, botPlay.get('name'));
    });

    it('returns one of bestMoves positions', function() {
        this.board.findWhere({ name: 'a1' }).set({ userId: this.currentUser.get('id') });
        this.board.findWhere({ name: 'b1' }).set({ userId: this.currentUser.get('id') });
        this.board.findWhere({ name: 'b2' }).set({ userId: this.opponent.get('id') });
        this.board.findWhere({ name: 'c2' }).set({ userId: this.opponent.get('id') });

        var botPlay = VelhaMania.request('bot:play', { me: this.currentUser.get('id'), opponent: this.opponent.get('id') });

        assert.equal('a3', botPlay.get('name'));
    });
});