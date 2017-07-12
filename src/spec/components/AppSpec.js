'use strict';

describe('App', function () {
  var _React$addons$TestUti = React.addons.TestUtils,
      Simulate = _React$addons$TestUti.Simulate,
      renderIntoDocument = _React$addons$TestUti.renderIntoDocument,
      findRenderedDOMComponentWithClass = _React$addons$TestUti.findRenderedDOMComponentWithClass,
      scryRenderedDOMComponentsWithClass = _React$addons$TestUti.scryRenderedDOMComponentsWithClass;

  var app;

  beforeEach(function () {
    app = renderIntoDocument(React.createElement(App, { searchYouTube: function searchYouTube() {} }));
  });

  it('should be a stateful class component', function () {
    expect(React.Component.isPrototypeOf(App)).to.be.true;
  });

  it('should render a single VideoPlayer component', function () {
    var videoPlayer = findRenderedDOMComponentWithClass(app, 'video-player');
    expect(videoPlayer).to.exist;
  });

  it('should render a single VideoList component', function () {
    var videoList = findRenderedDOMComponentWithClass(app, 'video-list');
    expect(videoList).to.exist;
  });

  it('should update the video player when a video entry\'s title is clicked', function () {
    // This test will only works once `App` is refactored into a stateful class component
    // because `renderIntoDocument` does not work with stateless class components
    expect(React.Component.isPrototypeOf(App)).to.be.true;

    var videoEntryTitleElements = scryRenderedDOMComponentsWithClass(app, 'video-list-entry-title');

    videoEntryTitleElements.forEach(function (videoEntryTitle) {
      Simulate.click(videoEntryTitle);
      var player = findRenderedDOMComponentWithClass(app, 'video-player');
      var playerTitle = player.querySelector('.video-player-details h3');

      // This test assumes that if you can successfully update the video player's title,
      // you can also update the video and description
      expect(playerTitle.innerHTML).to.equal(videoEntryTitle.innerHTML);
    });
  });

  xdescribe('when rendering live data from YouTube', function () {
    var searchYouTubeStub;

    beforeEach(function () {
      searchYouTubeStub = sinon.stub();
      searchYouTubeStub.yields(window.fakeVideoData);
      app = renderIntoDocument(React.createElement(App, { searchYouTube: searchYouTubeStub }));
    });

    it('should call `searchYouTube` when app is initialized', function () {
      expect(searchYouTubeStub.called).to.be.true;
    });

    it('should load live data when app is initialized', function () {
      expect(searchYouTubeStub.called).to.be.true;

      var videoEntryTitleElements = scryRenderedDOMComponentsWithClass(app, 'video-list-entry-title');

      videoEntryTitleElements.forEach(function (videoEntryTitle, i) {
        return expect(videoEntryTitle.innerHTML).to.equal(fakeVideoData[i].snippet.title);
      });
    });
  });
});