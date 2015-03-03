module.exports = function(grunt) {
    var config = {};
    var plugins = ["grunt-contrib-watch", "grunt-contrib-jst", "grunt-contrib-sass"];

    // Watch ================================================
    config.watch = {};

    config.watch.templates = {
        files: ["public/javascripts/backbone/**/*.us"],
        tasks: ["templatesObserver"]
    };

    config.watch.css = {
        files: ["styles/**/*.sass"],
        tasks: ["cssObserver"]
    };

    // JST ================================================
    config.jst = {};

    config.jst.templatesObserver = {
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

    // Sass ================================================
    config.sass = {};

    config.sass.cssObserver = {
        dist: {
            options: {
                style: 'expanded'
            },
            files: {
                'public/stylesheets/application.css' : 'styles/application.sass'
            }
        }
    }

    // Project configuration.
    grunt.initConfig(config);

    // Load all plugins.
    plugins.forEach(grunt.loadNpmTasks);

    // Task default
    grunt.registerTask("default", ["templatesObserver", "cssObserver"]);

    // Task
    grunt.registerTask("templatesObserver", ["jst"]);
    grunt.registerTask("cssObserver", ["sass"]);
};