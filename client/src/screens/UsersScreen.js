import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersList, deleteUser } from '../actions/userActions';
import Meta from '../components/utils/Meta';
import Message from '../components/utils/Message';
import UserEditDialog from '../components/users/UserEditDialog';
import {
    Container,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    Typography,
    TableCell,
    TableBody,
    IconButton,
    CircularProgress
} from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from '../styles/screens/UsersScreenStyles'

export default function UsersScreen() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const [deleteUserId, setDeleteUserId] = useState('')
    const { loading, users, error } = useSelector(state => state.userList)
    const { loading: loadingDelete } = useSelector(state => state.userDelete)
    const [userToEdit, setUserToEdit] = useState()
    const [open, setOpen] = useState(false)



    const handleDialog = (userId) => {
        setUserToEdit(users.find(user => user._id === userId))
        setOpen(true)
    }

    const handleDelete = (userId) => {
        setDeleteUserId(userId);
        dispatch(deleteUser(userId))
    }

    useEffect(() => {
        dispatch(getUsersList())
    }, [dispatch])

    return (
        <Container className={classes.root}>
            <Meta title='Users' />
            <Typography variant="h4" noWrap className={classes.title}>
                USERS
            </Typography>
            {loading ?
                <CircularProgress className={classes.loader} size='150px' color='primary' /> :
                error ?
                    <Message severity='error'>{error}</Message> :
                    <>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.headLine}>ID</TableCell>
                                        <TableCell className={classes.headLine}>NAME</TableCell>
                                        <TableCell className={classes.headLine}>EMAIL</TableCell>
                                        <TableCell className={classes.headLine}>ADMIN</TableCell>
                                        <TableCell className={classes.headLine}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map(user => (
                                        <TableRow className={classes.tableRow} key={user._id}>
                                            <TableCell component="th" scope="row">{user._id}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                {user.isAdmin ?
                                                    <DoneRoundedIcon className={classes.doneIcon} /> :
                                                    <CloseRoundedIcon className={classes.closeIcon} />
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {loadingDelete && deleteUserId === user._id ?
                                                    <CircularProgress color='secondary' /> :
                                                    <>
                                                        <IconButton edge="start" color="inherit" onClick={() => handleDialog(user._id)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton edge="end" color="inherit" disabled={loadingDelete} onClick={() => handleDelete(user._id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {open && <UserEditDialog open={open} setOpen={setOpen} user={userToEdit} />}
                    </>}
        </Container >
    )
}
