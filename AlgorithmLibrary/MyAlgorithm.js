function MyAlgorithm(am, w, h)
{
	this.init(am, w, h);
}

MyAlgorithm.prototype = new Algorithm();
MyAlgorithm.prototype.constructor = MyAlgorithm;
MyAlgorithm.superclass = Algorithm.prototype;

MyAlgorithm.prototype.init = function(am, w, h)
{
	MyAlgorithm.superclass.init.call(this, am, w, h);
	
	this.addControls();

	this.nextIndex = 0;
	
}

MyAlgorithm.prototype.addControls =  function()
{
	this.controls = [];

}

MyAlgorithm.prototype.reset = function()
{
	this.nextIndex = 0;

}


MyAlgorithm.prototype.disableUI = function(event)
{
	for (var i = 0; i < this.controls.length; i++)
	{
		this.controls[i].disabled = true;
	}
}
MyAlgorithm.prototype.enableUI = function(event)
{
	for (var i = 0; i < this.controls.length; i++)
	{
		this.controls[i].disabled = false;
	}
}


var currentAlg;

function init()
{
	var animManag = initCanvas();
	currentAlg = new MyAlgorithm(animManag, canvas.width, canvas.height);
	
}