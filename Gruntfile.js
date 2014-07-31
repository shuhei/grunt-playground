module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      js: {
        files: 'src/js/**/*',
        tasks: ['uglify']
      },
      css: {
        files: 'src/sass/**/*',
        tasks: ['compass']
      },
      html: {
        files: 'src/index.html',
        tasks: ['copy']
      }
    },
    connect: {
      server: {
        options: {
          base: 'public'
        }
      }
    },
    open: {
      dist: {
        path: 'http://localhost:8000/index.html'
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    uglify: {
      js: {
        src: [
          'src/js/jquery-1.11.1.js',
          'src/js/underscore.js',
          'src/js/app.js'
        ],
        dest: 'public/js/bundle.js'
      }
    },
    copy: {
      html: {
        src: ['src/index.html'],
        dest: 'public/index.html'
      }
    },
    jshint: {
      all: {
        src: ['Gruntfile.js', 'src/js/**/*'],
        options: {
          jshintrc: true
        }
      }
    },
    imagemin: {
      all: {
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['*.{jpg,svg,png,gif}'],
          dest: 'public/img/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('serve', ['connect:server:keepalive']);
  grunt.registerTask('check', ['jshint']);
  grunt.registerTask('build', ['check', 'copy', 'compass', 'uglify', 'imagemin']);
  grunt.registerTask('dev', ['build', 'connect:server', 'open:dist', 'watch']);
  grunt.registerTask('default', ['dev']);
};
