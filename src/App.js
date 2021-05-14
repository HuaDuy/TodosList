// *** Import CSS ***
import './App.css';
import './css/Todo.css'

// *** Import components ***
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

// *** Import thư viện ***
import { PureComponent } from 'react';


// ***** Tạo hàm isNotCheckedAll *****

// Kiểm tra trạng thái completed của các todo truyền vào

const isNotCheckedAll = (todos = []) => todos.find(todo => !todo.isCompleted);

const filterStatus = (todos = [], status = '', id = '') => {
    switch (status) {
      case 'ACTIVE':
        return todos.filter(todo => !todo.isCompleted);
      case 'COMPLETED':
        return todos.filter(todo => todo.isCompleted);
      case 'REMOVE':
        return todos.filter(todo => todo.id !== id)
      default:
        return todos;
    }
  }

//  ***** Tạo class App kế thừa từ PureComponent để render lại component khi props hoặc state thay đổi

class App extends PureComponent {

  // ***** Tạo State *****

  state = {
    todosList: [
      {
        id: 1,
        text: 'todo 1',
        isCompleted: false
      },
      {
        id: 2,
        text: 'todo 2',
        isCompleted: false
      }
    ],
    todoEditingId: '',
    isCheckedAll: false,
    status: 'ALL'
  };


  // ***** Phương thức thêm Todo mới *****

  // Truyền tham số todo cần thêm rồi dùng spread operator để thêm vào mảng todosList trong State

  addTodo = (todo = {}) => {
    this.setState(preState => (
      {
        todosList: [...preState.todosList, todo]
      }
    ))
  };

  
  // ***** Phương thức để lấy id của todo đang edit *****

  // Truyền vào tham số ID rồi cập nhật lại todoEditingId trong State bằng với id truyền vào

  getTodoEditing = (id = '') => {
    this.setState({ todoEditingId: id })
  };

  //  ***** Phương thức cập nhật giá trị của todo trong State *****

  // Truyền vào 2 giá trị là todo đang chỉnh sửa và index của todo đó
  // Sử dụng destructuring để lấy giá trị todosList trong State truyền vào biến list
  // Sử dụng phương thức splice ( 3 tham số là index để lấy vị trí của todo đó trong State, 1 để thay đổi 1 phần tử, todo là giá trị thay đổi ) để thay đổi giá trị của list
  // Sử dụng setState để update lại giá trị của todosList trong State và reset lại giá trị của todoEditingId

  onEditTodo = (todo = {}, index = -1) => {
    if (index >= 0) {
      const { todosList: list } = this.state;
      list.splice(index, 1, todo);
      this.setState({ todosList: list, todoEditingId: '' })
    }
  };

  // ***** Phương thức để cập nhật trạng thái checked của todo *****

  // Tham số truyền vào là id của todo
  // Sử dụng destructuring để lấy giá trị todosList trong State
  // Tạo ra biến updateList chứa các todo thay đổi sử dụng map để lặp qua các phần tử trong mảng sau đó dùng toán tử 3 ngôi để kiểm tra 
  // Nếu id được select trùng với id trong State thì update giá trị của isCompleted bằng giá trị ngược lại của nó
  // Nếu id không trùng khớp thì trả lại nguyên todo đó
  // Dùng phương thức setState để update lại dữ liệu của todosList = updateList và isCheckedAll = !isNotCheckedAll(updatedList) ( Tiến hành kiểm tra lại trạng thái checkedAll với mảng sau khi update )
  markCompleted = (id = '') => {
    const { todosList } = this.state;
    const updatedList = todosList.map(todo => todo.id === id ? ({ ...todo, isCompleted: !todo.isCompleted }) : todo)
    this.setState(() => ({
      todosList: updatedList,
      isCheckedAll: !isNotCheckedAll(updatedList)
    }))
  };


  checkAllTodo = () => {
    const { todosList, isCheckedAll } = this.state;
    this.setState(preState => ({
      todosList: todosList.map((todo => ({ ...todo, isCompleted: !isCheckedAll }))),
      isCheckedAll: !preState.isCheckedAll
    }))
  };

  setStatusFilter = (status) => {
    this.setState({ status })
  };

  removeTodo = (id = '') => {
    this.setState(prevState => ({
      todosList: filterStatus(prevState.todosList, 'REMOVE', id)
    }))
  };

  // ***** Phương thức Render để chạy app *****
  render() {
    // Sử dụng destructuring để lấy các giá trị todosList todoEditingId isCheckedAll status trong State để truyền vào component thông qua props
    const { todosList, todoEditingId, isCheckedAll, status } = this.state;
    console.log(status);
    return (
      <div className="todoapp">

        {/* Call lại component Header */}

        <Header
          addTodo={this.addTodo}
          isCheckedAll={isCheckedAll}
        />

        {/* Call lại component TodoList*/}

        <TodoList
          todosList={filterStatus(todosList, status)}
          getTodoEditing={this.getTodoEditing}
          todoEditingId={todoEditingId}
          onEditTodo={this.onEditTodo}
          markCompleted={this.markCompleted}
          isCheckedAll={isCheckedAll}
          checkAllTodo={this.checkAllTodo}
          removeTodo={this.removeTodo}
        />

        {/* Call lại component Footer */}
        <Footer
          status={status}
          setStatusFilter={this.setStatusFilter}
        />
      </div>
    );
  }
}

export default App;
