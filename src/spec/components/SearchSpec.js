'use strict';

describe('Search', function () {
  var _React$addons$TestUti = React.addons.TestUtils,
      Simulate = _React$addons$TestUti.Simulate,
      renderIntoDocument = _React$addons$TestUti.renderIntoDocument,
      findRenderedDOMComponentWithClass = _React$addons$TestUti.findRenderedDOMComponentWithClass,
      scryRenderedDOMComponentsWithClass = _React$addons$TestUti.scryRenderedDOMComponentsWithClass;

  var app, searchYouTubeStub;

  xdescribe('when rendering live data from YouTube', function () {
    beforeEach(function () {
      searchYouTubeStub = sinon.stub();
      searchYouTubeStub.onCall(0).yields(window.fakeVideoData);
      searchYouTubeStub.onCall(1).yields(window.moreFakeVideoData);

      app = renderIntoDocument(React.createElement(App, { searchYouTube: searchYouTubeStub }));
    });

    it('should load live data when app is initialized', function () {
      var videoEntryTitleElements = scryRenderedDOMComponentsWithClass(app, 'video-list-entry-title');
      videoEntryTitleElements.forEach(function (videoEntryTitle, i) {
        expect(videoEntryTitle.innerHTML).to.equal(fakeVideoData[i].snippet.title);
      });
    });

    it('should update the video list when typing into the input box', function () {
      var videoEntryTitleElements = scryRenderedDOMComponentsWithClass(app, 'video-list-entry-title');
      videoEntryTitleElements.forEach(function (videoEntryTitle, i) {
        expect(videoEntryTitle.innerHTML).to.equal(fakeVideoData[i].snippet.title);
      });

      var searchInputElement = findRenderedDOMComponentWithClass(app, 'form-control');
      Simulate.change(searchInputElement, { target: { value: 'React tutorial' } });

      var newVideoEntryTitleElements = scryRenderedDOMComponentsWithClass(app, 'video-list-entry-title');
      newVideoEntryTitleElements.forEach(function (videoEntryTitle, i) {
        expect(videoEntryTitle.innerHTML).to.equal(moreFakeVideoData[i].snippet.title);
      });
    });
  });
});