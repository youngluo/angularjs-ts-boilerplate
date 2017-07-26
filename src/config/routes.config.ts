const routePathes = [
    'home'
]

const routes = routePathes.map(path => require(`../pages/${path}/route`).default)

console.log(routes)

function routerRegister() {

}

export default routerRegister