# circularSlider.js
Circular Slider around a single point

use with 


var cslider = new cSlider(300, 300) //  center of circle in pixel

window.addEventListener('cSliderstep',(e)=>{
  
  // do something
  console.log(e.detail.increment)
  //console.log(e.detail.clockwise)
  
})

window.onmousemove = (e) => cslider.update(e.pageX,e.pageY)



