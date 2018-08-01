if (window.location.pathname == '/personnel.html') {
    loadBioData();
}

var bios = [];

//creates a section of bios by title
function createBioSection(title, biolist){
    //create a new section
    var tmpl = document.getElementById('biosection-template').content.cloneNode(true);
    
    tmpl.querySelector('.people').id = "section-" + String(title);
    
    tmpl.querySelector('.title').innerHTML = title;
    
    document.getElementById("bio_container").appendChild(tmpl);
    
    for (var i = 0; i < biolist.length-1; i++){
        createBioCol(String(title), i, biolist[i].split('##'));
    }
}

//creates a column to hold the bio information of each person
function createBioCol(section_target, index, bio_data){

    //create a dictionary to hold these pairs
    var dict = {};
    for (var i = 1; i < bio_data.length; i++){
        var nl_index = bio_data[i].indexOf('\n');
        var key = bio_data[i].substring(0, nl_index);
        var value = bio_data[i].substring(nl_index + 1);
        
        dict[key.trim()] = value;
    }
    bios.push(dict);
    //create and store new column
    var tmpl = document.getElementById('bio-template').content.cloneNode(true);
    
    //update column id
    tmpl.querySelector('.item').id = section_target + "-bio-" + String(index);
    
    //offset professor row 
    if (index == 0 && String(section_target).trim() === "Personnel"){
        tmpl.querySelector('.item').className += " offset-lg-2";
    }

    //set name
    tmpl.querySelector('.name').innerHTML = dict.name;
    
    //set subtitle
    tmpl.querySelector('.subtitle').innerHTML = dict.subtitle;
    
    //set description
    tmpl.querySelector('.description').innerHTML = dict.description;
    
    //set image
    tmpl.querySelector('.portrait').src = dict.image;
    
    
    //append finished column to the DOM
    document.getElementById("section-" + section_target).appendChild(tmpl);
}

function loadBioData(){
    var biosection;
    var client = new XMLHttpRequest();
    client.open('GET', 'https://docs.google.com/document/d/16BLT0Bz6hM8_I_Z5rcyg9bIiVWODLZOmjFooYIR-ZWo/export?format=txt');
    client.onreadystatechange = function(data){
        if (client.readyState == 4 && client.status == 200){
            //saves the text contents of the file
            datatext = data.target.responseText;
            biosection = datatext.split('$$$$$');
            for (var i = 1; i < biosection.length; i++){
                
                createBioSection(biosection[i].substring(0, biosection[i].indexOf('\n')), biosection[i].split("#####"));
            }
        }
        
    }
    client.send();
} 