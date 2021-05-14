import { useState } from 'react'

// ***** Tạo component Header *****

const Header = (props) => {
    
    // Tạo ra State mới với giá trị mặc định là ''

    const [text, setState] = useState(' ');

    // Sử dụng destructuring để lấy phương thức addTodo đã truyền thông qua props ở App.js
    const { addTodo } = props;

    // Tạo ra phương thức onAddTodo 

    const onAddTodo = (e) => {

        // Khi nhấn Enter trên bàn phím và text trong State có tồn tại 
                // Tiến hành call lại phương thức addTodo và truyền vào giá trị todo muốn add sau đó reset lại State để thực hiện lại

        if (e.key === 'Enter' && text) {
            addTodo({
                id: new Date().valueOf(),
                text: text,
                isCompleted: false
            })
            setState(' ');
        };

    }
    return (
        <header className="header">
            <h1>TodosList</h1>
            <input
                placeholder="What needs to be done?"
                className="new-todo"
                value={text}
                onChange={(e) =>                            // Thêm sự kiện onchage để cập nhật lại dữ liệu đang target(text) trong State
                    setState(e.target.value)
                }                                              // Call lại funcion onAddTodo
                onKeyPress={(e) => onAddTodo(e)} />            
        </header>
    )
}

export default Header
