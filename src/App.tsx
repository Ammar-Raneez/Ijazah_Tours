import ButtonAtom from './atoms/ButtonAtom';
import GlobalStyle from './globalStyle';;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <ButtonAtom
        backgroundColor='#000'
        text='test'
        textColor='#fff'
        onClick={() => console.log('he')}
        borderRadius='10px'
      />
    </div>
  );
}

export default App;
