import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function TodoForm(props) {
  const { method, updateFunc } = props;

  const [todoData, setTodoData] = React.useState({
    category: "",
    text: "",
    priority: 0,
  });

  const submitForm = () => {
    updateFunc(todoData);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box
      component="form"
      sx={{ ...style, "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        value={todoData.category}
        onChange={(e) => {
          todoData.category = e.target.value;
          setTodoData({ ...todoData });
        }}
        required={method === "addTodo" ? true : false}
        type="text"
        label="Category"
      />
      <TextField
        value={todoData.text}
        onChange={(e) => {
          todoData.text = e.target.value;
          setTodoData({ ...todoData });
        }}
        required={method === "addTodo" ? true : false}
        type="text"
        label="Text"
      />
      <TextField
        value={todoData.priority}
        onChange={(e) => {
          todoData.priority = e.target.value;
          setTodoData({ ...todoData });
        }}
        required={method === "addTodo" ? true : false}
        type="number"
        label="Priority"
      />
      <Button onClick={submitForm} variant="contained" component="button">
        Update
      </Button>
    </Box>
  );
}
