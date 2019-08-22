# circularSlider.js

<b>Circular Slider around a single point</b>


Create a `cSlider` object, update it with your mouse position and get an event for every slider increment

```
var cslider = new cSlider(300, 300) //  center of circle in pixel

window.addEventListener('cSliderstep',(e)=>{
  
  // do something
  console.log(e.detail.increment)
  
})

window.onmousemove = (e) => cslider.update(e.pageX,e.pageY)
```


Vary the responsive slider area like this

```
cslider.maxradius = 200
cslider.minradius = 80
```

Visualize the responsive area as a DOM element

```
yourDOMelement.appendChild(cslider.getAreaElement()) 
```




© Friedrich Söllner, 2019

