import React, {useState, useEffect, useReducer} from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {value: action.val, isValid: action.val.includes('@')};
    }
    if (action.type === 'INPUT_BLUR') {
        return {value: state.value, isValid: state.value.includes('@')};
    }
    return {value: '', isValid: false};
};


const Login = (props) => {
    // removed for reducer
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: null,
    });


    useEffect(() => {
        console.log('EFFECT RUNNING');

        return () => {
            console.log('EFFECT CLEANUP');
        };
    }, []);

    // useEffect(() => {
    //     const identifier = setTimeout(() => {
    //         console.log('Checking form validity!');
    //         setFormIsValid(
    //             enteredEmail.includes('@') && enteredPassword.trim().length > 6
    //         );
    //     }, 500);
    //     return () => {
    //         console.log('CLEANUP');
    //         clearTimeout(identifier);
    //     };
    // }, [enteredEmail, enteredPassword]);

    const emailChangeHandler = (event) => {
        // removed for reducer
        // setEnteredEmail(event.target.value);
        dispatchEmail({type:'USER_INPUT', val: event.target.value});

        // added to useEffect instead
        setFormIsValid(
            event.target.value.includes('@') &&
                enteredPassword.trim().length > 6
        );
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
        // // added to useEffect instead
        // setFormIsValid(
        //     event.target.value.trim().length > 6 && enteredEmail.includes('@')
        // );
        // used for reducer
        setFormIsValid(
            emailState.isValid && event.target.value.trim().length > 6
        );
    };

    const validateEmailHandler = () => {
        // used in useState, removed for reducer
        // setEmailIsValid(enteredEmail.includes('@'));
        // reducer:
        // setEmailIsValid(emailState.isValid);
        dispatchEmail({type: 'INPUT_BLUR'});
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        // used in useState, removed for reducer
        // props.onLogin(enteredEmail, enteredPassword);
        props.onLogin(emailState.value, enteredPassword);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        // change from useState to Reducer
                        // emailIsValid === false ? classes.invalid : ''
                        emailState.isValid === false ? classes.invalid : ''
                    }`}>
                    <label htmlFor='email'>E-Mail</label>
                    <input
                        type='email'
                        id='email'
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordIsValid === false ? classes.invalid : ''
                    }`}>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button
                        type='submit'
                        className={classes.btn}
                        disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;



