// circular slider 
//
// create a circular slider around some point
//
// © Friedrich Söllner, 2019
//


class cSlider {
	constructor(centerX, centerY){
		
		
		this.center = {'x':centerX,'y':centerY}

	}
	
	downvector = {'x':0.0,'y':-1.0}
    leftvector = {'x':-1.0,'y':0.0}
    magnitude = 0.0
	
	mouseposnew = {'x':0,'y':0}
	mouseposition = {'x':0,'y':0}
	mousevector = {'x':0,'y':0}
	
	sliderpos = 0.0
	
	stepsize = 40
	steppos = 0
	
	anglethresh = 0.6 // rad
	rotationold = 0.0 // rad
	allrotation = 0.0 // rad
	currentrot = 0.0
	
	
	radianrep = (Math.PI / 180) 
	
	// math
	normVector(invec){
		let _mag  = Math.sqrt(invec.x*invec.x+invec.y*invec.y)
		mag =  _mag // to be moved to class properties
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
	
	update(e){
		this.mouseposnew = {'x':e.pageX,'y':e.pageY}
		this.mousevector =  {'x':e.pageX- this.mouseposition.x,'y':e.pageY - this.mouseposition.y}
		this.mouseposition = this.mouseposnew
		this.magnitude= this.getMagnitude(this.mousevector)
		return this.mousevector
	}
	
	
	
	
	getCircularDir(e){
		
		//update mousepos
		this.update(e)
		
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
		//return this.sliderpos
		
		// angle based 
		let cyclethresh = 5
		 if(isclockwise) {
			 if (this.rotationold- crotation > cyclethresh) this.allrotation +=Math.PI *2	
		  }
		else if(iscounterclockwise) {
				 if(this.rotationold - crotation < -cyclethresh) this.allrotation -=Math.PI *2
		}
		
		this.rotationold = crotation
		return this.allrotation+crotation
		
		
		//// test
		//if(isclockwise) {return 'cw'} else if(iscounterclockwise) {return 'ccw'}
		//return 'no'
	}
	
	
	// debug
	createDot(px,py,diam,opac,inelem){
		var circle = document.createElement('div')
		circle.className = "center_all"
		//circle.setAttribute('style','border: 3px solid red; border-radius: 50px; width: 100px; height: 100px;-moz-box-sizing: border-box;box-sizing: border-box;')
		circle.setAttribute('style','-moz-box-sizing: border-box;box-sizing: border-box;')
		circle.style.backgroundColor = 'white'
		circle.style.border = '3px solid black'
		circle.style.width = diam + 'px'
		circle.style.height = diam + 'px'
		circle.style.borderRadius = (diam/2) + 'px'
		circle.style.top = py + 'px'
		circle.style.left = px + 'px'
		if(opac) circle.style.opacity = opac
		inelem.appendChild(circle)
	}
	
	
	
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

