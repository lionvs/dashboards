var htmlTemplates = {
    dataTable: '<table border="1" class="table">                                                    \
                    <tr>                                                                            \
                        <th ng-repeat="schemaItem in schema">{{schemaItem}}</th>                    \
                    </tr>                                                                           \
                    <tr ng-repeat="dataItem in data">                                               \
                        <td ng-repeat="schemaItem in schema">{{dataItem[schemaItem]}}</td>          \
                    </tr>                                                                           \
                </table>',
    filter:     '<label class="rangeBorderLbl">Min X</label>                                                      \
                <input type="text" class="rangeBorderTxt" ng-model="filterConfig.x.min">                          \
                <br/><label class="rangeBorderLbl">Max X</label>                                                  \
                <input type="text" class="rangeBorderTxt" ng-model="filterConfig.x.max">                          \
                <br/><label class="rangeBorderLbl">Min Y</label>                                                  \
                <input type="text" class="rangeBorderTxt" ng-model="filterConfig.y.min">                          \
                <br/><label class="rangeBorderLbl">Max Y</label>                                                  \
                <input type="text" class="rangeBorderTxt" ng-model="filterConfig.y.max">                          \
                <div id="filterTableWrapper">                                                                     \
                    <div id="filterTableScroll">                                                                  \
                    <table>                                                                                       \                                                                          \
                        <tr ng-repeat="item in titlesArr">                                                        \
                            <td><input type="checkbox" ng-model="item.isValid"></td>                              \
                            <td>{{item.value}}</td>                                                               \
                        </tr>                                                                                     \
                    </table>                                                                                      \
                    </div>                                                                                        \
                </div>                                                                                            \
                <br/><input type="button" value="Filter Data" ng-click="filterData()"> ',
    chartConfig: "<ul>\
                <accordion close-others='oneAtATime'>\
                    <accordion-group is-open='status.open'>\
                        <accordion-heading>\
                            Chart Options \
                        </accordion-heading>\
                        <label>Title</label><input type='text' ng-model='config.title' class='form-control' ng-change='chartConfigUpdate()'>\
                        <label>Zoom</label><select class='form-control' ng-model='config.zoomType' ng-options='opt as opt for opt in zoomOptions' ng-change='chartConfigUpdate()'></select>\
                    </accordion-group>\
                    <accordion-group is-open='status.isFirstOpen' is-disabled='status.isFirstDisabled'>\
                        <accordion-heading>\
                            Data Chart Config \
                        </accordion-heading>\
                        <p>\
                            <label class='col-sm-2 control-label'>X Axis</label><select class='form-control' ng-model='config.xAxis' ng-options='opt as opt for opt in schemaOptions' ng-change='dataConfigUpdate()'></select>\
                        </p>\
                        <p>\
                            <label class='col-sm-2 control-label'>Series Names</label><select class='form-control' ng-model='config.seriesName' ng-options='opt as opt for opt in schemaOptions' ng-change='dataConfigUpdate()'></select>\
                        </p>\
                        <hr />\
                        <p>\
                            <label class='col-sm-2 control-label'>Y Axis</label><select class='form-control' ng-model='config.seriesData' ng-options='opt as opt for opt in schemaOptions' ng-change='dataConfigUpdate()'></select>\
                        </p>\
                        <p>\
                            <label class='col-sm-2 control-label'>Line Type</label><select class='form-control' ng-model='config.chartType' ng-options='opt as opt for opt in chartTypeOptions' ng-change='dataConfigUpdate()'></select>\
                        </p>\
                    </accordion-group>\
                </accordion>\
            </ul>"
}