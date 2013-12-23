'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var MeanMinimalGenerator = module.exports = function MeanMinimalGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MeanMinimalGenerator, yeoman.generators.Base);

MeanMinimalGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'confirm',
    name: 'appName',
    message: 'Would you like to enable this option?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;

    cb();
  }.bind(this));
};

MeanMinimalGenerator.prototype.grunt = function grunt() {
  this.copy('_gruntfile.js', 'gruntfile.js');
};

MeanMinimalGenerator.prototype.bower = function bower() {
  this.template('_bower.json', 'bower.json');
  this.copy('bowerrc', '.bowerrc');
};

MeanMinimalGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

MeanMinimalGenerator.prototype.travis = function travis() {
  this.copy('travis.yml', '.travis.yml');
};

MeanMinimalGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

MeanMinimalGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

MeanMinimalGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

MeanMinimalGenerator.prototype.app = function app() {
  this.mkdir('app');  
  this.mkdir('config');
  this.mkdir('public');
  
  this.template('_gruntFile.js', 'gruntFile.js');
  this.template('index.html', 'index.html');

  this.template('_bower.json', 'bower.json');
  this.template('_config.json', 'config.json');
  this.template('_package.json', 'package.json');
};

MeanMinimalGenerator.prototype.configSetup = function configSetup() {
  this.mkdir('config');
  this.mkdir('config/env');
  this.mkdir('config/middlewares');

  this.copy('config/env/all.js');
  this.template('config/env/development.json');
  this.template('config/env/production.json');
  this.template('config/env/test.json');
  this.template('config/env/travis.json');

  this.copy('config/config.js');
  this.copy('config/express.js');
  this.copy('config/routes.js');
};

MeanMinimalGenerator.prototype.publicSetup = function publicSetup() {

  this.mkdir('public');
  this.mkdir('public/js');
  this.mkdir('public/js/controllers');
  this.mkdir('public/js/services');
  this.mkdir('public/views');
};


MeanMinimalGenerator.prototype.angularSetup = function angularSetup() {

  this.copy('public/js/controllers/index.js');
  this.copy('public/js/app.js');
  this.copy('public/js/config.js');
  this.copy('public/js/directives.js');
  this.copy('public/js/filters.js');
  this.copy('public/js/init.js');
};

MeanMinimalGenerator.prototype.templateSetup = function templateSetup() {

  this.copy('public/views/index.html');

  this.copy('public/humans.txt');
  this.copy('public/robots.txt');
};

MeanMinimalGenerator.prototype.serverSetup = function serverSetup() {
  this.copy('_server.js', 'server.js');
};