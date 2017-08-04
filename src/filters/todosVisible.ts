export default function (todos, type: string): Array<object> {
  switch (type) {
    case 'All':
      return todos
    case 'Todo':
      return todos.filter(todo => !todo.complete)
    case 'Done':
      return todos.filter(todo => todo.complete)
    default:
      throw new Error('Unknown type ' + type)
  }
}
