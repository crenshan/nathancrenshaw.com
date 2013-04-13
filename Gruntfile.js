'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'dev/js/{,*/}*.js',
                '!dev/js/vendor/*'
            ]
        },
        uglify: {
            dest: {
                options: {
                    banner: '/*! <%= pkg.name %> v.<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    mangle: false
                },
                files: {
                    'build/js/scripts.min.js': [
                        'dev/js/{,*/}*.js',
                        '!dev/js/vendor/*'
                    ]
                }
            }
        },
        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },
        copy: {
          vendor: {
            files: [
            {expand: true, flatten: true, src: ['dev/js/vendor/*'], dest: 'build/js/vendor/', filter: 'isFile'}
            ]
          },
          images: {
            files: [
            {expand: true, flatten: true, src: ['dev/img/*'], dest: 'build/img/', filter: 'isFile'},
            {expand: true, flatten: true, src: ['dev/*.ico'], dest: 'build/', filter: 'isFile'}
            ]
          }
        },
        replace: {
            dist: {
                options: {
                    variables: {
                        'scripts_btm': '<%= grunt.file.read("dev/inc/scripts_btm.html") %>'
                    }
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['dev/*.html'],
                    dest: 'build/'
                }]
            }
        },
        connect: {
            livereload: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [lrSnippet, folderMount(connect, 'build')];
                    }
                }
            }
        },
        watch: {
            compass: {
                files: ['dev/styles/{,*/}*.scss'],
                tasks: ['compass']
            },
            replace: {
                files: ['dev/{,*/}*.html'],
                tasks: ['replace']
            },
            js: {
                files: ['dev/js/*.js'],
                tasks: ['uglify']
            },
            vendor: {
                files: ['dev/js/vendor/*.js'],
                tasks: ['copy:vendor']
            },
            img: {
                files: ['dev/img/{,*/}*.{png,jpg,jpeg}'],
                tasks: ['copy:images']
            },
            livereload: {
                files: [
                    'build/*.html',
                    'build/css/*.css',
                    'build/js/<%= pkg.filePrefix %>.min.js',
                    'build/img/{,*/}*.{png,jpg,jpeg}'
                ],
                tasks: ['livereload']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');

    grunt.renameTask('regarde', 'watch');

    // Default tasks
    grunt.registerTask('default', [
        'jshint',
        'uglify',
        'copy:vendor',
        'copy:images',
        'compass',
        'replace'
    ]);

    // Start server
    grunt.registerTask('start', [
        'default',
        'livereload-start',
        'connect',
        'watch'
    ]);

};
