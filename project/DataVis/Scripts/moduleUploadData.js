var moduleUploadData = function () {

    var mySandbox;
    var elementInputFile;

    function getDefaultConfig() {
        return null;
    }

    function main(sb, config) {
        var element = sb.getContainer();
    }

    return {
        name: "uploadData",
        init: function (sb) {
            mySandbox = sb;
            var config = getDefaultConfig();
            main(sb, config);

            return {
                setConfig: function (newConfig) {
                    config = newConfig;
                    main(sb, config);
                },
                getConfig: function () {
                    return config;
                }
            }
        }
    }
}();

