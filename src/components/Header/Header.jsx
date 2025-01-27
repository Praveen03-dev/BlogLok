import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className="relative w-full flex items-center dark:bg-dark bg-gradient-to-r from-slate-900 to-slate-700"
    >
      <Container>
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <Link to="/" className="block w-full py-5">
              <Logo width="300px"/>
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <nav className="flex w-full">
              <ul className="flex ml-auto items-center">
                {navItems.map((item) => 
                  item.active ? (
                    <li key={item.name}>  
                      <button
                        onClick={() => navigate(item.slug)}
                        className="flex py-2 text-base font-medium text-dark hover:text-primary dark:text-white lg:ml-10 lg:inline-flex"
                      >
                        {item.name}
                      </button>
                    </li>       
                  ) : null
                )} 
                {authStatus && (
                  <li className="lg:ml-10">
                    <LogoutBtn />
                  </li>
                )} 
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header