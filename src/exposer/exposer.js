export class Exposer {

    constructor() {
        this.exposedHook = null
    }

    setExposedHook = (hook) => {
        this.exposedHook = hook
    }

    getExposedHook = () => {
        return this.exposedHook
    }

}