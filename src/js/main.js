import '../stylesheets/all.scss';
import Promise from 'promise-polyfill';
import 'es6-object-assign/auto';
import sliders from "./sliders/sliders"; //opject assign polyfill




if (!window.Promise) {
    window.Promise = Promise;
}

sliders();