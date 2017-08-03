# 用typescript开发AngularJS应用

> 考虑到一些老的项目仍在使用AngularJS 1.x开发，而Angular 2+优先使用typescript开发，所以打算使用typescript来开发AngularJS 1.x的应用，希望能够对以后升级到Angular 2+有所帮助。 

其实使用typescript开发和使用ES6开发基本是一致的，关键是我们可以使用新的特性、更简洁的语法来进行代码层面的优化。这篇文章主要介绍了在代码实践方面的一些心得。

## 模块

我们可以将各个功能模块进行分组，使用一个包含`.module()`的外壳来进行包装，把module的name属性export出去。

示例:

pages模块定义

```
import angular = require('angular')

export default angular
    .module('pages', [])
    .name
```

在项目的入口文件index.ts中引用pages模块

```
import angular = require('angular')
import pages from './pages'

angular.module('app', [pages])
angular.bootstrap(document, ['app'])
```

## 组件

AngularJS 1.5+提供了component方法，弥补了基于组件层面开发的不足，该方法接收两个参数，第一个是组件名称，第二个是定义组件的配置项（本质上是简化版的指令定义对象）。

示例：

```
// home.component.ts

import ctrl from './controller'
import html from './index.html'
import './index.scss'

export default {
    template: html,
    controller: ctrl
}
````

在pages模块中注册组件

```
import angular = require('angular')
import Home from './home'

export default angular
    .module('pages', [])
    .component('home', Home)
    .name
```

组件的定义我是直接将配置项导出，把html模板文件和controller分离到单独的文件中进行开发；一个完整的组件还得需要管理自己的样式，我们可以将它import进来，和模板文件一样通过webpack来进行打包管理。

## controller和service

controller和service方法的第二个参数都是接收一个构造函数，所以可以直接export一个class。

service.ts实现

```
export default class LogService {
    info(info) {
        console.log(info)
    }
}
```

controller.ts实现

```
export default class HomeCtrl {}
```

在pages模块中注册service

```
import log from '../services/log.service'

export default angular
    .module('pages', [])
    .component('home', Home)
    .service('log', log)
    .name
```

由于controller是直接在组件中使用的，所以不再需要在module下注册。

## directive和factory

directive和factory的使用方式也是一致的（前提是factory返回一个对象），都是接收一个工厂函数；唯一不同的是，directive必须返回一个指令定义对象，而factory可以返回任何数据类型。

directive.ts实现

```
export default class TipDirective {
    template = template
    restrict = 'A' // 1.5+版本建议都使用'A'，只做一些增强交互效果的操作
    scope = {};

    link (scope) {}
}
```

在module中定义

```
import tip from 'directive.ts'

export default angular
    .module('pages', [])
    .directive('tip', () => new tip()) // 通过new来返回一个实例对象
    .name
```

## 依赖注入处理

关于依赖注入的处理，我们可以通过静态属性来帮助实现注入，下面以在controller中的使用为例。

```
export default class TodoListCtrl {
    static $inject = ['log']

    constructor(private log) {
        this.log.info('info')
    }
}
```

## 类型声明文件获取

在typescript 2.0以上的版本，可通过npm获取第三方库的类型声明文件。大多数情况下，类型声明包的名字与它们npm包的名字相同，但是有@types/前缀。你也可以在[这里](http://microsoft.github.io/TypeSearch/)查找你需要的库。

例如

```
npm install --save @types/angular
```

使用

```
import angular = require('angular')
```

## 最后

以上是对近期使用typescript开发AngularJS 1.x应用的简单总结，如有错误，请及时指正。
示例项目地址[https://github.com/youngluo/angularjs-ts-boilerplate](https://github.com/youngluo/angularjs-ts-boilerplate)

## 参考文章

- [Angular 1.x和ES6的结合](https://github.com/xufei/blog/issues/29)
- [AngularJS 1.x with TypeScript (or ES6) Best Practices](https://codepen.io/martinmcwhorter/post/angularjs-1-x-with-typescript-or-es6-best-practices)






