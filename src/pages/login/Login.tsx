import { ChangeEvent, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import DivAtom from '../../atoms/DivAtom';
import H2Atom from '../../atoms/H2Atom';
import InputAtom from '../../atoms/InputAtom';
import ParagraphAtom from '../../atoms/ParagraphAtom';
import { loginStyles } from '../../styles';
import ButtonAtom from '../../atoms/ButtonAtom';
import CheckboxAtom from '../../atoms/CheckboxAtom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    const widthListener = window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
    const heightListener = window.addEventListener('resize', () => {
      setHeight(window.innerHeight);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', widthListener as any);
      window.removeEventListener('resize', heightListener as any);
    };

    return removeEventListeners();
  }, [width]);

  const onLogin = () => {
    setIsLoggingIn(true);
    setIsLoggingIn(false);
  };

  return (
    <DivAtom style={loginStyles.wrapper}>
      <DivAtom
        style={{
          ...loginStyles.formContainer,
          width: width < 1100 ? '80%' : '25%',
          height: height < 800 ? 'auto' : '45%',
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
        <ButtonAtom
          size="large"
          endicon={isLoggingIn && <CircularProgress size={20} color="inherit" />}
          onClick={onLogin}
          disabled={isLoggingIn}
          style={loginStyles.loginBtn}
          text="Sign In"
        />
      </DivAtom>
    </DivAtom>
  );
}

export default Login;
