import { AppBar, Container, Toolbar, Typography, Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import Todoitem from "./components/Todoitem";

interface ToItemType {
  title: string;
  isCompleted: boolean;
  id: string;
}

function App() {
  const [title, setTitle] = useState<ToItemType["title"]>("");
  const [todos, setTodos] = useState<ToItemType[]>([]);

  const completeHandler = (id: ToItemType["id"]): void => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteHandler = (id: ToItemType["id"]): void => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const editHandler=(id:ToItemType["id"],title:ToItemType["title"]):void=>{
    if(title===""){
      return;
    }
    setTodos(prevTodo=>prevTodo.map(todo=>
      todo.id===id ?{...todo,title:title}:todo
    ))
  }
  const submitHandler = (): void => {
    if(title === ""){
      alert("write something")
      return;
    }
    const newTodo: ToItemType = {
      title,
      isCompleted: false,
      id: String(Math.random() * 1000),
    };
    setTodos(prev => [...prev, newTodo]);
    setTitle("");
  };

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography>ToDo App</Typography>
        </Toolbar>
      </AppBar>
      <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todos.map(i => (
          <Todoitem editHandler={editHandler} completeHandler={completeHandler} deleteHandler={deleteHandler} key={i.id} todo={i} />
        ))}
      </Stack>
      <TextField required value={title} onChange={e => setTitle(e.target.value)} fullWidth label={"New Task"} onKeyDown={(e)=>{if(e.key === "Enter") {if(title!=='')submitHandler()}}} />
      <Button onClick={submitHandler} fullWidth sx={{ marginTop: "1rem", padding: "1rem" }} disabled={title === ''} variant="contained">
        ADD
      </Button>
    </Container>
  );
}

export default App;
