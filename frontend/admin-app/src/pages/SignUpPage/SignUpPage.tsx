import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {connect, ConnectedProps} from 'react-redux';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import EmptyLayout from '../../components/Layout/EmptyLayout/EmptyLayout'
import formStyles from './SignUpPage.module.scss'
import {signUpUser} from '../../store/user'
import {IState} from '../../store'

const mapState = (state: IState) => ({
    isLoading: state.user.isLoadingUser,
    error: state.user.error
})

const mapDispatch = {
    signUpUser,
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type ISignUpPageProps = PropsFromRedux & {}


function SignUpPage(props: ISignUpPageProps) {
    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onSubmit = () => {
        props.signUpUser({
            email,
            name,
            surname,
            password
        })
    }
    return (
        <EmptyLayout>
            <div className={formStyles['form-container']}>
                <div className={formStyles['form-container__header']}>
                    <h1>Регистрация</h1>
                </div>
                <Grid container spacing={4} alignItems="flex-end">
                    <Grid item>
                        <Face />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="username" label="Email" type="email" fullWidth autoFocus required />
                    </Grid>
                </Grid>
                <Grid container spacing={4} alignItems="flex-end">
                    <Grid item>
                        <div className={formStyles['icon']}> <Face/></div>
                        
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="username" label="Имя" type="text" fullWidth autoFocus required />
                    </Grid>
                </Grid>
                <Grid container spacing={4} alignItems="flex-end">
                    <Grid item>
                        <div className={formStyles['icon']}> <Face/></div>
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="username" label="Фамилия" type="text" fullWidth autoFocus required />
                    </Grid>
                </Grid>
                <Grid container spacing={4} alignItems="flex-end">
                    <Grid item>
                        <Fingerprint />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="username" label="Пароль" type="password" fullWidth required />
                    </Grid>
                </Grid>
                <Grid container spacing={4} alignItems="flex-end">
                    <Grid item>
                        <div className={formStyles['icon']}> <Fingerprint/></div>
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="username" label="Повторите пароль" type="password" fullWidth required />
                    </Grid>
                </Grid>
                <Grid container justify="flex-end" style={{ marginTop: '24px' }}>
                    <Button color="primary">
                        <Link style={{color: 'inherit', textDecoration: 'none'}} to="/login">Войти</Link>
                    </Button>
                    <Button style={{ marginLeft: '24px' }} variant="contained" color="primary">
                        Зарегистрироваться
                    </Button>
                </Grid>
            </div>
        </EmptyLayout>
    );
}


export default connector(SignUpPage)
