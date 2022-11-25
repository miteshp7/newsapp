import React, { Component } from 'react'

export class Pagination extends Component {
    constructor(){
       
        super();
        console.log(this.props);
        console.log("Hello");
    }

    render() {
        return (
        <div className="d-flex justify-content-between container">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onclick={this.setPagination(-1)}>Previous</button>
            <button type="button" className="btn btn-dark" onclick={this.setPagination(1)}>Next</button>
        </div>
    ) 
  }
}

export default Pagination
