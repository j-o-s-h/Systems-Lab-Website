//functionality for the "Copy to Clipboard" button
function copyToClip() {
  /* Get the text field */
  var copyText = document.getElementById("citeBox");

  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
}

//load the correct citation from the cite button into the citation box
function setCitationBox(id){
    var index = id.split('_')[1];
    var citeText = cite_arr[index];
    
    //get the text box in which to put the cite text
    var citeBox = document.getElementById("citeBox");
    
    citeBox.value = citeText;
}

