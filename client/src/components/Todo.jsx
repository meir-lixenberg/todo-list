import "./Todo.css";

import * as React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import edit_note from "../edit_note_black_24dp.svg";
import delete_black from "../delete_black_24dp.svg";

export default function Todo() {
  const queryClient = useQueryClient();

  let { isLoading, error, data } = useQuery(["todos"], () =>
    fetch(process.env.REACT_APP_SERVER_URL + "/todo/list").then((res) =>
      res.json().then((r) => {
        return r.data;
      })
    )
  );

  const deleteTodo = useMutation(
    (_id) => {
      fetch(process.env.REACT_APP_SERVER_URL + "/todo/" + _id, {
        method: "DELETE",
      }).then((res) => res.json());
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["todos"]);
      },
    }
  );

  const updateTodo = useMutation(
    (_id) => {
      const category = window.prompt("category? (optional).");
      const text = window.prompt("text? (optional).");
      const priority = window.prompt("priority? (optional).");

      const data = { _id, category, text, priority };

      fetch(process.env.REACT_APP_SERVER_URL + "/todo/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["todos"]);
      },
    }
  );

  const addTodo = useMutation(
    () => {
      const category = window.prompt("category?");
      const text = window.prompt("text?");
      const priority = window.prompt("priority?");

      const data = { category, text, priority };

      fetch(process.env.REACT_APP_SERVER_URL + "/todo/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["todos"]);
      },
    }
  );

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

  return (
    <div className="todos-wrapper">
      <div className="buttons">
        <Button
          onClick={() => {
            addTodo.mutate();
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
                        updateTodo.mutate(e._id);
                      }}
                      src={edit_note}
                      alt="edit"
                    />
                    <img
                      onClick={() => {
                        deleteTodo.mutate(e._id);
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
    </div>
  );
}
