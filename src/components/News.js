import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'science'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = this.props.category
    }
   
    async updatenews() {
        // this.props.setProgess(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        // this.props.setProgess(100)
    }
    async componentDidMount() {
        this.updatenews()
    }

    previouspage = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updatenews()
    }
    nextpage = async () => {
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalresult/this.props.pageSize))){
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=de3896aa4588420287f330c5280e9679&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        //     this.setState({loading: true})
        //     let data = await fetch(url)
        //     let parsedData = await data.json()
        //     console.log(parsedData)
        //     this.setState({
        //         articles: parsedData.articles,
        //         page: this.state.page + 1,
        //         loading: false
        //     })
        // }
        this.setState({ page: this.state.page + 1 })
        this.updatenews()
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            // loading: false
        })
    };
    render() {

        return (
            <>
                <h2 className='my-4 text-center'>NewsMonkey - Top {this.props.category} Headlines</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container my-3">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <Newsitem title={element.title ? element.title.slice(0, 20) : ""} description={element.description ? element.description.slice(0, 90) : ""} imageurl={element.urlToImage ? element.urlToImage : "https://images.hindustantimes.com/tech/img/2023/06/21/1600x900/Instagram_reel_download_1687358064892_1687358084250.jpg"} newsurl={element.url} date={element.publishedAt} author={element.author} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll >
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.previouspage}>&larr; Prev</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalresult / this.props.pageSize)} className="btn btn-dark" onClick={this.nextpage}>Next &rarr;</button>
                </div> */}
            </>
        );
    }
}

export default News;
