import angular = require('angular')
import home from './home/home.module'

export default angular
    .module('pages', [
        home
    ])
    .name