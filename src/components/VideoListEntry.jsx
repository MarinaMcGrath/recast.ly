class VideoListEntry extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="video-list-entry">
        <div className="media-left media-middle">s
          <img className="media-object" src={props.snippet.thumbnails.default.url}/>
        </div>
        <div className="media-body">
          <div className="video-list-entry-title">{props.snippet.title}</div>
          <div className="video-list-entry-detail">{props.snippet.description}</div>
        </div>
      </div>
    );  
  }
}

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoListEntry.propTypes = {
  video: React.PropTypes.object.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.VideoListEntry = VideoListEntry;
