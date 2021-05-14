import Todo from './Todo'

// ***** Lấy danh sách các todo *****

const TodoList = (props) => {

    // Lấy todosList và  isCheckedAll từ props được truyền từ App.js

    const { todosList, isCheckedAll, checkAllTodo } = props;
    return (
        <section className="main">
            <input
                className="toggle-all"
                type="checkbox"
                checked={isCheckedAll}
            />
               
            <label htmlFor="toggle-all"  onClick={checkAllTodo} />
            <ul className="todo-list">
                {
                    // Sử dụng map để call danh sách component Todo 
                    todosList.map((todo, index) =>
                        <Todo
                            key={`todo${todo.id}`}
                            todo={todo} {...props}
                            index={index}
                        />)
                }
            </ul>
        </section>
    )
}

export default TodoList
