var express = require('express')
var moment = require('moment')

var app = express();

app.get('/:query',function(req,res){
        
        
        var date = req.params.query;
        var unix = null;
        var natural = null;
        var dateObj = { "unix": unix, "natural": natural };
        
        // Check for initial unix time
        if (+date >= 0) {
            unix = +date;
            natural = unixToNat(unix);
        } 
        
        // Check for initial natural time
        if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) {
            unix = natToUnix(date);
            natural = unixToNat(unix);
        }        
        
        var dateObj = { "unix": unix, "natural": natural };
        res.send(JSON.stringify(dateObj));
});

app.listen(8080,function(){
    
    console.log('Example app listening on 8080!');
});


    function natToUnix(date) {
        // Conver from natural date to unix timestamp
        return moment(date, "MMMM D, YYYY").format("X");
    }
    
    function unixToNat(unix) {
        // Convert unix timestamp to natural date
        return moment.unix(unix).format("MMMM D, YYYY");
    }
    