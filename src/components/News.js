import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



const News = (props) => {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResult, setTotalresult] = useState(true)
    
    
    const updatenews = async () => {
        props.setProgess(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url)
        props.setProgess(30)
        let parsedData = await data.json()
        props.setProgess(70)
        setNews(parsedData.articles)
        setLoading(false)
        setTotalresult(parsedData.totalResults)
        props.setProgess(100)
        
        
    }
    
    useEffect (() => {
        document.title = props.category
        updatenews()
    },[])

    // const previouspage = async () => {
        
    //     setPage(page - 1 )
    //     updatenews()
    // }
    // const nextpage = async () => {
    //     setPage(page + 1 )
    //    updatenews()
    // }
   const fetchMoreData = async () => {
       let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page + 1 )
        let data = await fetch(url)
        let parsedData = await data.json()
        // this.setState({
        //     articles: this.state.articles.concat(parsedData.articles),
        //     totalResults: parsedData.totalResults,
        // })
        setNews(news.concat(parsedData.articles))
        setTotalresult(parsedData.totalResults)
    };


    // console.log(this.state.articles.length)
    return (
        <>
            <h2 className='text-center'  style={{marginTop: '90px'}}>NewsMonkey - Top {props.category} Headlines</h2>
            {/* {loading && <Spinner />} */}
            <InfiniteScroll
                dataLength={news.length}
                next={fetchMoreData}
                hasMore={news.length !== totalResult}
                loader={<Spinner />}
            >
                <div className="container my-3">
                    <div className="row">
                        {news && news.map((element,index) => {
                            return <div className="col-md-4" key={index}>
                                <Newsitem title={element.title ? element.title.slice(0, 20) : ""} description={element.description ? element.description.slice(0, 90) : ""} imageurl={element.urlToImage ? element.urlToImage : "https://images.hindustantimes.com/tech/img/2023/06/21/1600x900/Instagram_reel_download_1687358064892_1687358084250.jpg"} newsurl={element.url} date={element.publishedAt} author={element.author} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll >
            {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} className="btn btn-dark" onClick={this.previouspage}>&larr; Prev</button>
                    <button disabled={page + 1 > Math.ceil(this.state.totalresult / props.pageSize)} className="btn btn-dark" onClick={this.nextpage}>Next &rarr;</button>
                </div> */}
        </>
    );
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'science'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default News;
