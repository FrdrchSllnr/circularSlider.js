# circularSlider.js

**Incremental Circular Slider**



**Basic example**

Create a `cSlider` object, update it with your mouse position and get an event for every slider increment (clockwise is positive, counterclockwise is negative):

```
var cslider = new cSlider(300, 300) //  center of circle in pixel

window.addEventListener('cSliderstep',(e)=>{
  
  // do something
  console.log(e.detail.increment)
  
})

window.onmousemove = (e) => cslider.update(e.pageX,e.pageY)
```

**Modify**

Vary the steps per rotation:
```
cslider.steps = 32
```

Vary the responsive slider area like this:

```
cslider.maxradius = 200
cslider.minradius = 80
```

Visualize the responsive area as a DOM element:

```
yourDOMelement.appendChild(cslider.getAreaElement()) 
```
Only slide when mouse button in pressed:
```
var ismousedown = false
window.onmousedown = (e) => ismousedown=true; window.onmouseup = (e) => ismousedown=false
window.onmousemove = (e)=> cslider.update(e.pageX, e.pageY,ismousedown)
```



© Friedrich Söllner, 2019

