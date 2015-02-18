this.VelhaMania.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
  var API;
  var users = void 0;

  Entities.User = Backbone.Model.extend({
    defaults: {
      itsMe: false
    },

    mutators: {
        username: function() {
          return _.first(this.get('email').split('@'));
        },

        avatar: function() {
          return 'http://www.gravatar.com/avatar/' + md5(this.get('email'));
        }
    },

    loggout: function() {
      this.destroy();
    },

    hasLogged: function() {
      return !_.isEmpty(this);
    }
  })

  Entities.Users = Backbone.Collection.extend({
    model: Entities.User,
    localStorage: new Backbone.LocalStorage('velha-mania-user'),

    getCurrentUser: function() {
      var user = _.first(this.filter(function(user) {
        return user.get('itsMe')
      }));

      if (_.isEmpty(user)) {
        var records = this.localStorage.findAll();

        if (records.length == 1) {
          this.add(records);
          user = this.getCurrentUser();
        }
      }

      return user;
    }
  });

  API = {
    getUsers: function() {
      if (users == null) {
        users = new Entities.Users();
      }

      return users;
    },

    getCurrentUser: function() {
      return this.getUsers().getCurrentUser();
    },

    newUser: function(email) {
      var data = {
        email: email,
        itsMe: true
      }

      if (_.isEmpty(this.getCurrentUser())) {
        this.getUsers().create(data);
      }

      return this.getCurrentUser();
    },

    loggout: function() {
      return this.getCurrentUser().loggout();
    }
  };

  App.reqres.setHandler('user:entity', function() {
    return API.getCurrentUser();
  });

  App.reqres.setHandler('users:entity', function() {
    return API.getUsers();
  });

  App.reqres.setHandler('new:user:entity', function(email) {
    return API.newUser(email);
  });

  App.reqres.setHandler('loggout:user:entity', function() {
    return API.loggout();
  })
});