if (window.location.pathname == '/index.html') {
    loadNewsData();
}

var news = [];

// creates a publication column from a template and appends it to the row
function createNewsRow(index, news_data){

    //split the array of publication elements up by their tag and values
    //create a dictionary to hold these pairs
    var dict = {};
    for (var i = 1; i < news_data.length; i++){
        var nl_index = news_data[i].indexOf('\n');
        var key = news_data[i].substring(0, nl_index);
        var value = news_data[i].substring(nl_index + 1);
        
        dict[key.trim()] = value;
    }
    news.push(dict);
    //create and store new column
    var tmpl = document.getElementById('news-template').content.cloneNode(true);
    
    //update column id
    tmpl.querySelector('.item').id = "news-" + String(index);
    
    //set headline
    tmpl.querySelector('.headline').innerHTML = dict.headline;
    
    //set date
    tmpl.querySelector('.date').innerHTML = dict.date;
    
    //set description
    tmpl.querySelector('.description').innerHTML = dict.description;
    
    //set link
    tmpl.querySelector('.link').href = dict.link;
    
    //append finished column to the DOM
    document.getElementById("news_list").appendChild(tmpl);
}

function loadNewsData(){
    var newslist;
    var client = new XMLHttpRequest();
    client.open('GET', 'https://docs.google.com/document/d/1Rdm4961Shwz-_J6kVqRcYmdPRxjoSYab1yifatcp6Cw/export?format=txt');
    client.onreadystatechange = function(data){
        if (client.readyState == 4 && client.status == 200){
            //saves the text contents of the file
            datatext = data.target.responseText;
            newslist = datatext.split('#####');
            for (var i = 0; i < newslist.length; i++){
                createNewsRow(i, newslist[i].split("##"));
            }
        }
        
    }
    client.send();
} 