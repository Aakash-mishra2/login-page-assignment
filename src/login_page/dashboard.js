import { useSelector } from 'react-redux';
import { logout } from '../store/accountSlice';
import { useDispatch } from 'react-redux';
import { Title, Heading, Button, Wrapper } from '../styled_components';

const Dashboard = () => {
    const userName = useSelector((state) => state.userAccount.userName);
    const email = useSelector((state) => state.userAccount.email);
    const dispatch = useDispatch();


    return (
        <Wrapper>
            <Title> Welcome back, <em>{userName}</em></Title>
            <Heading>{email}</Heading>
            <Heading>Click below to logout</Heading>
            <Button onClick={() => dispatch(logout())}> Logout </Button>
        </Wrapper>
    );
};

export default Dashboard;