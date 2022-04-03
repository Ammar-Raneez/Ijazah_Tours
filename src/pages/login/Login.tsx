import {
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import LoginForm from '../../organisms/login/LoginForm';
import DivAtom from '../../atoms/DivAtom';
import H2Atom from '../../atoms/H2Atom';
import ParagraphAtom from '../../atoms/ParagraphAtom';
import { login } from '../../redux/userSlice';
import { db } from '../../firebase';
import { loginStyles } from '../../styles';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [invalidLoginMessage, setInvalidLoginMessage] = useState('');

  const dispatch = useDispatch();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const widthListener = window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', widthListener as any);
    };

    return removeEventListeners();
  }, [width]);

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInvalidLoginMessage('');
    const auth = getAuth();
    setIsLoggingIn(true);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userData = (await getDocs(collection(db, `Team Members`)))
        .docs.find((doc) => doc.get('email') === user.email)?.data();
      dispatch(
        login(userData),
      );
    } catch (err) {
      setInvalidLoginMessage('Invalid Credentials');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <DivAtom style={loginStyles.wrapper}>
      <DivAtom
        style={{
          ...loginStyles.formContainer,
          width: width < 1100 ? '80%' : '25%',
          height: 'auto',
        }}
      >
        <H2Atom
          text="Welcome Back"
          style={loginStyles.title}
        />
        <ParagraphAtom
          text="Login to your account"
          style={loginStyles.subtitle}
        />

        <LoginForm
          width={width}
          email={email}
          password={password}
          invalidLoginMessage={invalidLoginMessage}
          rememberMe={rememberMe}
          isLoggingIn={isLoggingIn}
          onLogin={onLogin}
          setEmail={setEmail}
          setPassword={setPassword}
          setRememberMe={setRememberMe}
        />
      </DivAtom>
    </DivAtom>
  );
}

export default Login;
