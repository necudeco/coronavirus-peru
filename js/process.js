            //const chart = document.getElementById('myChart').getContext('2d');

            let today = Object.keys(data).pop();
            
            $(".full-container .stats .muestras").html(data[today].muestras);
            $(".full-container .stats .infectados").html(data[today].infectados);
            $(".full-container .stats .muertos").html(data[today].muertos);
            $(".full-container .stats .detenidos").html(data[today].detenidos);

            $(".title .today").text(today);


            let data_country_day  = {
                infectados: [],
                incremento: [],
            };
            let yesterday = undefined;

            for ( day in data ){
                if ( yesterday == undefined ) yesterday = day;
                
                data_country_day.infectados.push ( data[day].infectados );
                data_country_day.incremento.push( data[day].infectados - data[yesterday].infectados );
                yesterday = day;
            }


            Highcharts.chart('chartInfectados', {
                title: 'Infectados',
                series: [
                    {
                        name: '# Casos',
                        data: Object.values(data_country_day.infectados),
                    },{
                        name: '# Nuevos Casos', 
                        data: Object.values(data_country_day.incremento),
                    }
                ]
            });



            Highcharts.chart('pieStats', {
                chart: {
                    type: 'pie'
                },
                title: 'Infectados',
                series: [{
                    name: 'Stats',
                    colorByPoint: true,
                    data:[
                    {
                        name: 'Muestras',
                        y: data[today].muestras,
                    },{
                        name: 'Infectados', 
                        y: data[today].infectados,
                    },{
                        name: 'Muertos',
                        y: data[today].muertos,
                    }
                ]}]
            });


            let mapdata = [];
            for ( departamento in data[today].pordepartamento ){
                let n = cities2[departamento].n;
                let infectados = data[today].pordepartamento[departamento].infectados;
                let percentage = Math.round( ( infectados / Math.round(n/1000) ) * 10000 )/100;
                console.log(departamento, Math.round(n/1000), infectados, percentage );
                mapdata.push([ cities2[departamento].code, percentage ]);
            }

            Highcharts.mapChart('map', {
                chart: {
                    map: 'countries/pe/pe-all'
                }, 
                title: { text: 'Casos por Region / Poblacion' },
                series: [{
                    data: mapdata,
                    name: 'Infectados'
                }],
                colorAxis: {
                    min: 0,
                    max: 10,
                    stops:[[0, '#F1EEF6'], [0.65, '#900037'], [1, '#500007']],
                    
                }
            });

