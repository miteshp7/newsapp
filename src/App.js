import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {country:'in',selectedCountry:'India',countryStruct:{
      in : 'India', us : 'U.S', cn : 'China', gb: 'Great Britain', fr: 'France'
    }, progress:0};
  }

  setProgress = (progress)=>{
    this.setState({progress:progress});
  }

  apiKey = process.env.REACT_APP_NEWS_API

  toggleCountry= (event)=>{
    console.log('new');
    console.log(this.state.countryStruct);
    this.setState({
      country:event.target.attributes.value.nodeValue,
      selectedCountry : this.state.countryStruct[event.target.attributes.value.nodeValue]
    },this.forceUpdate());
    //window.location.reload(false);
  }  
  
  
  render() {
    let categoryList = ['all','business','entertainment','health','science','sports','technology'];
    let countryStruct = {
      in : 'India', us : 'U.S', cn : 'China', gb: 'Great Britain', fr: 'France'
    };
    return (
      <>
        <Router>
          <NavBar categoryList={categoryList} countryStruct={countryStruct} toggleCountry={this.toggleCountry} selectedCountry={this.state.selectedCountry}/>
          <LoadingBar
            color='#f11946'
            height = {3}
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />
          <Switch>
            <Route path="/business"><News setProgress={this.setProgress} apiKey={this.apiKey} key="business" country={this.state.country} category="business"/></Route>
            <Route path="/entertainment"><News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" country={this.state.country} category="entertainment"/></Route>
            <Route path="/health"><News setProgress={this.setProgress} apiKey={this.apiKey} key="health" country={this.state.country}category="health"/></Route>
            <Route path="/science"><News setProgress={this.setProgress} apiKey={this.apiKey} key="science" country={this.state.country} category="science"/></Route>
            <Route path="/sports"><News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" country={this.state.country} category="sports"/></Route>
            <Route path="/technology"><News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" country={this.state.country} category="technology"/></Route>
            <Route path="/"><News setProgress={this.setProgress} apiKey={this.apiKey} key="general" country={this.state.country} category="general"/></Route>
          </Switch>
          
          
          </Router>
      </>
    )
  }
}

