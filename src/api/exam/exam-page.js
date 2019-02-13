"use trict"

const html = ({ title, script, data }) => `
<!DOCTYPE html>
<html class="w3-light-grey">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1,  shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">  
    <title>${title}</title>  
    <link rel="stylesheet" type="text/css" href="https://www.w3schools.com/w3css/4/w3.css">
	  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">    
  </head>
  <body>    
    <div id="root"></div>
    <script> var __data=${JSON.stringify(data)} </script>
    ${script? `<script type="text/javascript" src="${script}" ></script>` : ''}    
  </body>
</html>
`

function redirect() {
  return function(req, res) {
    const course = req.query.c
    if (course) {
      res.writeHead( 200, { "Content-Type": "text/html" } )
      res.end(html({title: 'Error', script: `${process.env.CDN}/exam.js`}))
    } else {
      res.status(400).send('Bad Request')
    }
  }
}

module.exports = redirect
