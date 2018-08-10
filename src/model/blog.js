const Query = require('./../../util/Query');

const GetBlogList = (req, res) => {
    let q = "SELECT postid, title, description, body, published FROM posts WHERE published = 'true' ORDER BY postid DESC"
    //const FetchBlogList = new Query(q);
    try {
      var result = findInvoiceQuery.runQuery(q);
    } catch (er) {
      console.log('sql error', er);
    }

    var bloglist = result.map( (row) => {
       // "<div>" {row.id} " "{row.title} " "{row.description} " "{row.body} "</div>";
    })
}
