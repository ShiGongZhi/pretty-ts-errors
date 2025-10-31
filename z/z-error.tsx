import React from "react";
import '../styles.css'
import TodoItem from "../component/todoItem";

class TodoList {
    constructor(props) {
        super(props);
        this.state =
        {
            itemList: {},
            total: 0
        }
    }

    render() {
      return (
            // TS2875
            // TS1382 见=>
            <ul id="todo-list" className="todo-app__list">
                this.state.itemList.map((item)=>(<TodoItem />));
            </ul>
        );
    }
}

class Bird extends React.Component {
  render(){
    return <img src={require('./image/bird.jpg')}>
  {/* TS1381 */}
  }
}

const root = ReactDOM.createRoot(document.getElementById('demo')).render(<Bird />);
