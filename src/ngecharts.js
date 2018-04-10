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
                        window.addEventListener("resize", function(event) {chart.resize();}, false);
                    }

                    if(scope.config && scope.config.dataLoaded === false){
                        chart.showLoading();
                    }

                    if(scope.config && scope.config.dataLoaded){
                        //增加错误和无数据提醒
                        if(scope.config.error || scope.config.noData) {
                            //隐藏x轴
                            if(scope.option.xAxis) {
                                scope.option.xAxis.show = false;
                            } else {
                                scope.option.xAxis = {show: false};
                            }
                            //隐藏y轴
                            if(scope.option.yAxis) {
                                scope.option.yAxis.show = false;
                            } else {
                                scope.option.yAxis = {show: false};
                            }
                            //隐藏legend
                            if(scope.option.legend) {
                                scope.option.legend.show = false;
                            } else {
                                scope.option.legend = {show: false};
                            }
                            //清除数据
                            if(scope.option.series)
                            {
                                scope.option.series = [];
                            }
                            //增加提示
                            scope.option.graphic = {
                                type: 'text',
                                left: 'center',
                                top: 'center',
                                z: 100,
                                style: {
                                    text: scope.config.error ? "数据获取失败" : "暂无数据",
                                    font: 'bold 1em Microsoft YaHei'
                                }
                            }
                        }
                        else {
                            //显示x轴
                            if(scope.option.xAxis) {
                                scope.option.xAxis.show = true;
                            }
                            //显示y轴
                            if(scope.option.yAxis) {
                                scope.option.yAxis.show = true;
                            }
                            //显示legend
                            if(scope.option.legend) {
                                scope.option.legend.show = true;
                            }
                            //隐藏提示
                            if(scope.option.graphic) {
                                scope.option.graphic.invisible = true;
                            }
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
