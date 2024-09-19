import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
// setupTests.js or setupTests.ts
import "@testing-library/jest-dom";

describe("todo app test", () => {
  const handleUpdateTask = jest.fn();

  it("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText("Add +");
    expect(linkElement).toBeInTheDocument();
    expect(screen.getByTestId("todoInput")).toBeInTheDocument();
  });

  it("should display todo once clicked on Add", () => {
    render(<App />);
    fireEvent.change(screen.getByTestId("todoInput"), {
      target: { value: "Test Todo" },
    });
    let btn = screen.getByTestId("addBtn");
    fireEvent.click(btn);
    let todo = screen.getByTestId("todoElem");
    expect(todo).toBeInTheDocument();
  });

  it("should display update when clicked on edit", () => {
    render(<App />);
    fireEvent.change(screen.getByTestId("todoInput"), {
      target: { value: "Test Todo" },
    });
    let btn = screen.getByTestId("addBtn");
    fireEvent.click(btn);

    let editBtn = screen.getByTestId("editBtn");
    fireEvent.click(editBtn);

    expect(screen.getByText("Update")).toBeInTheDocument();
  });

  it("should delete item when clicked on delete", () => {
    render(<App />);
    fireEvent.change(screen.getByTestId("todoInput"), {
      target: { value: "Test Todo" },
    });
    fireEvent.click(screen.getByTestId("addBtn"));
    let todo = screen.getByTestId("todoElem");
    fireEvent.click(screen.getByText("Delete"));
    expect(todo).not.toBeInTheDocument();
  });

  it("should delete all items when clicked on deleteAll", () => {
    render(<App />);
    fireEvent.change(screen.getByTestId("todoInput"), {
      target: { value: "Test Todo1" },
    });

    fireEvent.click(screen.getByTestId("addBtn"));

    let todo = screen.getByTestId("todoElem");
    fireEvent.click(screen.getByText("Delete All"));
    expect(todo).not.toBeInTheDocument();
  });

  it("should check for multiple todo items ", () => {
    render(<App />);
    fireEvent.change(screen.getByTestId("todoInput"), {
      target: { value: "Test Todo1" },
    });

    fireEvent.click(screen.getByTestId("addBtn"));
    fireEvent.change(screen.getByTestId("todoInput"), {
      target: { value: "Test Todo2" },
    });
    fireEvent.click(screen.getByTestId("addBtn"));
    let todo = screen.getAllByTestId("todoElem");
    fireEvent.click(screen.getByText("Delete All"));
    expect(todo.length).toBe(2);
  });

  it("should check cancel button ", () => {
    render(<App />);
    fireEvent.change(screen.getByTestId("todoInput"), {
      target: { value: "task" },
    });

    fireEvent.click(screen.getByTestId("addBtn"));

    let editBtn = screen.getByTestId("editBtn");
    fireEvent.click(editBtn);
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("should edit data", () => {
    render(<App />);
    fireEvent.change(screen.getByTestId("todoInput"), {
      target: { value: "task" },
    });
    fireEvent.click(screen.getByTestId("addBtn"));
    let editBtn = screen.getByTestId("editBtn");
    fireEvent.click(editBtn);
    fireEvent.change(screen.getByTestId("todoInput"), {
      target: { value: "updated task" },
    });
    fireEvent.click(screen.getByText("Update"));
    expect(screen.getByText("updated task")).toBeInTheDocument();
  });

  it("should cancel the todo edit", () => {
    render(<App />);
    fireEvent.change(screen.getByTestId("todoInput"), {
      target: { value: "task" },
    });
    fireEvent.click(screen.getByTestId("addBtn"));
    let editBtn = screen.getByTestId("editBtn");
    fireEvent.click(editBtn);
  
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText('task')).toBeInTheDocument();
    expect(screen.getByTestId('todoInput').value).toBe('');
  });


  it('disables add button when input is empty', () => {
    render(<App />);
    
    const addButton = screen.getByTestId('addBtn');
    expect(addButton).toBeDisabled();
  });

  it("should clear the text when item deleted", () => {
    render(<App />);
    fireEvent.change(screen.getByTestId("todoInput"), {
      target: { value: "task" },
    });
    fireEvent.click(screen.getByTestId("addBtn"));
    let editBtn = screen.getByTestId("editBtn");
    fireEvent.click(editBtn);
  
    fireEvent.click(screen.getByText("Delete"));
  
    expect(screen.getByTestId('todoInput').value).toBe('');
  });


  it("should check for checked box", () => {
    render(<App />);
    fireEvent.change(screen.getByTestId("todoInput"), {
      target: { value: "task" },
    });
    fireEvent.click(screen.getByTestId("addBtn"));
    expect(screen.getByTestId('checkbox')).toBeInTheDocument();
  });
  it("should be checked when clicked", () => {
    render(<App />);
    fireEvent.change(screen.getByTestId("todoInput"), {
      target: { value: "task" },
    });
    fireEvent.click(screen.getByTestId("addBtn"));
    fireEvent.click(screen.getByTestId('checkbox'))
    expect(screen.getByTestId('checkbox')).toBeChecked();
  });

});
