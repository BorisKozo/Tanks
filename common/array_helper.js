define([], function () {
    // Array Remove - By John Resig (MIT Licensed)
    var _remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };

    return {
        remove: function (array, from, to) {
            _remove.call(array, from, to);
        }
    };
});