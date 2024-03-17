<script>
    import { pixelToCoord } from '../utilities.js';

    export default {
        inject: ['provider'],
        props: {
            grid:{
                type: Array,
                default: () => []
            },
            width: {
                type: [String, Number],
                default: 100,
                validator: (val) => {
                    const parsedVal = parseInt(val, 10);
                    return !isNaN(parsedVal) && parsedVal > 0;
                }
            },
            height: {
                type: [String, Number],
                default: 100,
                validator: (val) => {
                    const parsedVal = parseInt(val, 10);
                    return !isNaN(parsedVal) && parsedVal > 0;
                }
            },
            resolution: {
                type: Number,
                default: 1,
                validator: (val) => {
                    const parsedVal = parseInt(val, 10);
                    return !isNaN(val) && val > 0;
                }
            },
            colorStep0: {
                type: String,
                default: '#3288bd'
            },
            colorStep1: {
                type: String,
                default: '#99d594'
            },
            colorStep2: {
                type: String,
                default: '#fee08b'
            },
            colorStep3: {
                type: String,
                default: '#fc8d59'
            },
        },
        computed: {
            rows(){
                return Math.floor(this.height / this.resolution);
            },
            cols(){
                return Math.floor(this.width / this.resolution);
            }
        },
        methods: {
            clear(){
                const ctx = this.provider.context;

                const { width,height } = this;

                ctx.clearRect(0, 0, width, height);
            }
        },
        watch: {
            width(){
                this.clear();
            },
            height(){
                this.clear();
            },
            resolution(){
                this.clear();
            }
        },
        render() {
            if (!this.provider.context) {
                return;
            }

            const ctx = this.provider.context;

            const {
                width,
                height,
                cols, 
                rows, 
                resolution, 
                grid,
                colorStep0,
                colorStep1,
                colorStep2,
                colorStep3,
            } = this;

            for (let pixel in grid) {
                    const {x, y} = pixelToCoord(pixel, cols);
                    const grains = grid[pixel];

                    let style = colorStep3;

                    switch (grains) {
                        case 0:
                            style = colorStep0;
                            break;
                        case 1:
                            style = colorStep1;
                            break;
                        case 2:
                            style = colorStep2;
                            break;
                    }
 
                    ctx.fillStyle = style;
                    ctx.fillRect(x * resolution, y * resolution, resolution, resolution);
                    ctx.strokeStyle = `rgba(0, 0, 0, 0.1)`;
                    ctx.strokeRect(x * resolution, y * resolution, resolution, resolution);
            }
        }
    }
</script>
