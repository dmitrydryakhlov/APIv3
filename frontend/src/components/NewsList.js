import React, {Component} from 'react';
import { Image } from 'react-bootstrap';
import {connect} from 'react-redux';

class NewsList extends Component {
	
  render() {
    let news = '';
    console.log(this.props.news);
    if(this.props.news!==undefined){
    	if (this.props.news.length > 0) {
    		news = this.props.news.map((item, index) => (
    			<div className="newsList__item" key={index}>
    				<div className="newsList__image">
    					<Image height = '300px'  src={item.urlToImage} alt="" responsive />
    				</div>
    				<a href={item.url}>{item.title}</a>
    				<p className="newsList__description">{item.description}</p>
            <span>Published at {item.publishedAt} by {item.author}</span>
            <br/><br/>
    			</div>
        ));
    	}else return(
        <p>no matches</p>
      );
    }else{
      //console.log('this.props', this.props);
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
  filter: state.filter,
});

export default connect(mapStateToProps)(NewsList);
