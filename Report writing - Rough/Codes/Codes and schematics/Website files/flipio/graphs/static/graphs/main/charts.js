var endpoint = "/api/power/";
var points = 7;
var chartPowerFactor;
var chartVrms;

socket = new WebSocket("ws://" + window.location.host + "/charts/");
if (socket.readyState == WebSocket.OPEN) socket.onopen();



var kwh;
$.getJSON(endpoint, function (result) {
    var labels = [], data1 = [0], data2 = [];


Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

    kwh= Highcharts.chart('lineChart', {
    chart: {
        zoomType: 'x'
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                Highcharts.numberFormat(this.y, 2);
        }
    },
    title: {
        text: null
    },
    xAxis: [{
        type: 'datetime',
            tickPixelInterval: 150,
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}tk',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Taka',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }, { // Secondary yAxis
        title: {
            text: 'Watt-Hour',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value} wH',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 0,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    series: [{
        name: 'Power Consumption',
        type: 'spline',
        yAxis: 1,
        data: [{x: (new Date()).getTime(),y: 0}],
        tooltip: {
            valueSuffix: 'wH'
        }

    }, {
        name: 'Cost',
        type: 'spline',
        data: [{x: (new Date()).getTime(),y: 0}],
        tooltip: {
            valueSuffix: 'tk'
        }
    }]
});

    });


$(function(){


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



      chartApparent = Highcharts.chart('container-apparent', Highcharts.merge(gaugeOptions, {
      yAxis: {
          min: 0,
          max: 1200,
          title: {
              text: 'Apparent Power'
          }
      },

      credits: {
          enabled: false
      },

      series: [{
          name: 'PowerFactor',
          data: [0],
          dataLabels: {
              format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                  ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                     '<span style="font-size:12px;color:silver">VA</span></div>'
          },
          tooltip: {
              valueSuffix: ' Apparent Power'
          }
      }]

  }));
      chartReal = Highcharts.chart('container-real', Highcharts.merge(gaugeOptions, {
      yAxis: {
          min: 0,
          max: 1200,
          title: {
              text: 'True Power'
          }
      },

      credits: {
          enabled: false
      },

      series: [{
          name: 'TruePower',
          data: [0],
          dataLabels: {
              format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                  ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                     '<span style="font-size:12px;color:silver">W</span></div>'
          },
          tooltip: {
              valueSuffix: 'True Power'
          }
      }]

  }));
      chartPowerFactor = Highcharts.chart('container-pf', Highcharts.merge(gaugeOptions, {
      yAxis: {
          min: 0,
          max: 1,
          title: {
              text: 'P.F'
          }
      },

      credits: {
          enabled: false
      },

      series: [{
          name: 'PowerFactor',
          data: [0],
          dataLabels: {
              format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                  ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                     '<span style="font-size:12px;color:silver"></span></div>'
          },
          tooltip: {
              valueSuffix: ' PF'
          }
      }]

  }));
      chartVrms = Highcharts.chart('container-volt', Highcharts.merge(gaugeOptions, {
      yAxis: {
          min: 0,
          max: 300,
          title: {
              text: 'RMS Voltage'
          }
      },

       credits: {
        enabled: false
    },

      series: [{
          name: 'RMS Voltage',
          data: [0],
          dataLabels: {
              format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                  ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                     '<span style="font-size:12px;color:silver">V</span></div>'
          },
          tooltip: {
              valueSuffix: ' Vrms'
          }
      }]

  }));
      chartIrms = Highcharts.chart('container-current', Highcharts.merge(gaugeOptions, {
      yAxis: {
          min: 0,
          max: 2000,
          title: {
              text: 'RMS Current'
          }
      },

       credits: {
        enabled: false
    },

      series: [{
          name: 'Current',
          data: [0],
          dataLabels: {
              format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                  ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                     '<span style="font-size:12px;color:silver">mA</span></div>'
          },
          tooltip: {
              valueSuffix: ' Irms'
          }
      }]

  }));
      chartFreq = Highcharts.chart('container-freq', Highcharts.merge(gaugeOptions, {
      yAxis: {
          min: 0,
          max: 100,
          title: {
              text: 'Frequency'
          }
      },

       credits: {
        enabled: false
    },

      series: [{
          name: 'Frequency',
          data: [0],
          dataLabels: {
              format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                  ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                     '<span style="font-size:12px;color:silver">Hz</span></div>'
          },
          tooltip: {
              valueSuffix: ' Frequency'
          }
      }]

  }));

});

var wh = 0;
var intervals=1;
var t = 0;


//console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());

socket.onmessage = function(e) {

  var time =new Date();
  var powerData=JSON.parse(e.data);
  var pf_new=0;

  if (powerData.PowerFactor>1) pf_new=1;
  else if (powerData.PowerFactor<0) pf_new=0;
  else pf_new = powerData.PowerFactor;

  updateGauges(chartApparent,parseFloat(powerData.ApparentPower.toFixed(2)));
  updateGauges(chartReal,parseFloat(powerData.TruePower.toFixed(2)));
  updateGauges(chartPowerFactor,parseFloat(pf_new.toFixed(2)));
  updateGauges(chartVrms,Math.abs(parseFloat(powerData.Vrms.toFixed(2))));
  updateGauges(chartIrms,Math.abs(parseFloat((powerData.Irms*1000).toFixed(2))));
  updateGauges(chartFreq,Math.abs(parseFloat(powerData.Frequency.toFixed(2))));

  wh = wh + (Math.abs((powerData.TruePower/3600)));
  cost = wh*3.33/1000;
console.log(parseFloat(wh.toFixed(2)));

var series = kwh.series[0],
    shift = series.data.length > 100; // shift if the series is
                                                 // longer than 20

if (t => intervals ){
            kwh.series[0].addPoint(([time.getTime(),parseFloat(wh.toFixed(2))]), true, shift);
            kwh.series[1].addPoint(([time.getTime(),parseFloat(cost.toFixed(2))]), true, shift);
            t = 0;
}
else t++;


  };

function updateGauges(chart,jsonData){
  var point;

  if (chart) {
    point = chart.series[0].points[0];
    point.update(jsonData);
  }

}











/*
var endpoint2 = "/api/power/";
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

/*

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
*/