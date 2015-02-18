var moduleFiltering = function () {

    return {
        name: "filtering",
        init: function (sandbox) {
            var filters = [];
            sandbox.listen(events.requireFiltering, function () {
                filters = [];
                var event = {
                    type: events.requireListOfFilters,
                    data: null
                }
                sandbox.notify(event);
                var inputData = sandbox.getOriginalDatasource().data;
                var inputSchema = sandbox.getOriginalDatasource().schema;
                var filteredDataSource = {
                    data: [],
                    schema: []
                }
                filteredDataSource.data = inputData;
                filteredDataSource.schema = inputSchema;
                _.each(filters, function (num) {
                    filteredDataSource.data = num.filter(filteredDataSource.data, num.config);
                });
                var event = {
                    type: events.updatedDataSource,
                    data: filteredDataSource
                }
                sandbox.notify(event);
            });
            sandbox.listen(events.sendFilterSettings, function (filter) {
                filters.push(filter);
            });
        }
    }
}();
