module.exports = function(grunt) {
    var config = {};
    var plugins = ["grunt-contrib-watch", "grunt-contrib-jst"];

    // Watch ================================================
    config.watch = {};

    config.watch.templates = {
        files: ["public/javascripts/backbone/**/*.us"],
        tasks: ["templatesObserver"]
    };

    // JST ================================================
    config.jst = {
        compile: {
            options: {
                templateSettings: {
                },
                processName: function(filename) {
                    return filename
                        .replace('public/javascripts/backbone/', '')
                        .replace('.us', '');
                }
            },

            files: {
                "public/javascripts/templates/templates.js": ["public/javascripts/**/*.us"]
            }
        }
    };

    // Project configuration.
    grunt.initConfig(config);

    // Load all plugins.
    plugins.forEach(grunt.loadNpmTasks);

    // Task default
    grunt.registerTask("default", ["templatesObserver"]);

    // Task
    grunt.registerTask("templatesObserver", ["jst"]);
};