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
                <br/><input type="button" value="Filter Data" ng-click="filterData()"> '
}