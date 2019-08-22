// circular slider 
//
// create a circular slider around some point
//
// © Friedrich Söllner, 2019
//


class cSlider {
	// constructor(centerX, centerY){
		// this.center = {'x':centerX,'y':centerY}
	// }
	constructor(centerX, centerY){
		this.center = {'x':centerX,'y':centerY}
	}
	
	downvector = {'x':0.0,'y':-1.0}
    leftvector = {'x':-1.0,'y':0.0}
    magnitude = 0.0
	
	mouseposnew = {'x':0,'y':0}
	mouseposition = {'x':0,'y':0}
	mousevector = {'x':0,'y':0}
	
	isenabled = true
	
	sliderpos = 0.0
	
	//stepsize = 40
	// steppos = 0
	steps = 12
	ssteps = this.steps
	stepsize =  Math.PI / (this.steps/2) // radians
	
	oldstep = 0
	radstep = 0 // increasing radian step 
	incrementstep = 0 // counting step
	
	
	anglethresh = 0.6 // rad
	rotationold = 0.0 // rad
	allrotation = 0.0 // rad
	currentrot = 0.0
	subtractrot = 0.0
	
	maxradius = 100
	minradius= 0
	
	radianrep = (Math.PI / 180) 
	
	// math
	normVector(invec){
		let _mag  = Math.sqrt(invec.x*invec.x+invec.y*invec.y)
		this.magnitude =  _mag // to be moved to class properties
		return {'x':invec.x/_mag,'y':invec.y/_mag}
	}
	getMagnitude(invec) {
		return Math.sqrt(invec.x*invec.x+invec.y*invec.y)
	}
	
	rotateAround(cen,point,angle){
		let cos = Math.cos(this.radianrep*angle)
		let sin = Math.sin(this.radianrep*angle)
		return {'x':(cos * (point.x - cen.x)) + (sin * (point.y - cen.y)) + cen.x,
					'y':(cos * (point.y - cen.y)) - (sin * (point.x - cen.x)) + cen.y}
	}
	
	
	// hid
	
	update(mx,my, enable){
		// check if 3rd parameter exists
		if(typeof enable !== "undefined") this.isenabled = enable
		else this.enable = true
		
		this.mouseposnew = {'x':mx,'y':my}
		this.mousevector =  {'x':mx- this.mouseposition.x,'y':my - this.mouseposition.y}
		this.mouseposition = this.mouseposnew
		this.magnitude= this.getMagnitude(this.mousevector)
		
		this.getCircularDir()
	}
	
	updateSteps() {
		if(this.steps!=this.ssteps) {this.stepsize=Math.PI / (this.steps/2); this.ssteps = this.steps;}
	}
	
	insideArea() {
		let tempvector = {'x':this.mouseposition.x - this.center.x,'y':this.mouseposition.y-this.center.y}
		let tempdist = Math.sqrt(tempvector.x*tempvector.x+tempvector.y*tempvector.y)
		if(tempdist<=this.maxradius && tempdist>=this.minradius) return true
		else return false
	}
	
	getAreaElement(elem) {
		let circle = document.createElement('div')
		circle.setAttribute('style','-moz-box-sizing: border-box;box-sizing: border-box;display:block;position:absolute;transform: translate( -50%, -50%);')
		circle.setAttribute('draggable','false')
		circle.style.backgroundColor = 'transparent'
		let borderw = this.maxradius-this.minradius
		let radius = this.maxradius*2
		//console.log(borderw)
		circle.style.border = borderw +'px solid green'
		circle.style.width = radius + 'px'
		circle.style.height = radius + 'px'
		circle.style.borderRadius = (radius/2) + 'px'
		circle.style.top = this.center.y + 'px'
		circle.style.left = this.center.x + 'px'
		circle.style.opacity = 0.1
		return circle
	}
	
