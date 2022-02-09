import {useState} from "react"
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {useLocalStorage} from './hooks/useLocalStorage'

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
  const [selectedCaller, setSelectedCaller] = useState() 
  const [name, setName] = useState(" "); 
   const [dataUser, setDataUser] = useLocalStorage('users', initialData)

  const availableData = dataUser?.find(
    (elem) => elem.name === selectedCaller
  )

  const handleChange = (e) => {
    setName(e.target.value.trim());
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

  return (
    <>

      <Container maxWidth="sm">

        <h2> Dropdown Aman </h2>

        <TextField
          name="name"
          onChange={handleChange}
          label="name"
          variant="standard"
          color="secondary"
          focused
        />

        <br /><br />
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        <br /><br />

        <div>
          <Typography variant="h5">Caller</Typography>
          <select
            placeholder="Caller"
            value={selectedCaller}
            onChange={(e) => setSelectedCaller(e.target.value)}
          >
            <option>--Choose Caller--</option>
            {dataUser.map((value, key) => {
              return (
                <option value={value.name} key={key}>
                  {value.name}
                </option>
              )
            })}
          </select>
        </div>

        <div>

          <h1>{availableData?.date}</h1>


        </div>
      </Container>
    </>
  )
}
