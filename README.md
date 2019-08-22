# circularSlider.js

<b>Circular Slider around a single point</b>

use with 

```
var cslider = new cSlider(300, 300) //  center of circle in pixel

window.addEventListener('cSliderstep',(e)=>{
  
  // do something
  console.log(e.detail.increment)
  //console.log(e.detail.clockwise)
  
})

window.onmousemove = (e) => cslider.update(e.pageX,e.pageY)
```


© Friedrich Söllner, 2019

