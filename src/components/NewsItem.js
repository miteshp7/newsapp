import React, { Component } from 'react'
import newsDefault from '../news_default.jpg'

export class NewsItem extends Component {
  constructor(){
    super();
    console.log('In News Item Constructor');
  }

  render() {
    let {title, description, imageURL,url,author,date} = this.props;
    return (
        <div className="card">
            <img src={imageURL?imageURL:newsDefault} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {author?author:'Unknown'}  {date?`on ${new Date(date).toDateString()}`:''}</small></p>
                <a href={url} rel="noreferrer" target="_blank" className="btn btn-dark">Read More</a>
            </div>
      </div> 
    )
  }
}

export default NewsItem
