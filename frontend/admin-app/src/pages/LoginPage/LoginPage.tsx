import React from 'react';
import {Link} from 'react-router-dom'
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import EmptyLayout from '../../components/Layout/EmptyLayout/EmptyLayout'
import formStyles from './LoginPage.module.scss'



function LoginPage(props: any) {

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
                    <Button style={{ marginLeft: '24px' }} variant="contained" color="primary">
                        <Link style={{color: 'inherit', textDecoration: 'none'}} to="/products">Войти</Link>
                    </Button>
                
                    {/* <Button style={{ marginLeft: '24px' }} variant="contained" color="primary">
                        Войти
                    </Button> */}
                </Grid>
            </div>
        </EmptyLayout>
    );
}


export default LoginPage
