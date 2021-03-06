# 该项目在原项目的基础下增加resize事件的重绘功能以及无数据时的配置
无数据增加两个配置：
>* ecConfig：其他参数的配置项  
>&nbsp;&nbsp;- noData: 无数据（dataLoaded为true有效）  
>&nbsp;&nbsp;- noDataText: 无数据提示文本（dataLoaded为true有效，默认为"无数据"）  

# 以下为原项目的介绍

angularjs版echarts 支持最新ECharts3.8.5

> 3.x主题API发生了改变,去掉了内置的主题

## 组件构建
>* git clone https://github.com/AlanSune/ng-echarts.git
>* npm i
>* gulp

## 组件应用

ng-echarts只需要两个变量：
>* ecOption：也就是echarts中的option，因此你直接可以把官网的例子拷进来用  
>* ecConfig：其他参数的配置项  
>&nbsp;&nbsp;- theme：图表主题名称  
>&nbsp;&nbsp;- event：绑定事件  
>&nbsp;&nbsp;- dataLoaded：数据是否加载（用于Loading）  
    
### 注意事项
>* ECharts3.8.5没有内置地图,如果想用地图组件,需要先引入地图数据,[点这里](http://echarts.baidu.com/download-map.html)
>* ECharts3.8.5主题设置也发生了,变化,需要先引入主题数据,[点这里](http://echarts.baidu.com/download-theme.html)

一个简单示例：
html中
```
<div ng-controller="Ctrl1">
     <ng-echarts class="col-md-6 echarts" ec-config="lineConfig" ec-option="lineOption" ></ng-echarts>
</div>
```
js中
```
    .controller('Ctrl1',function($scope,$interval,$timeout){
            function onClick(params){
                console.log(params);
            };
            
            $scope.lineConfig = {
                                theme:'default',
                                event: [{click:onClick}],
                                dataLoaded:true，
                                //noData: true,
                                //noDataText: "无加载数据",
                            };
    
            $scope.lineOption = {
                title : {
                    text: '未来一周气温变化(5秒后自动轮询)',
                    subtext: '纯属虚构'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['最高气温','最低气温']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value} °C'
                        }
                    }
                ],
                series : [
                    {
                        name:'最高气温',
                        type:'line',
                        data:[11, 11, 15, 13, 12, 13, 10],
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'最低气温',
                        type:'line',
                        data:[1, -2, 2, 5, 3, 2, 0],
                        markPoint : {
                            data : [
                                {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name : '平均值'}
                            ]
                        }
                    }
                ]
            };
        })
```

