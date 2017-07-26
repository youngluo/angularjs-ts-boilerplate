/// <reference path='./typings.d.ts'/>

import './index.scss'
import angular = require('angular')
import uiRouter from '@uirouter/angularjs'
import routes from './config/routes.config'
import components from './components'

angular
    .module('app', [
        uiRouter,
        components
    ])

angular.bootstrap(document, ['app'])