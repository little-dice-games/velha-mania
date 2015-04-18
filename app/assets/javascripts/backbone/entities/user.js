this.VelhaMania.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var API;
    var users = void 0;

    Entities.User = Backbone.Model.extend({
        defaults: {
            itsMe: false,
            isPlaying: false
        },

        mutators: {
            username: function() {
               return _.first(this.get('email').split('@'));
            },

            avatar: function() {
                return 'http://www.gravatar.com/avatar/' + md5(this.get('email'));
            }
        },

        logout: function() {
            socket.emit('users/delete', { email: this.get('email') });
            this.destroy();
        },

        itsMe: function() {
            return this.get('itsMe');
        },

        hasLogged: function() {
            return this.itsMe();
        },

        isPlaying: function() {
            return this.get('isPlaying');
        }
    })

    Entities.Users = Backbone.Collection.extend({
        model: Entities.User,
        localStorage: new Backbone.LocalStorage('velha-mania-user'),

        initialize: function() {
            socket.emit('users');
        },

        addOrUpdateUser: function(user) {
            var userOnCollection = this.findWhere({ email: user.email });
            attributes = _.pick(user, 'email', 'isPlaying')

            if (_.isEmpty(userOnCollection)) {
                this.add([attributes])
            } else {
                userOnCollection.set(attributes);
            }
        },

        addUsers: function(users) {
            $.each(users, function(i, user){
                this.addOrUpdateUser(user);
            }.bind(this))
        },

        byEmail: function(email) {
            var user = this.where({ email: email });
            return _.first(user);
        },

        removeUser: function(user) {
            this.findWhere({ email: user.email }).destroy()
        },

        getCurrentUser: function() {
            var user = _.first(this.filter(function(user) {
                return user.get('itsMe')
            }));

            if (_.isEmpty(user)) {
                var records = this.localStorage.findAll();

                if (records.length == 1) {
                    this.add(records);
                    socket.emit('users/new', { email: _.first(records).email });
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
                socket.emit('users/new', { email: email });
                Entities.Users.__super__.create.call(this, data);
            }

            return this.getCurrentUser();
        },

        isEmpty: function() {
            return _.isEmpty(this.models)
                || this.where({ isPlaying: false }).length <= 1
                && !_.isEmpty(this.getCurrentUser());
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

        getUserByEmail: function(email) {
            return this.getUsers().byEmail(email);
        },

        newUser: function(email) {
            return this.getUsers().create(email);
        },

        logout: function() {
            return this.getCurrentUser().logout();
        },

        addUsers: function(users) {
            this.getUsers().addUsers(users);
        },

        addUser: function(user) {
            this.getUsers().addOrUpdateUser(user);
        },

        removeUser: function(user) {
            this.getUsers().removeUser(user);
        }
    };

    App.reqres.setHandler('user:by:email:entity', function(email) {
        return API.getUserByEmail(email);
    });

    App.reqres.setHandler('user:entity', function() {
        return API.getCurrentUser();
    });

    App.reqres.setHandler('user:entities', function() {
        return API.getUsers();
    });

    App.reqres.setHandler('new:user:entity', function(email) {
        return API.newUser(email);
    });

    App.reqres.setHandler('logout:user:entity', function() {
        return API.logout();
    });

    App.reqres.setHandler('opponents:entity', function() {
        return API.opponents();
    })

    socket.on('users', function(response) {
        API.addUsers(response.data);
    });

    socket.on('user', function(response) {
        API.addUser(response.data);
    });

    socket.on('users/delete', function(response) {
        API.removeUser(response.data);
    });
});