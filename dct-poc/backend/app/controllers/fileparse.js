class Fileparser {
    constructor(mylbl) {
        this.label = mylbl;
    }

    OnlineUploads(filename) {
        return this.label = "Online Uploads " + filename;
    }

    AccurateUploads() {
        return this.label = "Accurate Uploads " + filename;
    }
}

module.exports = Fileparser;
