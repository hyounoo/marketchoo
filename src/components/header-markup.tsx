import Link from 'next/link'
import firebase from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useToggle } from 'react-use'

// Below for UI
import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'

const drawerWidth = 280
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    }
  })
)

export default function Header() {
  // Destructure user, loading, and error out of the hook.
  const [user, loading, error] = useAuthState(firebase.auth())
  const classes = useStyles()
  const theme = useTheme()
  const [openNav, setOpenNav] = useState(false)
  const [openDialogPoint, setOpenDialogPoint] = React.useState(false)

  const [isShown, setIsShown] = useToggle(false)
  const handleNavigation = (e: any) => {
    if (isShown) {
      setIsShown(false)
    }
  }

  const handleDrawerClose = () => {
    setOpenNav(false)
  }
  const handleDialogPointOpen = () => {
    setOpenDialogPoint(true)
  }
  const handleDialogPointClose = () => {
    setOpenDialogPoint(false)
  }
  const withdraw = () => {
    const message = confirm('?????? ?????? ??? ???????????? CHOO ???????????? ?????? ???????????????.\n?????? ?????????????????????????')
    if (message) {
      alert('????????? ?????????????????????.')
    }
  }

  return (
    <>
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openNav
        })}
      >
        <Toolbar className="flex justify-between">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpenNav(!openNav)}
            edge="start"
            className={clsx('', openNav && classes.hide)}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Link href="/">
            <h1>
              <a className="text-3xl font-semibold leading-none">
                <img src="/images/logo_120.svg" width={60} height={60} alt="MarketChoo" />
              </a>
            </h1>
          </Link>

          <div className="overflow w-8 h-0"></div>
          <div className="hidden lg:flex absolute top-2 right-0 mr-6">
            <Link href="/products">
              <a className="flex items-center text-white mr-6">
                <Icon className="text-lg mr-2">shopify</Icon>
                <span>??????</span>
              </a>
            </Link>
            <Link href="/events">
              <a className="flex items-center text-white mr-6">
                <Icon className="text-lg mr-2">event</Icon>
                <span>?????????</span>
              </a>
            </Link>

            {!user && (
              <Button href="/auth/signIn" variant="contained" color="primary" endIcon={<Icon>login</Icon>}>
                ?????????
              </Button>
            )}
            {user && (
              <Button
                variant="contained"
                color="primary"
                endIcon={<Icon>logout</Icon>}
                onClick={() => {
                  firebase.auth().signOut()
                }}
              >
                ????????????
              </Button>
            )}
          </div>

          {/* <p className="absolute top-0 right-0 text-xs hidden xl:block">
            Current deployed stage is: <strong className="text-red-500">{process.env.NEXT_PUBLIC_STAGE}</strong>
          </p> */}
        </Toolbar>
      </AppBar>

      {/* ??????????????? */}
      <Drawer
        className={clsx('nav', classes.drawer)}
        anchor="left"
        open={openNav}
        classes={{
          paper: 'nav__inner'
        }}
      >
        <div>
          <div className="nav__top">
            {!user && (
              <Button href="/auth/signIn" variant="contained" color="primary" endIcon={<Icon>login</Icon>}>
                ?????????
              </Button>
            )}
            {user && (
              <Button
                variant="contained"
                color="primary"
                endIcon={<Icon>logout</Icon>}
                onClick={() => {
                  firebase.auth().signOut()
                }}
              >
                ????????????
              </Button>
            )}
            <Button className="btn-close" onClick={() => setOpenNav(!openNav)}>
              <Icon>close</Icon>
            </Button>
          </div>

          {/* After Login */}
          {user && (
            <>
              <div className="nav__after-login">
                <dl className="user-info">
                  <dt>Name</dt>
                  <dd>?????????</dd>
                </dl>
                <div className="introduce-point">
                  <div className="point">
                    <Icon>monetization_on</Icon>
                    <span className="amount">52,000</span>
                    <em className="unit">CHOO</em>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      size="small"
                      color="default"
                      onClick={handleDialogPointOpen}
                      endIcon={<Icon>warning</Icon>}
                      disableElevation
                    >
                      ????????? ??????
                    </Button>
                  </div>
                </div>
              </div>
              <Dialog
                open={openDialogPoint}
                onClose={handleDialogPointClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">CHOO ????????? ??????</DialogTitle>
                <DialogContent dividers>
                  <DialogContentText id="alert-dialog-description">
                    <ul className="list-disc list-outside text-black text-xs lg:text-sm lg:ml-4">
                      <li>
                        CHOO ???????????? ?????? ???????????? ?????? ????????? ??? ?????? ???????????? ?????????, ??????????????? ???????????? ????????? ???
                        ?????? ?????? ???????????? ???????????? ??? ????????????.
                      </li>
                      <li>CHOO ???????????? ?????? ?????? ????????? ????????? ??? ????????????.</li>
                      <li>
                        CHOO ???????????? ??????????????? ????????? ????????? ?????? ???????????? ??? ????????????.
                        <div>
                          - ????????? ??? 1??? 1????????? ??????
                          <br />- ?????? ????????? 1??? ??? 1????????? ?????? ???????????? ?????? ??? 1??? ??? 5????????? ??????
                        </div>
                      </li>
                      <li>???????????? CHOO ???????????? ?????? ????????? ?????? ?????? ???????????? ???????????? ??? ????????????.</li>
                      <li>???????????? ??? ???????????? CHOO ???????????? ?????? ?????? ?????????.</li>
                      <li>????????? ???????????? ????????? CHOO ???????????? ???????????? ?????? ????????? ???</li>
                      ????????????.
                    </ul>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDialogPointClose} color="primary">
                    ??????
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}

          <Divider />
          <List className="nav__list">
            <ListItem className="nav__list-item" button>
              <ListItemIcon className="icon">
                <Icon>shopify</Icon>
              </ListItemIcon>
              <Link href="/products">
                <ListItemText className="text" primary="??????" />
              </Link>
            </ListItem>
            <ListItem className="nav__list-item" button>
              <ListItemIcon className="icon">
                <Icon>event</Icon>
              </ListItemIcon>
              <Link href="/events">
                <ListItemText className="text" primary="?????????" />
              </Link>
            </ListItem>
          </List>
        </div>

        <div className="nav__bottom">
          {user && (
            <Button variant="contained" color="primary" endIcon={<Icon>person_remove_alt_1</Icon>} onClick={withdraw}>
              ????????????
            </Button>
          )}
        </div>
      </Drawer>
    </>
  )
}
