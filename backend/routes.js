const out = {};

out.search = function (req, res) {
  // GET news using req.body.keyword
  const news = [{
    'source': {
      'id': null,
      'name': 'Github.com'
    },
    'author': 'cl-bitcoin',
    'title': 'cl-bitcoin: cl-bitcoin',
    'description': 'cl-bitcoin - Peer to peer money',
    'url': 'https://github.com/cl-bitcoin/cl-bitcoin',
    'urlToImage': 'https://avatars0.githubusercontent.com/u/39051405?s=400&v=4',
    'publishedAt': '2018-05-07T10:08:22Z'
  },
  {
    'source': {
      'id': null,
      'name': 'Bleepingcomputer.com'
    },
    'author': 'Bleepingcomputer',
    'title': 'Bitcoin SuPpOrt 18005716109 Bitcoin',
    'description': 'Bitcoin SuPpOrt 18005716109 Bitcoin - posted in Windows 10 Support: Bitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nB…',
    'url': 'https://www.bleepingcomputer.com/forums/t/673721/bitcoin-support-18005716109-bitcoin/',
    'urlToImage': 'https://www.bleepingcomputer.com/forums/public/style_images/master/meta_image.png',
    'publishedAt': '2018-03-21T15:46:13Z'
  }];

  res.send(news);
};

module.exports = out;