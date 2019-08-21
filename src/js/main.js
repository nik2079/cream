import '../stylesheets/all.scss';
import Promise from 'promise-polyfill';
import 'es6-object-assign/auto'; //opject assign polyfill

if (!window.Promise) {
    window.Promise = Promise;
}