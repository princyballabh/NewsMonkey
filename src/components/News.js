import React, {useEffect, useState} from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {

  const [articles,setArticles]=useState([]);
  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(true);
  const [totalResults,setTotalresults]=useState(0);
  
  // document.title = `${capitalizeFirstLetter(props.category)} - News Monkey`;


  
  const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

   const update= async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parseddata = await data.json();
    props.setProgress(70);
    setArticles(parseddata.articles);
    setLoading(false)
    setTotalresults(parseddata.totalResults)
    props.setProgress(100);
  }

  useEffect(()=>{
    update()
     // eslint-disable-next-line
  }, []);
 
  const fetchMoreData = async() => {
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
     let data = await fetch(url);
    let parseddata = await data.json();
    setArticles(articles.concat(parseddata.articles))
    setTotalresults(parseddata.totalResults)
  };


    return (
      <>
        <h2 className="text-center" style={{ margin: "35px", marginTop:"90px" }}>
          NewsMonkey - Top {capitalizeFirstLetter(props.category)}
          Headlines
        </h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults && articles.length < totalResults }
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title}
                      description={element.description}
                      imageurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
              </div>
          </div>
        </InfiniteScroll>
        
      </>
    );
  }

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
