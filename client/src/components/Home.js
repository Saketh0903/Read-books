import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div style={{backgroundImage:"url(https://farm1.staticflickr.com/130/376152628_249e3630c0_o_d.jpg)",height:'calc(100vh - 80px)'}} className="bg-cover content-center">
      <div className=" bg-stone-400 bg-opacity-50 h-full flex flex-col justify-center items-center gap-5 text-white text-balance">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam dolores, aut placeat vitae hic expedita ullam accusantium ut laudantium, incidunt debitis voluptatem culpa temporibus ipsa tempore reiciendis harum sapiente error commodi eaque. Officia repellendus sit amet tempore deleniti ullam ipsum!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur tenetur autem commodi distinctio est voluptate tempora eveniet enim exercitationem praesentium quae reiciendis corporis nulla nobis accusantium voluptatibus odit magni at a id atque eos, beatae iure! Nulla doloremque unde esse.</p>
        <div className="flex gap-[10px]">
          <Link to="/login"><button className="bg-blue-600 p-[10px]">Login</button></Link>
          <Link to="/signup"><button className="bg-blue-600 p-[10px]">Signup</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Home