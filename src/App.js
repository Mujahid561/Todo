import React, { useEffect, useRef, useState } from "react";
import Todos from "./Todod";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editEnable, seteditEnable] = useState(false);
  const [activeEdit, setActiveEdit] = useState(null);
  const [comp, setComp] = useState(false);

  const inputref = useRef();

  const handleAdd = () => {
    if (text !== "") {
      setTodos([...todos, { id: new Date(), task: text, completed: false }]);
      setText("");
    }
  };

  const handleDelete = (id) => {
    let filteredData = todos.filter((elem) => {
      return elem.id !== id;
    });
    if (id === activeEdit) {
      setText("");
      handleResetState();
    }
    setTodos(filteredData);
  };
  const handleResetState = () => {
    setActiveEdit(null);
    seteditEnable(false);
  };
  const handleEdit = (id) => {
    inputref.current.focus();
    setActiveEdit(id);
    seteditEnable(!editEnable);
    let filteredData = todos.filter((elem) => {
      return elem.id === id;
    });
    setText(filteredData[0].task);
  };

  const handleUpdateTask = (id) => {
    if (text !== "") {
      const filteredData = todos.map((elem) => {
        if (elem.id === id) {
          return { task: text, id: id };
        } else {
          return elem;
        }
      });
      setTodos(filteredData);
      handleResetState();
      setText("");
    }
  };
  const handleCancel = () => {
    setText("");
    handleResetState();
  };

  const handleClear = () => {
    setTodos([]);
    setText("");
    handleResetState();
  };

  const handleCompleted = (id) => {
    const updateCompletedData = todos.map((elem) => {
      if (elem.id === id) {
        return { task: elem.task, id: id, completed: !elem?.completed };
      } else {
        return elem;
      }
    });

    setTodos(updateCompletedData);
  };
  useEffect(() => {
    let temp=  todos.some((ele) => {
      return ele?.completed === true;
    })
    setComp(temp)
  }, [todos]);

  let btnstyle = "bg-blue-500 text-white rounded px-4 py-2";
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <header className="text-2xl font-bold mb-4">Todo Application</header>
      <main className={`flex flex-col items-center  pb-3`}>
        <div className="flex space-x-2">
          <input
            className="border rounded p-2"
            placeholder="Enter Todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={inputref}
            data-testid="todoInput"
          />
          {editEnable === false ? (
            <button
              tabIndex={2}
              className={btnstyle}
              onClick={handleAdd}
              disabled={text === ""}
              data-testid="addBtn"
            >
              Add +
            </button>
          ) : (
            <div>
              <button
                className={btnstyle}
                onClick={() => handleUpdateTask(activeEdit)}
                disabled={text === ""}
              >
                Update
              </button>
            </div>
          )}
        </div>

        {todos?.length > 0 && (
          <div className=" w-[100%] mt-2">
            <button className={`${btnstyle} bg-black  `} onClick={handleClear}>
              Delete All
            </button>
          </div>
        )}
        <div className="mt-3 w-[100%] pb-3">
          {todos &&
            todos.map((elem) => {
              if (elem?.completed !== true) {
                return (
                  <Todos
                    elem={elem}
                    key={elem.id}
                    btnstyle={btnstyle}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    editEnable={editEnable}
                    activeEdit={activeEdit}
                    handleCancel={handleCancel}
                    handleCompleted={handleCompleted}
                  />
                );
              }
            })}
        </div>
        {comp === true && (
          <div className="w-[100%]  pt-3  ">
            <h1 className="text-gray-400 pb-3">
              
              ---------- Completed Todos ----------
            </h1>
            <div>
              {todos &&
                todos.map((elem) => {
                  if (elem?.completed === true) {
                    return (
                      <Todos
                        elem={elem}
                        key={elem.id}
                        btnstyle={btnstyle}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        editEnable={editEnable}
                        activeEdit={activeEdit}
                        handleCancel={handleCancel}
                        handleCompleted={handleCompleted}
                      />
                    );
                  }
                })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;



