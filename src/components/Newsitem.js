import React from 'react';

const Newsitem =(props)=>{
  
    // let { title, description, imageurl, newsurl, date, author } = this.props;
    return (
      <div className='my-3'>
        
        <div className="card">
          <img src={props.imageurl} className="card-img-top" alt="bg" style={{ height: '200px', objectFit: 'cover' }} />
          <div className="card-body">
            <h5 className="card-title">{props.title}...</h5>
            <p className="card-text">{props.description}...`</p>
            <p className="card-text"><small className="text-body-secondary fs-10">By {props.author ? props.author : 'Aman'} on {new Date(props.date).toGMTString()}</small></p>
            <a href={props.newsurl} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div>
         
        </div>

      </div>
    );
  }


export default Newsitem;
