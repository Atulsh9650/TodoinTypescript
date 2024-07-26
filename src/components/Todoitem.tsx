import { Button, Checkbox, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

// Ensure ToItemType is defined or imported correctly
interface ToItemType {
  title: string;
  isCompleted: boolean;
  id: string;
}

type PropsType = {
  todo: ToItemType;
  deleteHandler: (id: ToItemType["id"]) => void;
  completeHandler: (id: ToItemType["id"]) => void;
  editHandler:(id:ToItemType["id"],title:ToItemType["title"])=>void;
};

const Todoitem = ({ todo, deleteHandler, completeHandler , editHandler }: PropsType) => {

    const [editActive,seteditActive]=useState<boolean>(false);
    const [textval,settextval]=useState<ToItemType["title"]>(todo.title);

    const editbtn=(id:ToItemType["id"],title:ToItemType["title"])=>{
        editHandler(id,title);
        seteditActive(!editActive);
    }

  return (
    <Paper variant="elevation" sx={{ padding: "1rem", marginBottom: "1rem" }}>
      <Stack direction="row" alignItems="center" justifyContent={"space-between"}>
        {editActive ? (
            <TextField  value={textval} onChange={(e)=>settextval(e.target.value)}/>
        ):(
        <Typography marginRight={"auto"} sx={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
          {todo.title}
        </Typography>
        )
        }
        
        <Stack direction="row" alignItems="center" spacing={1} marginLeft={"5px"}>
          
          {editActive ?(
            <>
                <Button  variant="outlined" color="primary" onClick={()=>{editbtn(todo.id,textval)}}>
                 Save
               </Button>
               <Button  variant="outlined" color="primary" onClick={()=>{seteditActive(!editActive)}}>
                 Cancel
               </Button>
               </>
            ):(
                <>
                <Checkbox checked={todo.isCompleted} onChange={() => completeHandler(todo.id)} />
                <Button  variant="outlined" color="primary" onClick={()=>seteditActive(!editActive)}>
                Edit
              </Button>
                </>
              
            )}
          
          <Button variant="contained" color="secondary" onClick={() => deleteHandler(todo.id)}>
            Delete
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default Todoitem;
