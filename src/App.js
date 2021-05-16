import './App.css';

const joinClassNames = (...classNames) => classNames.filter(Boolean).join(' ');

const Link = ({ children, className, ...props }) => {
  const classNames = joinClassNames('link', className);

  return <a className={classNames} {...props}>{children}</a>;
}

const TextField = ({ id, label, className, question, ...inputProps }) => {
  const classNames = joinClassNames('text-field__wrapper', className);

  return (
    <>
      <label className={classNames} htmlFor={id}>
        <div className="text-field__label">{label}</div>
        <input className="text-field__input" id={id} {...inputProps} />
      </label>
    </>
  )
}

const Button = ({ children, className, ...props }) => {
  const classNames = joinClassNames('button', className);

  return (
    <button className={classNames} {...props}>{children}</button>
  )
}

const Form = ({ children, className, onSubmit: onSubmitProp, ...props }) => {
  const classNames = joinClassNames('form', className);
  const onSubmit = (e) => {
    if (!onSubmitProp) {
      return;
    }

    e.preventDefault();
    const fd = new FormData(e.target);

    onSubmitProp(Object.fromEntries(fd));
  }

  return <form className={classNames} onSubmit={onSubmit} {...props}>{children}</form>
}

const App = () => {
  return (
    <div className="wrapper">
      <Form name="login-form" onSubmit={(v) => console.warn(v)}>
        <h2 className="form__title">Войти</h2>
        <TextField required type="email" name="email" className="form__text-field" label="Email" />
        <TextField
          required
          type="password"
          name="password"
          className="form__text-field"
          label="Пароль"
        />
        <Link href="#" className="form__question">Забыли пароль?</Link>
        <Button className="form__button" type="submit">
          Войти
        </Button>
        <div>
          Новый пользователь? <Link href="#">Регистрация</Link>
        </div>
      </Form>
    </div>
  );
}

export default App;
