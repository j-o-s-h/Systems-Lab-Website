if (window.location.pathname == '/research.html') {
    loadProjectData();
}

var projects = [];

// creates a project row from a template and appends it to the page
function createProjectRow(index, proj_data){

    //split the array of research elements up by their tag and values
    //create a dictionary to hold these pairs
    var dict = {};
    for (var i = 1; i < proj_data.length; i++){
        var nl_index = proj_data[i].indexOf('\n');
        var key = proj_data[i].substring(0, nl_index);
        var value = proj_data[i].substring(nl_index + 1);
        
        dict[key.trim()] = value;
    }
    projects.push(dict);
    //create and store new column
    var tmpl = document.getElementById('project-template').content.cloneNode(true);
    
    //update column id
    tmpl.querySelector('.item').id = "proj-" + String(index);
    
    //set parallax background image
    tmpl.querySelector('.item').style.backgroundImage = "url(" + String(dict.image)+ ")";
    
    //offset heading if odd numbered project
    if (index % 2 == 1){
        tmpl.querySelector('.darkshade').className += " offset-lg-8";
    }
    
    //set title
    tmpl.querySelector('.title').innerHTML = dict.title;
    
    //set description
    tmpl.querySelector('.description').innerHTML = dict.description;
    
    //set link
    tmpl.querySelector('.link').href = dict.link;
    
    //append finished column to the DOM
    document.getElementById("project_list").appendChild(tmpl);
}

function loadProjectData(){
    var projectlist;
    var client = new XMLHttpRequest();
    client.open('GET', 'https://docs.google.com/document/d/14E0wnRDqAnHDi27io7_F4D8PXeFpB_eSRp15Qu-E7-o/export?format=txt');
    client.onreadystatechange = function(data){
        if (client.readyState == 4 && client.status == 200){
            //saves the text contents of the file
            datatext = data.target.responseText;
            projectlist = datatext.split('#####');
            for (var i = 0; i < projectlist.length; i++){
                createProjectRow(i, projectlist[i].split("##"));
            }
        }
        
    }
    client.send();
} 

function truncateText(str, len){
    return str.substring(0, len) + ". . .";
}