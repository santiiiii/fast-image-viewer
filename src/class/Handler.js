class Handler {

    /**
     * Receives a URL
     * Creates the main canvas
     * Calls the load function defined by the implementer
     * Calls the draw function defined by the implementer
     * If you extend the constructor remember to call super
     * @return {[type]} [description]
     */
    constructor (url, container) {
        const min_dimension = Math.min(container.clientHeight, container.clientWidth);
        const logb2 = Math.log(min_dimension) / Math.log(2);
        const expt = Math.floor(logb2);
        this.BASE_SIZE = Math.pow(2, expt);
        this.SIZE = this.BASE_SIZE;
        this.__createCanvas();
        this.load(url);
        this.draw();
    }

    // YOU SHOULD NOT USE THIS FUNCTION
    /**
     * Creates a canvas with the active Size
     * Size should not be modified directly by the implementer
     * @return {[type]} [description]
     */
    __createCanvas () {
        this.canvas = document.createElement('canvas');

        //Set Canvas Size
        this.canvas.width = this.SIZE;
        this.canvas.height = this.SIZE;

        //Create 2D context 
        this.context = this.canvas.getContext('2d');
    }

    // YOU SHOULD NOT USE THIS FUNCTION
    /**
     * Deletes the current instance of the canvas
     * @return {[type]} [description]
     */
    __deleteCanvas () {
        this.canvas = null;
        this.context = null;
    }

    // YOU SHOULD NOT USE THIS FUNCTION
    /**
     * Resize the current canvas to the desired size
     * @param  {[int]} scale [size]
     * @return {[type]}  [description]
     */
    __resize (scale) {
        this.SIZE = this.BASE_SIZE * scale;
        this.canvas.width = this.SIZE;
        this.canvas.height = this.SIZE;
        this.draw();
    }

    // YOU SHOULD NOT USE THIS FUNCTION
    /**
     * Get a square from the canvas matching the provided coordinates
     * @param  {Number} x [coordinate x of canvas slice to redraw]
     * @param  {Number} y [coordinate y of canvas slice to redraw]
     * @return {ImageData}  [New ImageData from canvas slice]
     */
    __getAt (x, y) {
        let imageData = this.context.getImageData(x, y, this.BASE_SIZE, this.BASE_SIZE);
        let base = imageData.data;
        let array = new Uint8ClampedArray(base.length);
        let arrayLength = array.length;

        for (let i = 0; i < arrayLength; i+=4) {
            array[i + 1] = base[i + 3];
        }

        return {
            defaultMap: imageData,
            transparencyMap: new ImageData(array, this.BASE_SIZE, this.BASE_SIZE)
        };
    }

    /**
     * This function should be extended by the implementer
     * Beeing in charge of loading all the necesary resources
     * To display the image in the viewer
     * @return {Promise} [description]
     */
    load (BASE_URL) {
        return Promise.resolve();
    }

    /**
     * This method should be extended by the implementer
     * Beeing in charge of defining a way of drawing the
     * Resources into the Canvas
     * @return {ImageData}
     */
    draw () {}

    /**
     * This Function should be extended by the implementer
     * Beeing in charge of calling the super.clear() method
     * and clearing all of the resources loaded in the load()
     * function or any other defined function
     * @return {[type]} [description]
     */
    clear () {}

}

export default Handler