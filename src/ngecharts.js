/**
 * Created by liekkas.zeng on 2015/1/7.
 */
angular.module('ng-echarts',[])
    .directive('ngEcharts',[function(){
        return {
            link: function(scope,element,attrs,ctrl){
                function refreshChart(){
                    //判断是否存在实例
                    var chart = echarts.getInstanceByDom(element[0]);
                    if(!chart) {
                        var theme = (scope.config && scope.config.theme)
                            ? scope.config.theme : 'default';
                        chart = echarts.init(element[0],theme);
                        // 增加浏览器自适应功能
                        window.addEventListener('resize', function(event) {chart.resize();}, false);
                        //增加div罩
                        var div = document.createElement('div');
                        var text = (scope.config && scope.config.noDataText) ? scope.config.noDataText : '无数据';
                        div.setAttribute('class', 'ng-charts-data-empty');
                        div.setAttribute('style', 'position: absolute; left: 0; right: 0; top: 0; bottom: 0;' +
                            'justify-content: center; align-items: center; color: #888; font-size: 14px; ' +
                            'background-color: rgba(255, 255, 255, .7);');
                        div.appendChild(document.createTextNode(text));
                        element[0].insertAdjacentElement('beforeend', div);
                    }

                    if(scope.config && scope.config.dataLoaded === false){
                        chart.showLoading();
                    }

                    if(scope.config && scope.config.dataLoaded){
                        if(scope.config.noData) {
                            element[0].querySelector('.ng-charts-data-empty').style.display = 'flex';
                        } else {
                            element[0].querySelector('.ng-charts-data-empty').style.display = 'none';
                        }
                        chart.setOption(scope.option);
                        chart.resize();
                        chart.hideLoading();
                    }

                    if(scope.config && scope.config.event){
                        if(angular.isArray(scope.config.event)){
                            angular.forEach(scope.config.event,function(value,key){
                                for(var e in value){
                                    chart.on(e,value[e]);
                                }
                            });
                        }
                    }
                }

                //自定义参数 - config
                // event 定义事件
                // theme 主题名称
                // dataLoaded 数据是否加载

                scope.$watch(
                    function () { return scope.config; },
                    function (value) {if (value) {refreshChart();}},
                    true
                );

                //图表原生option
                scope.$watch(
                    function () { return scope.option; },
                    function (value) {if (value) {refreshChart();}},
                    true
                );
            },
            scope:{
                option:'=ecOption',
                config:'=ecConfig'
            },
            restrict:'EA'
        }
    }]);
