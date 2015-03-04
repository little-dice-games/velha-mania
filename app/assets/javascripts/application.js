//= require jquery/dist/jquery
//= require underscore/underscore
//= require backbone/backbone
//= require backbone.babysitter/lib/backbone.babysitter
//= require backbone.wreqr/lib/backbone.wreqr
//= require marionette/lib/backbone.marionette
//= require marionette-formview/dist/FormView
//= require backbone.localStorage/backbone.localStorage
//= require backbone.mutators/backbone.mutators
//= require backbone.routefilter/dist/backbone.routefilter
//= require js-md5/js/md5
//= require jade/runtime
//= require materialize/dist/js/materialize

//= require_tree ./config

//= require backbone/app

//= require_tree ./backbone/lib/utilities
//= require_tree ./backbone/lib/views
//= require_tree ./backbone/lib/controllers
//= require_tree ./backbone/lib/components

//= require_tree ./backbone/entities

//= require ./backbone/behaviors/behaviors
//= require ./backbone/behaviors/form_behavior

//= require_tree ./backbone/apps

//= require_self

$(document).ready(function(){
  VelhaMania.start()
})