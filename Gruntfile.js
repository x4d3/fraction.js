module.exports = function(grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		clean : [ "target" ],
		copy : {
			dev : {
				files : [ {
					expand : true,
					cwd : 'www/',
					src : [ '**' ],
					dest : 'target/'
				}, {
					src : 'src/fraction.js',
					dest : 'target/fraction.js',
				} ]
			}
		},
		qunit : {
			files : [ 'tests/**/*test.html' ]
		},
		jshint : {
			files : [ 'Gruntfile.js', 'src/fraction.js' ],
			options : {
				// options here to override JSHint defaults
				globals : {
					jQuery : true,
					console : true,
					module : true,
					Fraction : true
				}
			}
		},
		uglify : {
			dist : {
				files : {
					'target/fraction.min.js' : [ 'target/fraction.js' ]
				}
			}
		},
		yuidoc : {
			compile : {
				name : '<%= pkg.name %>',
				description : '<%= pkg.description %>',
				version : '<%= pkg.version %>',
				url : '<%= pkg.homepage %>',
				options : {
					paths : 'src',
					outdir : 'target/docs/',
					themedir : "yuidoc-theme",
					helpers : [ "yuidoc-theme/helpers/helpers.js" ]
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.registerTask('test', [ 'jshint', 'qunit' ]);
	grunt.registerTask('default', [ 'test', 'clean', 'copy', 'uglify', 'yuidoc' ]);
};