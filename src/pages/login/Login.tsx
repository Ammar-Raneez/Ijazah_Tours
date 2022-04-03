import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import DivAtom from '../../atoms/DivAtom';
import H2Atom from '../../atoms/H2Atom';
import InputAtom from '../../atoms/InputAtom';
import ParagraphAtom from '../../atoms/ParagraphAtom';
import ButtonAtom from '../../atoms/ButtonAtom';
import CheckboxAtom from '../../atoms/CheckboxAtom';
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
        <form onSubmit={(e) => onLogin(e)} style={loginStyles.form}>
          <InputAtom
            placeholder="Email"
            adornmentposition="start"
            type="email"
            fullWidth={width < 768}
            value={email}
            plain="false"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            children={<MailOutlineIcon />}
            style={{ ...loginStyles.inputs, margin: '1rem 0' }}
          />
          <InputAtom
            placeholder="Password"
            adornmentposition="start"
            type="password"
            fullWidth={width < 768}
            value={password}
            plain="false"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            children={<LockOutlinedIcon />}
            style={{ ...loginStyles.inputs, marginBottom: '2rem' }}
          />
          <CheckboxAtom
            label="Remember Me"
            name="remember-me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          {invalidLoginMessage !== '' && (
            <ParagraphAtom style={loginStyles.errorMsg} text={invalidLoginMessage} />
          )}
          <ButtonAtom
            size="large"
            endicon={isLoggingIn && <CircularProgress size={20} color="inherit" />}
            disabled={isLoggingIn}
            style={loginStyles.loginBtn}
            type="submit"
            text="Sign In"
          />
        </form>
      </DivAtom>
    </DivAtom>
  );
}

export default Login;
