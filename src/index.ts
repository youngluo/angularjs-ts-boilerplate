/// <reference path='./typings.d.ts'/>

import './index.scss'
import angular = require('angular')
import uiRouter from '@uirouter/angularjs'
import router from './config/routes.config'
import components from './components'
import pages from './pages'

angular
    .module('app', [
        uiRouter,
        components,
        pages
    ])
    .config(router)

angular.bootstrap(document, ['app'])