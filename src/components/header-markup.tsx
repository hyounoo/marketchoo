import Link from 'next/link'
import firebase from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { siteTitle } from './layout'
// Below for UI
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
// Below for Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const drawerWidth = 280;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);

export default function Header() {
  // Destructure user, loading, and error out of the hook.
  const [user, loading, error] = useAuthState(firebase.auth());
  const classes = useStyles();
  const theme = useTheme();
  const [openNav, setOpenNav] = React.useState(false);
  const [openDialogPoint, setOpenDialogPoint] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenNav(true);
  };
  const handleDrawerClose = () => {
    setOpenNav(false);
  };
  const handleDialogPointOpen = () => {
    setOpenDialogPoint(true);
  };
  const handleDialogPointClose = () => {
    setOpenDialogPoint(false);
  };
  const withdraw = () => {
    const message = confirm('회원 탈퇴 시 보유하신 CHOO 포인트는 모두 소멸됩니다.\n정말 탈퇴하시겠습니까?');
    if(message) {
      alert('탈퇴가 완료되었습니다.');
    }
  };

  return (
    <>
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openNav,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, openNav && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {siteTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 네비게이션 */}
      <Drawer className={clsx('nav', classes.drawer)} anchor="left" open={openNav}
        classes={{
          paper: "nav__inner",
        }}
      >
        <div>
          <div className="nav__top">
            {!user && (
              <Button href="/auth/signIn" variant="contained" color="primary" endIcon={<Icon>login</Icon>}>
                로그인
              </Button>
            )}
            {user && (
              <Button
                variant="contained"
                color="primary"
                endIcon={<Icon>logout</Icon>}
                onClick={() => {
                  firebase.auth().signOut();
                }}>
                로그아웃
              </Button>
            )}
            <Button className="btn-close" onClick={handleDrawerClose}>
              <Icon>close</Icon>
            </Button>
          </div>

          {/* After Login */}
          {user && (
            <>
            <div className="nav__after-login">
              <dl className="user-info">
                <dt>Name</dt>
                <dd>홍길동</dd>
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
                    disableElevation>
                    포인트 안내
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
              <DialogTitle id="alert-dialog-title">CHOO 포인트 안내</DialogTitle>
              <DialogContent dividers>
                <DialogContentText id="alert-dialog-description">
                  <ul>
                  <li>CHOO 포인트는 실제 상품구매 등에 사용할 수 있는 포인트가 아니며, 추마켓에서 진행하는 이벤트 및 행사 참여 이외에는 사용하실 수 없습니다.</li>
                    <li>CHOO 포인트는 현금 또는 재화로 교환할 수 없습니다.</li>
                    <li>CHOO 포인트는 추마켓에서 다양한 활동을 통해 획득하실 수 있습니다.
                      <div>
                      - 로그인 시 1일 1포인트 적립<br />
                      - 상품 좋아요 1건 당 1포인트 적립 고객리뷰 작성 시 1건 당 5포인트 적립
                      </div>
                    </li>
                    <li>획득하신 CHOO 포인트를 통해 다양한 행사 또는 이벤트에 참여하실 수 있습니다.</li>
                    <li>회원탈퇴 시 보유하신 CHOO 포인트는 모두 소멸 됩니다.</li>
                    <li>부정한 방법으로 획득한 CHOO 포인트는 운영진에 의해 소멸될 수</li>
                    있습니다.
                  </ul>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogPointClose} color="primary">확인</Button>
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
                <ListItemText className="text" primary="상품" />
              </Link>
            </ListItem>
            <ListItem className="nav__list-item" button>
              <ListItemIcon className="icon">
                <Icon>event</Icon>
              </ListItemIcon>
              <Link href="/events">
                <ListItemText className="text" primary="이벤트" />
              </Link>
            </ListItem>
          </List>
        </div>

        <div className="nav__bottom">
        {user && (
          <Button
            variant="contained"
            color="primary"
            endIcon={<Icon>person_remove_alt_1</Icon>}
            onClick={withdraw}>
            탈퇴하기
          </Button>
        )}
        </div>
      </Drawer>
    </>
  );
}
