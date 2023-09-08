module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //
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
                    '../dist/scripts/app.js': ['scripts/app.js']
                }
            }
        },

        cssmin: {
            dist: {
                options: {
                    banner: ""
                },
                files: {
                    '../dist/styles/app.css': ['styles/app.css']
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
                    dest: '../dist'
                }]
            }
        },


        copy: {

            main: {
                files: [
                    {expand: true, flatten: true, src: ['images/*.*'], dest: '../dist/images'},


                ]
            }
        }
    });



            grunt.loadNpmTasks('grunt-terser');
            grunt.loadNpmTasks('grunt-contrib-cssmin');
            grunt.loadNpmTasks('grunt-contrib-htmlmin');


            grunt.registerTask('default', [
                'terser',
                'cssmin',
                'htmlmin',
                'copy'
            ]);

}