	getCircularDir(){
		
		this.updateSteps()
		
		// circular vector
		let cv = this.rotateAround(this.mouseposition,this.center,90)
		
		cv.x = cv.x-this.mouseposition.x; cv.y = cv.y-this.mouseposition.y
		cv = this.normVector(cv)
		let crotation = Math.atan2(cv.y,cv.x)+Math.PI // radians from 0 ... 2 PI , bottom clockwise
		
		//mouse move vector
		let mv = this.normVector(this.mousevector)
		let mdirection = Math.atan2(mv.y,mv.x)+Math.PI
		
		let isclockwise = Math.cos(crotation-mdirection) > this.anglethresh
		let iscounterclockwise = Math.cos(crotation-mdirection) < -this.anglethresh
		
		//// frame based
		//if(isclockwise) {sliderpos += 1} else if(iscounterclockwise) {sliderpos -=1}
		//return sliderpos
		
		//// mouse travel based
		//if(isclockwise) {this.sliderpos += this.magnitude} else if(iscounterclockwise) {this.sliderpos -=this.magnitude}
		// return this.sliderpos
		
		// angle based 
		let cyclethresh = 5.0 // after full cycle
		 if(isclockwise) {
			 if (this.rotationold- crotation > cyclethresh) this.allrotation += Math.PI *2	
		  }
		else if(iscounterclockwise) {
				 if(this.rotationold - crotation < -cyclethresh) this.allrotation -= Math.PI *2
		}
		
		
		let trot = this.allrotation+crotation
		this.radstep = Math.round((trot - trot%this.stepsize)/this.stepsize) // Round to prevent 62.999999...
		
		this.rotationold = crotation
		
		
		if(this.radstep!=this.oldstep){
			
			this.oldstep=this.radstep;
			
			if(this.insideArea() && this.isenabled) {
				if(isclockwise) this.incrementstep +=1
				else if(iscounterclockwise) this.incrementstep -= 1
				let estate = {'x':this.mouseposition.x,'y':this.mouseposition.y,'increment':this.incrementstep,'absolute':this.radstep,'clockwise':isclockwise}
				this.OnChange(estate);}
			}
		
		
	}
	
	OnChange(state){
		
		var evt = new CustomEvent('cSliderstep', { detail: state});
		window.dispatchEvent(evt)
	}
	
}

// debug
	function cDot(px,py,diam,opac){
		let circle = document.createElement('div')
		circle.setAttribute('style','-moz-box-sizing: border-box;box-sizing: border-box;display:block;position:absolute;transform: translate( -50%, -50%)')
		circle.style.backgroundColor = 'white'
		circle.style.border = '3px solid black'
		circle.style.width = diam + 'px'
		circle.style.height = diam + 'px'
		circle.style.borderRadius = (diam/2) + 'px'
		circle.style.top = py + 'px'
		circle.style.left = px + 'px'
		if(opac) circle.style.opacity = opac
		return circle
	}
	function fadingDot(px,py,diam,opac) {
		let circle = cDot(px,py,diam,opac)
		let op = 1
		let timer = setInterval(function () {
			if (op <= 0.1){
				clearInterval(timer);
				circle.style.display = 'none';
			}
			circle.style.opacity = op;
			circle.style.filter = 'alpha(opacity=' + op * 100 + ")";
			op -= op * 0.1;
		}, 50)
			
		return circle
	}


// leftovers

// rotate around another point
// function rotateAround(cen,point,angle){
	// let radians = (Math.PI / 180) * angle,
    // cos = Math.cos(radians),
    // sin = Math.sin(radians)
    // return {'x':(cos * (point.x - cen.x)) + (sin * (point.y - cen.y)) + cen.x,
				// 'y':(cos * (point.y - cen.y)) - (sin * (point.x - cen.x)) + cen.y}
// }




// function getNormAngle(invec){
	// return Math.atan2(invec.x,invec.y)
// }

// function getAngle(vec0, vec1){
	// return Math.atan2(vec0.y,vec0.x)-Math.atan2(vec0.y,vec1.x)
// }

// angle in radians
// function  getAngleRadians (p1,p2){ return Math.atan2(p2.y - p1.y, p2.x - p1.x)}

// angle in degrees
// function getAngleDeg(p1,p2) {return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI}

