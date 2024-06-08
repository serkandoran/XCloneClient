import './App.css';
import { createBrowserRouter, RouterProvider,Navigate } from 'react-router-dom';

import RootLayout from './Root.js'

import LoginPage from './Views/LoginPage'
import SignupPage from './Views/SignupPage.js'
import SignupStepsMain from './Views/SignupSteps/SignupStepsMain.js'
import Basari from './Views/basari.js'
import LogOut from './Views/LogOut.js';

import UserRoutesContainer from './Views/UserRoutes/UserRoutesContainer.js';
import HomePage from './Views/UserRoutes/HomePage.js'
import Explore from './Views/UserRoutes/Explore.js';
import Notifications from './Views/UserRoutes/Notifications.js';
import Messages from './Views/UserRoutes/Messages.js';
import Lists from './Views/UserRoutes/Lists.js';
import Bookmarks from './Views/UserRoutes/Bookmarks.js';
import Communities from './Views/UserRoutes/Communities.js';
import Profile from './Views/UserRoutes/Profile.js';
import Tweet from './Views/UserRoutes/Tweet.js';
import PostDetail from './Views/UserRoutes/HomePageSubFolders/PostDetail.js';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Navigate to="/home" />},
      { path: '/login', element: <LoginPage /> },
      // { path: '/signup', element: <SignupPage /> },
      // { path: '/signup/steps', element: <SignupStepsMain /> },
      { path: '/basari', element: <Basari /> },
      { path: '/logout', element: <LogOut  /> },
      {
        element: <UserRoutesContainer />,
        children: [
          { path: '/home', element: <HomePage  /> },
          { path: '/explore', element: <Explore  /> },
          { path: '/notifications', element: <Notifications /> },
          { path: '/messages', element: <Messages /> },
          { path: '/lists', element: <Lists /> },
          { path: '/bookmarks', element: <Bookmarks /> },
          { path: '/communities', element: <Communities /> },
          { path: '/profile', element: <Profile /> },
          { path: '/tweet', element: <Tweet /> },
          { path: '/status/:id', element: <PostDetail /> },
        ]
      }
      
    ]
  },
])



function App() {

  return <RouterProvider router={router} />

}

export default App;
