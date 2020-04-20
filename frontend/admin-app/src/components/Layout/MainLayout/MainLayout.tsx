import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom'
import { makeStyles, useTheme,createStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import layoutStyles from './MainLayout.module.scss'

import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import { Avatar } from '@material-ui/core';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7),
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export default function MainLayout(props: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={layoutStyles['toolbar-container']}>
            <Typography variant="h6" noWrap>
              Контрафактор
            </Typography>
            <Avatar>H</Avatar>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <Toolbar />
        <div className={layoutStyles['drawer-container']}>
          <div className={layoutStyles['drawer-container__company']}>
            <Avatar 
              alt="Remy Sharp" 
              src="https://source.unsplash.com/random/400x400" 
              className={ clsx(
                layoutStyles['drawer-container__company-logo'],
                {[layoutStyles['drawer-container__company-logo--small'] ]: !open}
                )} 
            />
            {open && (
              <h3 className={layoutStyles['drawer-container__company-name']}>ООО Тушёная тушёнка</h3>
            )}
          </div>
          <Divider/>
          <div className={layoutStyles['drawer-container__navigation']}>
            <List>
              <ListItem button component={Link} to="/company">
                <ListItemIcon><BusinessOutlinedIcon/></ListItemIcon>
                <ListItemText primary={'Компания'} />
              </ListItem>
              <ListItem button component={Link} to="/team">
                <ListItemIcon><PeopleOutlineIcon/></ListItemIcon>
                <ListItemText primary={'Команда'} />
              </ListItem>
              <ListItem button component={Link} to="/products">
                <ListItemIcon><ListAltOutlinedIcon /></ListItemIcon>
                <ListItemText primary={'Товары'} />
              </ListItem>
              <ListItem button component={Link} to="/templates">
                <ListItemIcon><FileCopyOutlinedIcon /></ListItemIcon>
                <ListItemText primary={'Шаблоны'} />
              </ListItem>
            </List>
          </div>
          <div className={layoutStyles['drawer-container__footer']}>
            <Divider/>
            <List>
              <ListItem button onClick={() => setOpen(!open)}>
                <ListItemIcon>{!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}</ListItemIcon>
                <ListItemText primary={'Свернуть'} />
              </ListItem>
              <ListItem button component={Link} to="/login">
                <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                <ListItemText primary={'Выйти'} />
              </ListItem>
            </List>
          </div>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <div className={layoutStyles['content-container']}>
          {props.children}
        </div>
      </main>
    </div>
  );
}
