import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Container from './components/layouts/Container';
import Message from './components/layouts/Message';

import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';
import Profile from './components/pages/User/Profile'
import { UserProvider } from './context/UserContext';
import MyTasks from './components/pages/Task/MyTasks';
import AddTask from './components/pages/Task/AddTask';
import MyTasksDone from './components/pages/Task/MyTasksDone';
import MyTasksNotDone from './components/pages/Task/MyTasksNotDone';
import EditTask from './components/pages/Task/EditTask';

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/user/profile' element={<Profile />} />
            <Route path='/task/create' element={<AddTask />} />
            <Route path='/task/mytasks' element={<MyTasks />} />
            <Route path='/task/mytasksdone' element={<MyTasksDone />} />
            <Route path='/task/mytasksnotdone' element={<MyTasksNotDone />} />
            <Route path='/task/edit/:id' element={<EditTask />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
