function SimpleStack(am, w, h)
{
	this.init(am, w, h);
}
SimpleStack.prototype = new Algorithm();
SimpleStack.prototype.constructor = SimpleStack;
SimpleStack.superclass = Algorithm.prototype;
SimpleStack.ELEMENT_WIDTH = 30;
SimpleStack.ELEMENT_HEIGHT = 30;
SimpleStack.INSERT_X = 30;
SimpleStack.INSERT_Y = 30;
SimpleStack.STARTING_X = 30;
SimpleStack.STARTING_Y = 100;
SimpleStack.FOREGROUND_COLOR = "#000055"
SimpleStack.BACKGROUND_COLOR = "#AAAAFF"

SimpleStack.prototype.init = function(am, w, h)
{
	SimpleStack.superclass.init.call(this, am, w, h);
	this.addControls();
	this.nextIndex = 0;
	this.stackID = [];
	this.stackValues = [];

	this.stackTop = 0;
}

SimpleStack.prototype.addControls =  function()
{
	this.controls = [];

	
    this.pushField = addControlToAlgorithmBar("Text", "");
    this.pushField.onkeydown = this.returnSubmit(this.pushField,  
                                               this.pushCallback.bind(this), 
                                               4,                           
                                               false);                      
	this.controls.push(this.pushField);
	
	this.pushButton = addControlToAlgorithmBar("Button", "Push");
	this.pushButton.onclick = this.pushCallback.bind(this);
	this.controls.push(this.pushButton);
	
	this.popButton = addControlToAlgorithmBar("Button", "Pop");
	this.popButton.onclick = this.popCallback.bind(this);
	this.controls.push(this.popButton);	
}

SimpleStack.prototype.reset = function()
{
	this.nextIndex = 0;
	this.stackTop = 0;
}


SimpleStack.prototype.pushCallback = function()
{
	var pushedValue = this.pushField.value;
	
	if (pushedValue != "")
	{
		this.pushField.value = "";
		this.implementAction(this.push.bind(this), pushedValue);
	}
	
}

SimpleStack.prototype.popCallback = function()
{
	this.implementAction(this.pop.bind(this), "");
}


SimpleStack.prototype.push = function(pushedValue)
{
	this.commands = [];
	
	this.stackID[this.stackTop] = this.nextIndex++;
	
	this.cmd("CreateRectangle", this.stackID[this.stackTop], 
			                    pushedValue, 
								SimpleStack.ELEMENT_WIDTH,
								SimpleStack.ELEMENT_HEIGHT,
								SimpleStack.INSERT_X, 
			                    SimpleStack.INSERT_Y);
	this.cmd("SetForegroundColor", this.stackID[this.stackTop], SimpleStack.FOREGROUND_COLOR);
	this.cmd("SetBackgroundColor", this.stackID[this.stackTop], SimpleStack.BACKGROUND_COLOR);
	this.cmd("Step");
	var nextXPos = SimpleStack.STARTING_X + this.stackTop * SimpleStack.ELEMENT_WIDTH;
	var nextYPos = SimpleStack.STARTING_Y;
	this.cmd("Move", this.stackID[this.stackTop], nextXPos, nextYPos);
	this.cmd("Step"); // Not necessary, but not harmful either
	this.stackTop++;
	return this.commands;
}

SimpleStack.prototype.pop = function(unused)
{
	this.commands = [];
	
	if (this.stackTop > 0)
	{
		this.stackTop--;
		
		this.cmd("Move", this.stackID[this.stackTop], SimpleStack.INSERT_X, SimpleStack.INSERT_Y);
		this.cmd("Step");
		this.cmd("Delete", this.stackID[this.stackTop]);
		this.cmd("Step");
	}
	return this.commands;
}
SimpleStack.prototype.disableUI = function(event)
{
	for (var i = 0; i < this.controls.length; i++)
	{
		this.controls[i].disabled = true;
	}
}

SimpleStack.prototype.enableUI = function(event)
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
	currentAlg = new SimpleStack(animManag, canvas.width, canvas.height);
	
}