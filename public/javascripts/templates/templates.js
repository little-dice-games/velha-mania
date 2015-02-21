this["JST"] = this["JST"] || {};

this["JST"]["apps/home/show/templates/layout"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'form-region\'></div>';

}
return __p
};

this["JST"]["apps/home/show/templates/login"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<form class=\'form-login\' novalidate>\n  <fieldset class=\'controls\'>\n    <label>Email:</label>\n    <input class=\'email\' for=\'email\' data-field=\'email\' type=\'email\'>\n  </fieldset>\n\n  <button class="button-submit" type="submit">login</button>\n</form>';

}
return __p
};

this["JST"]["apps/navigation/show/templates/layout"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'logo-region\'></div>\n<div class=\'nav-region\'></div>';

}
return __p
};

this["JST"]["apps/navigation/show/templates/logged"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += 'Olá\n<img src=' +
((__t = ( avatar)) == null ? '' : __t) +
'>\n<h3>' +
((__t = ( username )) == null ? '' : __t) +
'</h3>\n<a class=\'logout\'>sair</a>';

}
return __p
};

this["JST"]["apps/navigation/show/templates/logo"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1>Velha Mania</h1>';

}
return __p
};

this["JST"]["apps/navigation/show/templates/unlogged"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += 'unlogged';

}
return __p
};

this["JST"]["apps/users/list/templates/empty"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += 'Não existe ninguém online :(';

}
return __p
};

this["JST"]["apps/users/list/templates/layout"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'list-region\'></div>';

}
return __p
};

this["JST"]["apps/users/list/templates/user"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<img src=' +
((__t = ( avatar )) == null ? '' : __t) +
'/>\n<span class=\'username\'>' +
((__t = ( username )) == null ? '' : __t) +
'</span>';

}
return __p
};

this["JST"]["lib/components/tooltip/templates/tip"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span>' +
((__t = ( message )) == null ? '' : __t) +
'</span>';

}
return __p
};