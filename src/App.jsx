import { Link, Route, Routes } from 'react-router-dom';
import './App.css'

const Home = () => <h1>Home</h1>;
const Search = () => <h1>Search</h1>;
const Contact = () => <h1>Contact</h1>;

export const App = () => {
  return (
    <>
      <div className='app'>
        <nav className='navbar'>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/search'>Search</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
          </ul>
        </nav>
        <main className='main'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </main>
      </div>
    </>
  )
}