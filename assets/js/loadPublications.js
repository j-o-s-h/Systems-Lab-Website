if (window.location.pathname == '/publications.html') {
    loadPubData();
}
var cite_arr = [];
var publications = [];

// creates a publication column from a template and appends it to the row
function createPubCol(index, pub_data){

    //split the array of publication elements up by their tag and values
    //create a dictionary to hold these pairs
    var dict = {};
    for (var i = 1; i < pub_data.length; i++){
        var nl_index = pub_data[i].indexOf('\n');
        var key = pub_data[i].substring(0, nl_index);
        var value = pub_data[i].substring(nl_index + 1);
        
        dict[key.trim()] = value;
    }
    publications.push(dict);
    //create and store new column
    var tmpl = document.getElementById('pub-template').content.cloneNode(true);
    
    //update column id
    tmpl.querySelector('.item').id = "pub-" + String(index);
    
    //update cite button id
    tmpl.querySelector('.cite_btn').id = "citebtn_" + String(index);
    
    //set article title
    tmpl.querySelector('.name').innerHTML = dict.title;
    
    //set authors
    tmpl.querySelector('.authors').innerHTML = dict.authors;
    
    //set description
    tmpl.querySelector('.description').innerHTML = truncateText(dict.abstract, 400);
    
    //set link
    tmpl.querySelector('.link').href = dict.link;
    
    //set pdf
    tmpl.querySelector('.pdf').href = dict.pdf;
    
    //set image
    //tmpl.querySelector('.pub_img').src = dict.image;
    
    //set citation
    cite_arr[index] = dict.citation;
    
    //append finished column to the DOM
    document.getElementById("publication_list").appendChild(tmpl);
}

function loadPubData(){
    var publist;
    var client = new XMLHttpRequest();
    client.open('GET', 'https://docs.google.com/document/d/1O3gitlWPBx8suBZGNwb-vQ1TlhwNE89wVqMKfvfdoK8/export?format=txt');
    client.onreadystatechange = function(data){
        if (client.readyState == 4 && client.status == 200){
            //saves the text contents of the file
            datatext = data.target.responseText;
            publist = datatext.split('#####');
            for (var i = 0; i < publist.length; i++){
                createPubCol(i, publist[i].split("##"));
            }
        }
        
    }
    client.send();
} 

function truncateText(str, len){
    return str.substring(0, len) + ". . .";
}