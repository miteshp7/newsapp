import React, { Component } from 'react'
import {
   Link
} from "react-router-dom";
export default class NavBar extends Component {
  render() {
    let {countryStruct,categoryList,toggleCountry,selectedCountry} = this.props;
    return (
        
        <nav className="fixed-top navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
            <div className="navbar-brand" href="/">World News </div>
            <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {
                        categoryList.map((item)=>
                            <li key={item} className="nav-item">
                                {item === 'all'  
                                   ? <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                    : <Link className="nav-link" to={`/${item}`}>{item.charAt(0).toUpperCase() + item.slice(1)}</Link>
                                }
                            </li>    
                        )
                    }
                       
                </ul>
                <ul className="navbar-nav mb-2 mb-lg-0">    
                    <li className="nav-item dropdown pull-right">
                        <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {selectedCountry}
                        </a>
                        <ul className="dropdown-menu">
                            {
                                Object.keys(countryStruct).map((key) => (
                                <li key={countryStruct[key]}>
                                    <span className="dropdown-item" value={key} onClick={toggleCountry}>{countryStruct[key]}</span>
                                </li>
                                ))
                            }
                            
                        </ul>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    )
  }
}
