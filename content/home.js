var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    
    if(this.readyState == xhttp.DONE && this.status == 200) {
        contacts = JSON.parse(this.responseText);
        app.content.Clear();
        for(c in contacts['datas']){
            var contact = contacts['datas'][c];
            var result = document.createElement('div');
            result.innerHTML += '<strong>'+contact['name']+' </strong>';
            result.style.position = 'relative';
            result.style.width ='100%';
            result.style.background = 'purple';
            result.innerHTML += contact['mail'];
            
            app.content.Mount(result);
        }
    }
    return false;
};

xhttp.open("post", "read", true);
xhttp.send("type=Contact&table=contact");