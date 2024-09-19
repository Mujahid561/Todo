import React from "react";

function Todos({
  elem,
  btnstyle,
  handleDelete,
  handleCompleted,
  handleEdit,
  editEnable,
  activeEdit,
  handleCancel,
}) {
  return (
    <div
      className={`${
        activeEdit === elem.id ? "bg-slate-400" : "bg-slate-200"
      }  flex px-3 py-2 justify-between items-center `}
      data-testid="todoElem"
      aria-label="todo"
      tabIndex={0}
    >
      <div>{elem.task}</div>
      <div> </div>
      <div className="flex justify-between items-center pl-5">
        <input
          className=" w-[30px] h-[30px] items-center"
          type="checkbox"
          checked={elem?.completed === true}
          value={elem?.completed}
          onChange={()=>handleCompleted(elem?.id)}
          data-testid="checkbox"
        />

        { editEnable === false || activeEdit !== elem.id ? (
          <button
            className={`${btnstyle} ml-2 `}
            onClick={() => handleEdit(elem.id)}
            disabled={editEnable === true}
            data-testid="editBtn"
          >
            Edit
          </button>
        ) : (
          <button className={`${btnstyle} ml-2 `} onClick={handleCancel}>
            Cancel
          </button>
        )}
        <button
          className={`${btnstyle} ml-2 `}
          onClick={() => handleDelete(elem.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Todos;
