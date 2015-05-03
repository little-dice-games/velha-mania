var MincerEnvironment = function (Mincer, env) {
    if (env === 'production') {
        return;
    }

    Mincer.Environment.prototype.findAsset = function (path, options) {
        options = options || {};
        options.bundle = (typeof options.bundle === 'undefined') ? true : !!options.bundle;
        return this.index.findAsset(path, options);
    };
};

module.exports = MincerEnvironment;