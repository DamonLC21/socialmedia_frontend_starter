import React from 'react'
import { Link } from 'react-router-dom'

const profileImg = "https://pbs.twimg.com/profile_images/1237550450/mstom_400x400.jpg"

export default function HomePage(props) {
  return (
    <div>
      <section className="heading">
        <h1>Friendzii</h1>
        <h2>Welcome! {props.user.username}</h2>
        <Link to="/login">Logout</Link>
      </section>
      <section className="main-container">
        <div className="all-users">
        
        </div>
        <div className="my-list">
          <ul className="friends-list">
            
          </ul>
          <ul className="pending-list">

          </ul>
        </div>
      </section>
    </div>
  )
}
