/// <reference path='./type.d.ts'/>

import './index.scss'
import angular = require('angular')
import uiRouter from '@uirouter/angularjs'
import router from './config/routes.config'
import components from './components'
import pages from './pages'
import filters from './filters'

angular
  .module('app', [
    uiRouter,
    components,
    pages,
    filters
  ])
  .config(router)

angular.bootstrap(document, ['app'])

if (module.hot) {
  module.hot.accept()
}
