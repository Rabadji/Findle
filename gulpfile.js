const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const apidoc = require('gulp-apidoc');
const clear = require('clear');
const knex = require('knex');

function nodemonTask() {
  const daemon = nodemon({
    script: './index.js',
    watch: [
      'app/**/*',
      'env.json',
      'index.js',
    ],
    ignore: [
      'node_modules',
    ],
    ext: 'js json',
  });

  return daemon
    .on('start', () => {
      clear();
    })
    .on('restart', () => {
      console.warn('Application has restarted!');
    })
    .on('crash', () => {
      console.warn('Application has crashed!\n');
      daemon.emit('restart', 10);
    });
}

function apidocTask() {
  return apidoc({
    src: 'app/routes/',
    dest: 'public/docs/',
    config: './',
    debug: false,
    includeFilters: ['.*\\.js$'],
  }, () => {
  });
}

/* Tasks */
gulp.task('nodemon', nodemonTask);
gulp.task('apidoc', apidocTask);

gulp.task('migrate-up', () => {
  return knex.schema.createTable('tb_test', (table) => {
    table.increments('id').primary();

    table.string('name');
    table.boolean('is_active').defaultTo(knex.raw('true')).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
  });
});

gulp.task('default', ['nodemon', 'apidoc'], (cb) => {
  gulp.watch(['./app/routes/**/actions/*.js'], ['apidoc']);
  cb();
});
