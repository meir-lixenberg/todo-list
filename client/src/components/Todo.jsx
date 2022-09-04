import "./Todo.css";

import * as React from "react";
import { useQuery, useQueryClient } from "react-query";

import { Modal } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TodoForm from "./TodoForm";
import edit_note from "../edit_note_black_24dp.svg";
import delete_black from "../delete_black_24dp.svg";

export default function Todo() {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  let { isLoading, error, data } = useQuery("todos", () =>
    fetch(process.env.REACT_APP_SERVER_URL + "/todo/list").then((res) =>
      res.json().then((r) => r.data)
    )
  );
  const methodProp = React.useRef(null);
  const updatedTodoData = React.useRef({});
  const setUpdatedTodoData = (data) => {
    setOpen(false);
    const { category, text, priority } = data;
    updatedTodoData.current = { category, text, priority };
    if (methodProp.current === "addTodo") {
      addTodo();
    } else {
      updateTodo();
    }
    updatedTodoData.current = {};
    methodProp.current = null;
  };

  const addTodo = async () => {
    methodProp.current = "addTodo";
    const { category, text, priority } = updatedTodoData.current;

    if (!category || !text || !priority) {
      return setOpen(true);
    }

    const data = { category, text, priority };
    await fetch(process.env.REACT_APP_SERVER_URL + "/todo/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    queryClient.invalidateQueries("todos");
  };

  const deleteTodo = async (_id) => {
    await fetch(process.env.REACT_APP_SERVER_URL + "/todo/" + _id, {
      method: "DELETE",
    });
    queryClient.invalidateQueries("todos");
  };

  const updateTodo = async (_id) => {
    _id
      ? (methodProp.current = `updateTodo?_id=${_id}`)
      : (_id = new URLSearchParams(
          methodProp.current.substring(methodProp.current.indexOf("?"))
        ).get("_id"));

    const { category, text, priority } = updatedTodoData.current;

    if (!category && !text && !priority) {
      return setOpen(true);
    }

    const data = { _id, category, text, priority };

    await fetch(process.env.REACT_APP_SERVER_URL + "/todo/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    queryClient.invalidateQueries("todos");
  };

  const sortTodos = (e) => {
    const selected = e.target.value;
    let func;
    if (selected === "priority") {
      func = (a, b) =>
        a.priority > b.priority ? 1 : b.priority > a.priority ? -1 : 0;
    }
    if (selected === "text") {
      func = (a, b) => a.text.localeCompare(b.text);
    }
    if (selected === "category") {
      func = (a, b) => a.category.localeCompare(b.category);
    }

    const sortedTodos = data.sort(func);

    console.log(sortedTodos);
    queryClient.setQueryData("todos", [...sortedTodos]);
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const TodoFormWrapper = React.forwardRef((props, ref) => (
    <div {...props} ref={ref}>
      <TodoForm method={methodProp.current} updateFunc={setUpdatedTodoData} />
    </div>
  ));

  return (
    <div className="todos-wrapper">
      {/** @abstract add todo and sort todo list buttons */}
      <div className="buttons">
        <Button
          onClick={() => {
            addTodo();
          }}
          variant="contained"
          disableElevation
        >
          NEW TODO
        </Button>
        <select
          onChange={(e) => {
            sortTodos(e);
          }}
          name="sort"
          id="sort"
        >
          <option value="">SORT</option>
          <option value="category">category</option>
          <option value="text">text</option>
          <option value="priority">priority</option>
        </select>
      </div>
      {/** @abstract todo list */}
      <List sx={{ width: "400px", bgcolor: "background.paper" }}>
        {data?.length &&
          data?.map((e, i) => (
            <ListItem
              key={i}
              secondaryAction={
                <Avatar>
                  <div className="edit-wrapper">
                    <img
                      onClick={() => {
                        updateTodo(e._id);
                      }}
                      src={edit_note}
                      alt="edit"
                    />
                    <img
                      onClick={() => {
                        deleteTodo(e._id);
                      }}
                      src={delete_black}
                      alt="delete"
                    />
                  </div>
                </Avatar>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <div>{e.priority}</div>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={e.category} secondary={e.text} />
            </ListItem>
          ))}
      </List>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <TodoFormWrapper></TodoFormWrapper>
      </Modal>
    </div>
  );
}
