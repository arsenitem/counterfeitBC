import React, {useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Link} from 'react-router-dom'
import { Grid, TextField, Button,} from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import EmptyLayout from '../../components/Layout/EmptyLayout/EmptyLayout'
import formStyles from './LoginPage.module.scss'
import {loginUser} from '../../store/user'
import {IState} from '../../store'

const mapState = (state: IState) => ({
    isLoading: state.user.isLoadingUser,
    error: state.user.error
})

const mapDispatch = {
    loginUser,
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type ILoginPageProps = PropsFromRedux & {}

function LoginPage(props: ILoginPageProps) {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onSubmit = () => {
        props.loginUser({
            email,
            password
        })
    }
    return (
        <EmptyLayout>
            <div className={formStyles['form-container']}>
                <div className={formStyles['form-container__header']}>
                    <h1>Войти</h1>
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
                        <Fingerprint />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="username" label="Пароль" type="password" fullWidth required />
                    </Grid>
                </Grid>
                <Grid container justify="flex-end" style={{ marginTop: '24px' }}>
                    <Button color="primary">
                        <Link style={{color: 'inherit', textDecoration: 'none'}} to="/signup">Регистрация</Link>
                    </Button>
                
                    <Button onClick={() => onSubmit()} style={{ marginLeft: '24px' }} variant="contained" color="primary">
                        Войти
                    </Button>
                </Grid>
            </div>
        </EmptyLayout>
    );
}


export default connector(LoginPage)
