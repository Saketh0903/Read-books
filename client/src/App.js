import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/Navbar';
import Rootlayout from './Rootlayout';
import Search from './components/Search';
import About from './components/About';
import Upload from './components/Upload';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import {Provider, useSelector} from "react-redux"
import { store } from './Redux/store';
import Files from './components/Files';
import BookDetails from './components/BookDetails';

function App() {

  
  const Router = createBrowserRouter([
    {
      path:"",
      element:<Rootlayout/>,
      children:[
        {
          path:"",
          element:<Home/>
        },
        {
          path:"about",
          element:<About/>
        },
        {
          path:"search",
          element:<Search/>
        },
        {
          path:'upload',
          element:<Upload/>
        },
        {
          path:'profile',
          element:<Profile/>
        },
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'signup',
          element:<Signup/>
        },
        {
          path:"/files",
          element:<Files/> //
        },
        {
          path:"/bookdetails",
          element:<BookDetails/>
        }
      ]
    }
  ])

  return (
    <Provider store={store}>
    <div className="App">
      <RouterProvider router={Router}>
      </RouterProvider>
    </div>
    </Provider>
  );
}

export default App;
