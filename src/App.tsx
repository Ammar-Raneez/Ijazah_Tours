import ButtonAtom from './atoms/ButtonAtom';
import IconAtom from './atoms/IconAtom';
import GlobalStyle from './globalStyle';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
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
    </div>
  );
}

export default App;
