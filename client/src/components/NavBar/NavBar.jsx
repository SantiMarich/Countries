import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = (props) => {
    return (
    <div>
<Link to="/home">HOME</Link>
<Link to="/create">FORM</Link>
<Link to="/about">ABOUT</Link>
<SearchBar onSearch={props.onSearch} />
    </div>
    )
}

export default NavBar;