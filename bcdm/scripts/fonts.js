//Get Image Size
function getImgSize(imgSrc)
{
	var newImg = new Image();
	newImg.src = imgSrc;
	var height = newImg.height;
	var width = newImg.width;
	alert ('The image size is '+width+'*'+height);
}

// Fonts from bitmap
function fontsFromBitmaps(message,image)
{
	getImgSize(image);
}

