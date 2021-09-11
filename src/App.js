import React, { useEffect, useState } from 'react'
import axios from 'axios'
import logo from './logo.svg'
import './logo.css'

function App() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    axios
      .get('https://randomuser.me/api?results=100')
      .then((res) => setUsers(res.data.results))
  }, [])

  useEffect(() => {
    if (searchQuery !== '') {
      const filter = users.filter(
        (user) =>
          user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.name.last.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredUsers(filter)
    }
    if (!searchQuery) {
      setFilteredUsers(users)
    }
  }, [searchQuery])

  if (filteredUsers) {
    return (
      <div className="w-full h-auto min-h-screen flex justify-center items-center mx-auto p-6 dark:text-white text-2xl font-bold">
        <div>
          <img src={logo} alt="logo" className="w-32 h-32 mx-auto logo" />
          <input
            className="w-64 h-12 px-4 mb-5 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            type="text"
            placeholder="Search user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.trim())}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 text-center">
            {filteredUsers.map((user) => (
              <div className="p-4" key={user.phone}>
                <div className="bg-gray-300 dark:bg-gray-800 rounded-2xl">
                  <div className="text-center mb-4 opacity-90">
                    <img
                      src={user.picture.large}
                      alt={user.name.first}
                      className="mx-auto object-cover rounded-full h-40 w-40 "
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-2xl text-gray-800 dark:text-white">
                      {`${user.name.title} ${user.name.first} ${user.name.last}`}
                    </p>
                    <p className="text-xl text-gray-500 dark:text-gray-200 font-light">
                      {user.email}
                    </p>
                    <p className="text-md text-gray-500 dark:text-gray-400 max-w-xs py-4 font-light flex flex-col">
                      <span>{`Phone: ${user.phone}`}</span>
                      <span>{`City: ${user.location.city}`}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default App
