class body {

    constructor(canvas, lifeExpectancy = 100, mousePos, config = null)
    {
        this.speedMax = 50;
        this.speedMin = 2;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.lifeExpectancy = lifeExpectancy;
        this.lifeSpan = this.lifeExpectancy;
        this.mousePos = {
            x: mousePos.x,
            y: mousePos.y
        }
        this.config = config;
        this.direction = Math.floor(Math.random() * (360)) * Math.PI / 180;
        this.speed = Math.floor(Math.random() * (this.speedMax - this.speedMin)) + this.speedMin;
    }

    draw()
    {
        this.lifeSpan--;
    }

    isItMe(me)
    {
        return me === this;
    }
}

class circle extends body
{
    draw()
    {
        this.context.beginPath();
        let x = parseFloat(this.mousePos.x + this.speed * (Math.cos(this.direction))) + (this.lifeSpan/this.lifeExpectancy);
        let y = parseFloat(this.mousePos.y + this.speed * (Math.sin(this.direction))) + (this.lifeSpan/this.lifeExpectancy);
        this.context.arc(x, y, (this.config.radius * (1 - this.lifeSpan/this.lifeExpectancy)), 0, 2 * Math.PI);
        this.context.lineWidth = 10;
        this.context.strokeStyle = 'rgba(' + this.config.red + ', ' + this.config.green + ', ' + this.config.blue + ', ' + (this.config.opacity * this.lifeSpan/this.lifeExpectancy) + ')';
        this.context.stroke();
        super.draw();
    }
}

class kleidoscope extends body
{
    constructor(canvas, lifeExpectancy = 100, mousePos, config = null)
    {
        super(canvas, lifeExpectancy, mousePos, config);
        this.rotation = 0;
    }

    draw()
    {
        this.context.beginPath();
        let x = parseFloat(this.mousePos.x + this.speed * (Math.cos(this.direction))) * (this.lifeSpan/this.lifeExpectancy);
        let y = parseFloat(this.mousePos.y + this.speed * (Math.sin(this.direction))) * (this.lifeSpan/this.lifeExpectancy);
        this.context.lineWidth = 3;
        this.context.strokeStyle = 'rgba(' + this.config.red + ', ' + this.config.green + ', ' + this.config.blue + ', ' + (this.config.opacity * this.lifeSpan/this.lifeExpectancy) + ')';

        let radius = this.config.radius * (1 - this.lifeSpan/this.lifeExpectancy);
        for (let i=0; i < this.config.sides; i++)
        {
            let theta = ((360/this.config.sides*(i+1))+this.rotation) * Math.PI / 180;
            if (i == 0)
                this.context.moveTo(x + radius * Math.cos(theta), y + radius * Math.sin(theta));
            else
                this.context.lineTo(x + radius * Math.cos(theta), y + radius * Math.sin(theta));
        }
        this.context.closePath();
        this.context.stroke();

        for (let i=0; i < this.config.sides; i++)
        {
            let theta = ((360/this.config.sides*(i+1))-this.rotation) * Math.PI / 180;
            if (i == 0)
                this.context.moveTo(x + (radius/2) * Math.cos(theta), y + (radius/2) * Math.sin(theta));
            else
                this.context.lineTo(x + (radius/2) * Math.cos(theta), y + (radius/2) * Math.sin(theta));
        }
        this.context.closePath();
        this.context.stroke();

        this.rotation += 2;
        super.draw();
    }
}