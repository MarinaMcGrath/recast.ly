
class App extends React.Component {
  constructor(props) {
    super();
    this.data = exampleVideoData;
    this.state = {
      videos: this.data,
      playing: this.data[0]
    };
    this.onTitleClick = this.onTitleClick.bind(this);
  }
  onTitleClick (index) {
    this.setState({
      playing: this.data[index]
    });
    this.render();
  }
  render() {
    return (
      <div>
        <Nav />
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
