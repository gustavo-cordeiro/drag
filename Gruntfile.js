module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: '9000',
                    base: './'
                },
                open: {
                    target: 'http://localhost:9000/app/index.html'
                }
            }
        },
        watch: {
            less: {
                files: [
                    'app/styles/**/*.less'
                ],
                tasks: [
                    'css'
                ],
                options: {
                    atBegin: true,
                    livereload: true,
                }
            },
            js: {
                files: [
                    'app/controls/*.js'
                ],
                tasks: [],
                options: {
                    atBegin: true,
                    livereload: true,
                }
            },
            views: {
                files: [
                    'app/**/*.html'
                ],
                options: {
                    livereload: true,
                }
            }
        },
        less: {
            application: {
                options: {
                    paths: [
                        'app/styles/less/'
                    ],
                    compress: true
                },
                files: {
                    'app/styles/style.min.css': 'app/styles/less/style.less'
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', [
        'less',
        'connect',
        'watch'
    ]);

    grunt.registerTask('css', [
        'less'
    ]);
};