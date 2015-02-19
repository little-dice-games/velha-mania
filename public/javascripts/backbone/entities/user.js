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

    initialize: function() {
      io.emit('users');
    },

    addUsers: function(users) {
      $.each(users, function(i, user){
        this.add([{ email: user.email }])
      }.bind(this))
    },

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
    },

    create: function(email) {
      var data = {
        email: email,
        itsMe: true
      }

      if (_.isEmpty(this.getCurrentUser())) {
        io.emit('user/new', { email: email });
        Entities.Users.__super__.create.call(this, data);
      }

      return this.getCurrentUser();
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
      return this.getUsers().create(email);
    },

    loggout: function() {
      return this.getCurrentUser().loggout();
    },

    addUsers: function(users) {
      this.getUsers().addUsers(users)
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
  });

  io.on('users', function(response) {
    API.addUsers(response.data)
  });
});