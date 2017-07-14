
class App extends React.Component {
  constructor(props) {
    super(props);
    this.data = exampleVideoData;
    this.state = {
      videos: this.data,
      playing: this.data[0],
      query: 'cats'
    };
    this.onTitleClick = this.onTitleClick.bind(this);
    this.onSearchType = this.onSearchType.bind(this);
  }

  componentDidMount() {

    this.props.searchYouTube({
      key: 'AIzaSyA00eJoSXqHc22b_MiJcyCJEHSXxFQxVd0', 
      query: this.state.query, 
      max: 5}, (data) => {
      this.data = data;  
      this.setState({
        videos: data,
        playing: data[0]
      });
      this.render();
    });
  }
  onSearchType(e) {
    if (e.key === 'Enter') {
      this.setState({
        query: e.target.value
      });
    } 
    this.props.searchYouTube({
      key: 'AIzaSyA00eJoSXqHc22b_MiJcyCJEHSXxFQxVd0', 
      query: this.state.query, 
      max: 5}, (data) => {
      this.data = data;  
      this.setState({
        videos: data,
        playing: data[0]
      });
    
    });
  }
  onTitleClick (index) {
    this.setState({
      playing: this.data[index]
    });
  }
  render() {
    return (
      <div>
        <Nav onSearchType={this.onSearchType}/>
        <div className="col-md-7">
          <VideoPlayer video={this.state.playing}/>
        </div>
        <div className="col-md-5">
          <VideoList videos={this.state.videos} onTitleClick={this.onTitleClick}/>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
