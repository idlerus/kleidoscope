class textType
{
    constructor()
    {
        this.lastRender = 0;
        this.items = [
            '.tech',
            '.space',
            '.cool',
            '.fun',
            '.website',
            '.cloud',
            '.gg',
            '.art'
        ];
        this.text = document.getElementById('switch');
        this.wrapper = document.getElementById('logo');
        this.progress = 0;
        this.progressText = 0;
        this.lifespan = 0;
        this.cursorOn = false;
        this.fadeIn = true;
        this.fadeOut = 50;
        this.cursorBlink = 30;
        this.typeDelay = 15;
    }

    updateText()
    {
        this.text.innerHTML = this.items[this.progress].slice(0, this.progressText) + (this.cursorOn ? '|' : '');
        if (this.lifespan % this.cursorBlink == 0)
        {
            this.cursorOn = !this.cursorOn;
        }
        if (this.lifespan % this.typeDelay == 0)
        {
            if (this.fadeIn)
            {
                if (this.progressText < this.items[this.progress].length) this.progressText++;
                else
                {
                    this.fadeIn = false;
                }
            } else
            {
                if (this.progressText > 0) this.progressText--;
                else
                {
                    this.fadeIn = true;
                    this.progressText = 0;
                    if (this.progress < this.items.length - 1) this.progress++;
                    else this.progress = 0;
                }
            }
        }
        this.lifespan++;
    }
}