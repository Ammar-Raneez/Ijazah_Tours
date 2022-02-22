import ButtonAtom from './atoms/ButtonAtom';
import IconAtom from './atoms/IconAtom';
import GlobalStyle from './globalStyle';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import TextFieldAtom from './atoms/TextFieldAtom';
import { useState } from 'react';

const options = [
  { value: 'Latest to Oldest', label: 'Latest to Oldest' },
	{ value: 'Oldest to Latest', label: 'Oldest to Latest' }
]

function App() {
  const [field, setField] = useState('');
	const [sort, setSort] = useState(options[0].value);

  return (
    <div className="App">
      <GlobalStyle />
      <ButtonAtom
        backgroundcolor='#000'
        text='test'
        textcolor='#fff'
        onClick={() => console.log('he')}
        borderradius='10px'
        size='large'
      />
      <IconAtom
        onClick={() => console.log('he')}
        size="medium"
        children={<DeleteIcon />}
      />
      <TextFieldAtom
        variant="standard"
        size="small"
        adornmentPosition="start"
        label=""
        required={false}
        disabled={false}
        focused={false}
        select={false}
        onChange={(e: any) => setField(e.target.value)}
        value={field}
        error={false}
        helperText=""
        children={<SearchIcon />}
        placeholder="Search"
      />
      <TextFieldAtom
        variant="standard"
        size="small"
        adornmentPosition="end"
        label=""
        select
        onChange={(e: any) => setSort(e.target.value)}
        dropdownOptions={options}
        value={sort}
        children={<DeleteIcon />}
      />
    </div>
  );
}

export default App;
