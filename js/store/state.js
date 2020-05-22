const state = {
  viewer: {
    fileParseErrors: undefined,
    file: undefined,
    fileParseSuccessful: false,
  },
  ass1: {
    fileParseErrors: undefined,
    file: undefined,
    fileParseSuccessful: false,
    type: undefined,
    csvFileUrl: undefined,
    asciiFileUrl: undefined,
    isAsciiModalActive: false,
    imgWidth: 256,
  },
  home: {
    fileParseErrors: undefined,
    file: undefined,
    fileParseSuccessful: false,
  },
  page: ['viewer', 'ass1', 'home'],
  pageName: {
    viewer: 'Viewer',
    ass1: 'Assignment 1',
    home: 'Home',
  },
  pageNameRev: {
    'Assignment 1': 'ass1',
    Viewer: 'viewer',
    Home: 'home',
  },
};

export default state;