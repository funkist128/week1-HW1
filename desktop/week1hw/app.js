var http = require("http");
var port = 1337;
var request = require("request");
var url = "http://graph.facebook.com/Boo/photos?type=uploaded";

http.createServer(function (req, res) {
  res.writeHeader(200, {"Content-Type": "text/html"});
  
  var data = "<html><head><script src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js\"></script><link rel=\"stylesheet\" href=\"//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css\"><script src=\"//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js\"></script></head><body><div id=\"carousel-example-generic\" class=\"carousel slide\" data-ride=\"carousel\"><style type=\"text/css\">img{position: relative;margin-left: auto;margin-right: auto;height:500px;width:900px;}</style><div class=\"carousel-inner\">";
  data += "<div class=\"item active\"><img src=\"http://www.ideiademarketing.com.br/wp-content/uploads/2013/08/start.jpg\"></div>";
  request.get(url, function (err, body, response) {
    
    response = JSON.parse(response);
    response.data.forEach(function (val, idx) {
      data += "<div class=\"item\"><img src='" + val.images[3].source + "'></div>";
    });
    
    data += "<!-- Controls --><a class=\"left carousel-control\" href=\"#carousel-example-generic\" data-slide=\"prev\"><span class=\"glyphicon glyphicon-chevron-left\"></span></a><a class=\"right carousel-control\" href=\"#carousel-example-generic\" data-slide=\"next\"><span class=\"glyphicon glyphicon-chevron-right\"></span></a></div></body></html>";
    res.end(data);
  });

}).listen(port);

console.log("start server port: " + port);


