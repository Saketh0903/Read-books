import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaSearch, FaCloudUploadAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserData } from '../Redux/slices/user-slice';

const navigation = [
  { name: 'Home', href: '/', authRequired: false },
  { name: 'About', href: '/about', authRequired: false },
  { name: 'Search', href: '/search', authRequired: true, icon: FaSearch },
  { name: 'Upload', href: '/upload', authRequired: true, icon: FaCloudUploadAlt },
  { name: 'Profile', href: '/profile', authRequired: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <Disclosure as="nav" className=" bg-blue-500">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://static.vecteezy.com/system/resources/previews/000/626/977/large_2x/education-book-logo-template-vector-illustration.jpg"
                    alt="Logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-6"> {/* Adjusted spacing between links */}
                    {navigation.map((item) => (
                      (!item.authRequired || (item.authRequired && isAuthenticated)) && (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )
                          }
                        >
                          {item.icon ? <item.icon className="inline-block mr-2 text-xl" /> : null}
                          {item.name}
                        </NavLink>
                      )
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4"> {/* Adjusted spacing */}
                {isAuthenticated ? (
                  <NavLink
                    onClick={() => dispatch(removeUserData())}
                    className={({ isActive }) =>
                      classNames(
                        isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )
                    }
                    to="/"
                  >
                    Logout
                  </NavLink>
                ) : (
                  <>
                    <NavLink
                      className={({ isActive }) =>
                        classNames(
                          isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )
                      }
                      to="/login"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      className={({ isActive }) =>
                        classNames(
                          isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )
                      }
                      to="/signup"
                    >
                      Signup
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                (!item.authRequired || (item.authRequired && isAuthenticated)) && (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )
                    }
                  >
                    {item.icon ? <item.icon className="inline-block mr-2 text-xl" /> : null}
                    {item.name}
                  </Disclosure.Button>
                )
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
