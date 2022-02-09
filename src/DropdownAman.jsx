import {useState, useRef, useEffect, useLayoutEffect} from "react"
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {useLocalStorage} from './hooks/useLocalStorage'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const initialData = [{
  name: "Yair",
  date: "9 февраля 2022 г., 13:30",
},
{
  name: "David ",
  date: "9 февраля 2022 г., 13:31",
},
]

export function DropdownAman() {
  const inputRef = useRef();
  const [selectedCaller, setSelectedCaller] = useState()
  const [name, setName] = useState(" ");
  const [nameEdit, setNameEdit] = useState(" ");
  const [dataUser, setDataUser] = useLocalStorage('users', initialData)

  const availableData = dataUser?.find(
    (elem) => elem.name === selectedCaller
  )

  const handleChange = (e) => {
    setName(e.target.value.trim());
  };
  const handleChangeEdit = (e) => {
    setNameEdit(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const date = new Date
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const newDataUser = dataUser.concat({"name": name, "date": date.toLocaleString("ru", options)})
    setDataUser(newDataUser);
  };


  const handleEdit = (caller) => {
    console.log('caller :>> ', caller);

    const date = new Date
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };


    const newDataUser = dataUser.map(obj => {
      if (obj.name == caller.name) {
        return {"name": nameEdit, "date": date.toLocaleString("ru", options)};
      } else {
        return obj;

      }
    })
    console.log('newDataUser :>> ', newDataUser);
    setDataUser(newDataUser)
  }

  const handleDelete = (caller) => {
    const newArr = dataUser.filter(elem => elem.name !== caller.name);
    setDataUser(newArr)
  };

  return (
    <>

      <Container maxWidth="sm">
        <h2> Dropdown Callers Dates </h2>
        <TextField
          name="name"
          onChange={handleChange}
          label="name"
          variant="standard"
          color="secondary"
          focused
        />

        <Button sx={{m: 1}} variant="contained" onClick={handleSubmit}>Submit</Button>

        <Box sx={{m: 1}}>
          <FormControl sx={{width: "160px"}}          >
            <InputLabel  >Caller</InputLabel>
            <Select
              value={selectedCaller}
              label="Caller"
              onChange={(e) => setSelectedCaller(e.target.value)}
            >

              {dataUser.map((value, key) => {
                return (
                  <MenuItem value={value.name} key={key}>{value.name}</MenuItem>
                )
              })}


            </Select>
          </FormControl>
        </Box>



        <div>

          <h1>{availableData?.date}</h1>

          {availableData &&
            <span>

              <TextField
                name="name"
                onChange={handleChangeEdit}
                label="new name"
                variant="standard"
                color="secondary"
                focused
              />

              <Button sx={{mr: 1}}
                color="success" variant="contained"
                onClick={() => handleEdit(availableData)}>Edit
              </Button>

            </span>
          }


          {availableData &&
            <Button sx={{mr: 1}} color="error" variant="contained" onClick={() => handleDelete(availableData)}>Delete</Button>
          }

        </div>

      </Container>
    </>
  )
}
