import React from "react";
import Timer from "./components/Timer";
import TodoItem from "./components/TodoItem";
import TodoInput from "./components/TodoInput";
import ClearButton from "./components/ClearButton";
import EmptyState from "./components/EmptyState";

import "./styles/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null
      // TODO 1
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      id: nextItemId,
      description,
      sessionsCompleted: 0,
      isCompleted: false
      // TODO 2: initialize new item object
    };
    this.setState(prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      items: prevState.items.concat(newItem),
      nextItemId: prevState.nextItemId + 1
    }));
  }

  clearCompletedItems() {
    // TODO 6

    // NAIVE APPROACH

    // var new_items = [];
    // this.state.items.map(item =>
    //   item.isCompleted ? null : new_items.push(item)
    // );
    // this.setState({
    //   items: new_items
    // });

    this.setState(prevState => ({
      items: prevState.items.filter(item => !item.isCompleted)
    }));
  }

  increaseSessionsCompleted(itemId) {
    // TODO 5
    var new_items = [...this.state.items];
    new_items.map(item =>
      item.id === itemId ? (item.sessionsCompleted += 1) : null
    );
    this.setState({
      items: new_items
    });
  }

  toggleItemIsCompleted(itemId) {
    // TODO 6
    var new_items = [...this.state.items];
    new_items.map(item =>
      item.id === itemId ? (item.isCompleted = !item.isCompleted) : null
    );
    this.setState({
      items: new_items
    });
  }

  startSession(id) {
    this.setState({
      itemIdRunning: id,
      sessionIsRunning: true
    });
    // TODO 4
  }

  //Helper function to check completed items
  areItemsMarkedAsCompleted() {
    var mark = false;
    this.state.items.map(item => (item.isCompleted ? (mark = true) : null));
    return mark;
  }

  render() {
    const { items, sessionIsRunning, itemIdRunning } = this.state;
    var date = new Date();
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = date.getFullYear();
    var today = month + " / " + day + " / " + year;

    return (
      <div className="flex-wrapper">
        <div className="container">
          <h3>{today}</h3>
          <header>
            <h1 className="heading">To-do List</h1>
            {this.areItemsMarkedAsCompleted() ? (
              <ClearButton onClick={this.clearCompletedItems} />
            ) : null}
          </header>
          {/* TODO 4 */

          sessionIsRunning && (
            <Timer
              key={itemIdRunning}
              mode="WORK"
              onSessionComplete={() =>
                this.increaseSessionsCompleted(itemIdRunning)
              }
              autoPlays
            />
          )}
          <div className="items-container">
            {/* TODO 3:  display todo items */
            items.map(item => (
              <TodoItem
                key={item.id}
                description={item.description}
                sessionsCompleted={item.sessionsCompleted}
                isCompleted={item.isCompleted}
                startSession={() => this.startSession(item.id)}
                toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}
              />
            ))}
          </div>
          {items.length == 0 ? <EmptyState /> : null}
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
