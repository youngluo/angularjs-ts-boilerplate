

> 考虑到一些老的项目仍使用AngularJS 1.x开发，而Angular 2.0+优先使用typescript开发，所以我打算使用typescript来开发AngularJS 1.x的应用，以期望能稍微降低以后的迁移成本。 

其实使用typescript开发的难度并不是很大，因为代码最终都会编译成ES5的代码，更好的是我们可以使用一些更舒服的语法来进行开发。这篇文章主要介绍了在代码实践部分的一些心得。

## 模块机制

如果你还没有阅读过[这篇文章](https://github.com/xufei/blog/issues/29)，强烈推荐。正如前辈所说，我们可以把功能模块进行分组，使用一个壳子来包装，把module的name属性export出去。

示例:

pages模块定义

```
import angular = require('angular')
import log from '../services/log.service'

export default angular
	.module('pages', [])
	.service('log', log)
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

组件的定义我是直接将配置项导出，把html模板文件和controller分离到单独的文件中进行开发。

示例：

```
// root.component.ts

import ctrl from './controller'
import html from './index.html'
import './index.scss'

export default {
	template: html,
	controller: ctrl
}
````

在组件模块中注册组件

```
import angular = require('angular')
import Root from './Root'

export default angular
	.module('components', [])
	.component('root', Root)
	.name
```

## 控制器




