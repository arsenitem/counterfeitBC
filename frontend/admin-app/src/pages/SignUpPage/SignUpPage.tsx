import React from 'react';
import {Link} from 'react-router-dom'
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import EmptyLayout from '../../components/Layout/EmptyLayout/EmptyLayout'
import formStyles from './SignUpPage.module.scss'



function SignUpPage(props: any) {

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
                        <Face />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="username" label="Имя" type="text" fullWidth autoFocus required />
                    </Grid>
                </Grid>
                <Grid container spacing={4} alignItems="flex-end">
                    <Grid item>
                        <Face />
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
                        <Fingerprint />
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
                        <Link style={{color: 'inherit', textDecoration: 'none'}} to="/products">Зарегистрироваться</Link>
                    </Button>
                    {/* <Button style={{ marginLeft: '24px' }} variant="contained" color="primary">
                        Зарегистрироваться
                    </Button> */}
                </Grid>
            </div>
        </EmptyLayout>
    );
}


export default SignUpPage
