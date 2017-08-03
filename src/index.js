import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Searchbar from './components/searchbar';
import VideoList from './components/video_list';
import VideoDetail from './components/videodetail';
import registerServiceWorker from './registerServiceWorker';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
const API_KEY = 'AIzaSyDn-PztK-mxqaVvwrt3M00I0nmzzdFGkcs';



class Index extends React.Component{

	constructor(props){
		super(props);
		this.state = { videos: [],
			selectedVideo: null} ;
		this.videoSearch('surfboards');
		}


	
	videoSearch(term) {
		YTSearch({key:API_KEY, term: term}, videos => {
		this.setState({videos:videos,
			selectedVideo: videos[0]});
		}); 
	
	}
	render() {
		const videoSearch = _.debounce((term) => {this.videoSearch(term)} , 300);
		return <div>
		 <Searchbar onSearchTermChange= {videoSearch}/>
		 <VideoDetail video={this.state.selectedVideo}/>
		 <VideoList onVideoSelect = {selectedVideo => this.setState({selectedVideo})} videos={this.state.videos}/>
		  </div>;
	}
}


ReactDOM.render(<Index/>, document.getElementById('root'));
registerServiceWorker();
