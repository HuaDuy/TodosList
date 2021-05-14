import { useState } from 'react';
const Todo = (props) => {
    const [text, setText] = useState(' ');
    const { todo, todoEditingId, getTodoEditing, onEditTodo, index, markCompleted, removeTodo } = props;
    const isEditing = todoEditingId === todo.id;
    const editTodo = () => {
        onEditTodo({
            ...todo,
            text
        }, index)
        getTodoEditing('')
    }
    return (
        <li className={`${isEditing ? 'editing' : ''} ${todo.isCompleted ? 'completed' : ''}`}>
            {!isEditing ?
                <div className="view">
                    <input
                        className="toggle"
                        onChange={() => markCompleted(todo.id)}
                        type="checkbox"
                        checked={todo.isCompleted}>
                    </input>
                    <label onDoubleClick={
                        () => { getTodoEditing(todo.id) }
                    }>
                        {todo.text}
                    </label>
                    <button className="destroy" onClick={() =>  removeTodo(todo.id) }></button>
                </div> :
                <input
                    className="edit"
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onBlur={editTodo}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && text) {
                            editTodo()
                        }
                    }}
                >
                </input>
            }
        </li>
    )
}

export default Todo
