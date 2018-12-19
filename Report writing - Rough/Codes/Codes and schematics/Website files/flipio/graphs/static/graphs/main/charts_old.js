var endpoint = "/api/power/";
var points = 7;

$.getJSON(endpoint, function (result) {
    var labels = [], data1 = [], data2 = [];

    for (var i =(result.length-points); i < result.length ; i++){
            labels.push(result[i].id);
            data1.push(parseInt(result[i].TruePower));
            data2.push(parseInt(result[i].ReactivePower));
            console.log(data1);
    }


Highcharts.chart('lineChart2', {
    chart: {
        type: 'line'
    },
    title: {
        text: null
    },
    subtitle: {
        text: null
    },
    xAxis: {
        categories: labels
    },
    yAxis: {
        title: {
            text: null
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Real',
        data: data1
    }, {
        name: 'Reactive',
        data: data2
    }],
     credits: {
      enabled: false
  }
});

});


var endpoint2 = "/api/temp/";
var points2 = 5;
$.getJSON(endpoint2, function (result) {
    var labels2 = [], data3 = [];

    for (var i =(result.length-points2); i < result.length ; i++){
            labels2.push(result[i].id);
            data3.push(parseInt(result[i].temperature));
            console.log("result");
    }


Highcharts.chart('lineChart', {
    chart: {
        type: 'line'
    },
    title: {
        text: null
    },
    subtitle: {
        text: null
    },
    xAxis: {
        categories: labels2
    },
    yAxis: {
        title: {
            text: null
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: false
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Temperature (°C)',
        data: data3
    }],

     credits: {
      enabled: false
  }


});
});



$(function () {
$('#chart_container').highcharts({
chart: {
type: 'bar'
},
title: {
text: 'Monthly Sales'
},
xAxis: {
categories: ['Jan', 'Feb', 'Mar','Apr']
},
yAxis: {
title: {
text: 'numbers'
}
},
series: [{
name: 'John',
data: [1, 0, 4]
}, {
name: 'King',
data: [5, 7, 3]
}]
});
});



$(function () {
    var gaugeOptions = {

    chart: {
        type: 'solidgauge'
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '100%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: -70
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

// The speed gauge
var chartSpeed = Highcharts.chart('container-speed', Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 200,
        title: {
            text: 'Speed'
        }
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Speed',
        data: [80],
        dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                   '<span style="font-size:12px;color:silver">km/h</span></div>'
        },
        tooltip: {
            valueSuffix: ' km/h'
        }
    }]

}));

// The RPM gauge
var chartRpm = Highcharts.chart('container-rpm', Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 5,
        title: {
            text: 'RPM'
        }
    },

     credits: {
      enabled: false
  },

    series: [{
        name: 'RPM',
        data: [1],
        dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                   '<span style="font-size:12px;color:silver">* 1000 / min</span></div>'
        },
        tooltip: {
            valueSuffix: ' revolutions/min'
        }
    }]

}));

// Bring life to the dials
setInterval(function () {
    // Speed
    var point,
        newVal,
        inc;

    if (chartSpeed) {
        point = chartSpeed.series[0].points[0];
        inc = Math.round((Math.random() - 0.5) * 100);
        newVal = point.y + inc;

        if (newVal < 0 || newVal > 200) {
            newVal = point.y - inc;
        }

        point.update(newVal);
    }

    // RPM
    if (chartRpm) {
        point = chartRpm.series[0].points[0];
        inc = Math.random() - 0.5;
        newVal = point.y + inc;

        if (newVal < 0 || newVal > 5) {
            newVal = point.y - inc;
        }

        point.update(newVal);
    }
}, 1000);



});



$(function () {
  var g5 = new JustGage({
    id: "g5",
    value: getRandomInt(0, 300),
    min: 0,
    max: 300,
    title: "Volts",
    label: "",
    levelColorsGradient: false
  });

  });

  $(function () {
  var g6 = new JustGage({
    id: "g6",
    value: getRandomInt(0, 10),
    min: 0,
    max: 10,
    title: "Amps",
    label: "",
    levelColorsGradient: false
  });

  });


