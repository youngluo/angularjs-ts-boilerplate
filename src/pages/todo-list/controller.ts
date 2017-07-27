export default class TodoListCtrl {
    todos = []
    id: number = 0
    todo: string
    todoTypes = ['All', 'Todo', 'Done']
    visibleType: string = 'All'

    handleSubmit(e): void {
        if (e.keyCode !== 13) return

        this.todos.push({
            id: ++this.id,
            text: this.todo,
            complete: false
        })
        this.todo = ''
    }

    toggleTodo(curTodo): void {
        this.todos.forEach(todo => {
            if (curTodo.id === todo.id) {
                todo.complete = !todo.complete
            }
        })
    }

    toggleType(type: string): void {
        this.visibleType = type
    }
}