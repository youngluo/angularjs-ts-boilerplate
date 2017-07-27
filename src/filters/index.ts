import angular = require('angular')
import todosVisible from './todosVisible'

export default angular
    .module('filters', [])
    .filter('todosVisible', () => todosVisible)
    .name
