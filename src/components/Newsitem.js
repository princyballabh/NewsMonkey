import React from 'react'

const Newsitem =(props)=> {
    let {title, description, imageurl, newsurl, author, date, source}=props;
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <div className="container" style={{display: 'flex', justifyContent:'flex-end', position:'absolute', right:'-15px'}}>
        <span className="badge rounded-pill bg-danger">{source}</span></div>
            <img src={!imageurl?"https://scx2.b-cdn.net/gfx/news/hires/2024/microsoft-delays-contr.jpg":imageurl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
              <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }


export default Newsitem
