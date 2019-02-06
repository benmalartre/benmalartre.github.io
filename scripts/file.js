const FILE_MODE_DATAURL = 0;
const FILE_MODE_ARRAYBUFFER = 1;
const FILE_MODE_BINARYSTRING = 2;
const FILE_MODE_TEXT = 3;

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }

var AcquireFileCallback = function(e){
    alert('FILE LOADED : DataURL:'+ e.target.result);
}

var AcquireFile = function(url, callback, mode=FILE_MODE_DATAURL){
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'blob';
    request.onload = function() {
        var reader = new FileReader();
        switch(mode){
            case FILE_MODE_ARRAYBUFFER:
                reader.readAsArrayBuffer(request.response);
                break;
            case FILE_MODE_BINARYSTRING:
                reader.readAsBinaryString(request.response);
                break;
            case FILE_MODE_TEXT:
                reader.readAsText(request.response);
                break;
            default:
                reader.readAsDataURL(request.response);
                break;
       }
       reader.onload = callback;
    };
    request.send();
}
