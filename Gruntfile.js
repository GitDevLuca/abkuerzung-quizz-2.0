module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        terser: {
            one: {
                options: {
                    compress: true,
                    mangle: true,
                    output: {
                        comments: 'some'
                    }
                },
                files: {
                    'dist/scripts/app.js': ['scripts/app.js']
                }
            }
        },
        svgmin: {
            options: {
                plugins: [
                    {removeUnknownsAndDefaults: false},
                    {removeViewBox: false}
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'images',
                    src: ['**/*.svg'],
                    dest: 'dist/images/'
                }]
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg}'],
                    dest: 'dist/images'
                }]
            }
        },
        cssmin: {
            dist: {
                options: {
                    banner: "/*\n* abkuerzungs-quizz\n* Copyright (c) 2023 abkuerzungs-quizz \n* Licensed under the MPL-2.0 License\n*/\n"
                },
                files: {
                    'dist/styles/app.css': ['styles/app.css']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    src: 'index.html',
                    dest: 'dist'
                }]
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: /\<\!doctype html\>/g,
                            replacement: function () {
                                return "<!DOCTYPE html>\n<!-- \n* abkuerzungs-quizz \n* Copyright (c) 2023 abkuerzungs-quizz \n* Licensed under the MPL-2.0 License\n-->\n";
                            }
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['dist/index.html'], dest: 'dist/'}
                ]
            },
            
            dist2: {
                options: {
                    patterns: [
                        {
                            match: /http:\/\/localhost:3000\/socket.io\/socket.io.js/g,
                            replacement: function () {
                                return "https://grrd.a2hosted.com:49154/socket.io/socket.io.js";
                            }
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['dist/index.html'], dest: 'dist/'}
                ]
            },

            dist3: {
                options: {
                    patterns: [
                        {
                            match: /http:\/\/localhost:3000/g,
                            replacement: function () {
                                return "https://grrd.a2hosted.com:49154";
                            }
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['dist/scripts/app.js'], dest: 'dist/scripts/'}
                ]
            }

        },
        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['appmanifest.json'], dest: 'dist/'},
                    {expand: true, flatten: true, src: ['**.txt'], dest: 'dist/'},
                    {expand: true, flatten: true, src: ['**.md'], dest: 'dist/'},
                    {expand: true, flatten: true, src: ['CNAME'], dest: 'dist/'},
                    {expand: true, flatten: true, src: ['sounds/*.*'], dest: 'dist/sounds'}
                    // , {
                    //     expand: true,
                    //     cwd: 'images/',
                    //     src: ['**/*.{png,jpg}'],
                    //     dest: 'dist/images'
                    // }
                ]
            }
        }
    });
    

    grunt.loadNpmTasks('grunt-terser');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', [
        'terser',
        'svgmin',
        'imagemin',
        'cssmin',
        'htmlmin',
        'replace',
        'copy'
    ]);
};
