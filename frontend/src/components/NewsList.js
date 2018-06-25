import React, {Component} from 'react';
import { Image } from 'react-bootstrap';
import {connect} from 'react-redux';

class NewsList extends Component {
	
  render() {
    let news = '';
    console.log(this.props);
    if(this.props.news!==undefined){
    	if (this.props.news.length > 0) {
    		news = this.props.news.map((item, index) => (
    			<div className="newsList__item" key={index}>
    				<div className="newsList__image">
    					<Image src={item.urlToImage} alt="" responsive />
    				</div>
    				<a href={item.url}>{item.title}</a>
    				<p className="newsList__description">{item.description}</p>
    				<span>Published at {item.publishedAt} by {item.author}</span>
    			</div>
    		));
    	}
    }else{
      console.log('this.props', this.props);
    }
    return (
      <div className="newsList">
        {news}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  news: state.news,
});

export default connect(mapStateToProps)(NewsList);
