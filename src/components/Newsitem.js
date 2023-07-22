import React, { Component } from 'react';

export class Newsitem extends Component {
  render() {
    let { title, description, imageurl, newsurl, date, author } = this.props;
    return (
      <div className='my-3'>
        {/* this is new item skjfhih sdji */}
        <div className="card">
          <img src={imageurl} className="card-img-top" alt="bg" style={{ height: '200px', objectFit: 'cover' }} />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...`</p>
            <p className="card-text"><small className="text-body-secondary fs-10">By {author ? author : 'Aman'} on {new Date(date).toGMTString()}</small></p>
            <a href={newsurl} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div>
          {/* <div className="card-footer text-body-secondary">{new Date(date).toGMTString()}</div> */}
        </div>

      </div>
    );
  }
}

export default Newsitem;
