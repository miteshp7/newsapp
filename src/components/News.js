import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spin from './Spin'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country : 'in',
        category : 'all' 
    }

    static propTypes = {
        country : PropTypes.string,
        category : PropTypes.string
    }

    constructor(){
        super();
        console.log('In News Constructor');
        this.state = {
            articles : [],
            totalResults : 0,
            loading : true,
            page : 1,
            pagesize : 12,
            country : 'in',
            category : 'all'
        }
    }

    // after render is completed (constructor >> render >> componentDidMount)
    async componentDidMount(){
        //console.log("cdm");
        //this.setState({loading:true});
        //let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.state.pagesize}`;
        //let data = await fetch(url);
        //let parsedData = await data.json();
        //console.log(parsedData);
        //this.setState({articles : parsedData.articles,loading : false, page : 1, totalResults : parsedData.totalResults})
        this.setState({page : 1},this.updateNews);
        //this.updateNews();

    }
    
    handleNextClick = async ()=>{
        this.setState({page:this.state.page+1},this.updateNews);
    }

    handlePrevClick = async ()=>{
        this.setState({page : this.state.page - 1},this.updateNews);
    }
    
    async updateNews(){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.state.pagesize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        //this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(50);
        this.setState({articles : this.state.articles.concat(parsedData.articles),loading : false, page : this.state.page , totalResults : parsedData.totalResults})
        this.props.setProgress(100);
    }

    fetchMoreData = async() => {
        this.setState({page:this.state.page+1},this.updateNews);
    };

    // after constructor is run render runs (constructor >> render >> componentDidMount)
    render() {
        console.log("render");
        return (
           
            <>
                <h1 className="text-center mt-5">Top Headlines - {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}</h1>
                {this.state.loading && <Spin/>}
                
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.totalResults}
                    loader={<Spin/>}
                    >
                        <div className="container">
                        <div className="row">
                        {
                            this.state.articles.map((element)=>
                                <div key={element.url} className="col-md-4 col-lg-4 col-sm-12 d-flex align-items-stretch">
                                    <NewsItem title={element.title} description={element.description} imageURL={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt}/>
                                </div>       
                            )
                        }
                        </div>
                        </div>
                    </InfiniteScroll>    
                
                
            </>
            
            
        )
  }
}

export default News
