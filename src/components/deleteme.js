var imageId = numgl.store_picture("image");
numgl.show_canvas(imageId);
var convResult = numgl.convolution(imageId,[0,-1,0,-1,5,-1,0,-1,0]);
numgl.threshold(convResult,9);
numgl.do_it();
