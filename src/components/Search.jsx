var Search = (props) => (
  <div className="search-bar form-inline">
    <input onKeyPress={e => e.key === 'Enter' ? props.onSearchType : console.log('nope')} className="form-control" type="text" placeholder="Search..." />
    <button className="btn">
      <span className="glyphicon glyphicon-search"></span>
    </button>
  </div> 
);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Search = Search;
