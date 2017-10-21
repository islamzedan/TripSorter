$(function () {
    var all_data;
    var processed_data = {};
    $.get('./response.json', {}, function (data) {
        all_data = data;
        var cities = [];
        $.each(data.deals, function (key, val) {
            if (val.departure in processed_data == false) {
                processed_data[val.departure] = {}
            }
            if (!processed_data[val.departure][val.arrival]) {
                processed_data[val.departure][val.arrival] = {};
            }
            processed_data[val.departure][val.arrival][val.transport] = {}
            processed_data[val.departure][val.arrival][val.transport]['duration'] = parseFloat(val.duration.h + '.' + val.duration.m);
            processed_data[val.departure][val.arrival][val.transport]['cost'] = val.cost - (val.cost * val.discount / 100);
            processed_data[val.departure][val.arrival][val.transport]['key'] = key;
            if (jQuery.inArray(val.departure, cities) == -1) {
                $('#arrival').append('<option value="' + val.departure + '">' + val.departure + '</option>');
                $('#departure').append('<option value="' + val.departure + '">' + val.departure + '</option>');
                cities.push(val.departure)
            }
        })
    }, 'JSON');

    $('#radioBtn a').on('click', function () {
        var sel = $(this).data('title');
        var tog = $(this).data('toggle');
        $('#' + tog).prop('value', sel);

        $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
        $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
    })

    function get_the_trip(departure, arrival, type, tryit = []) {
        var result = [];
        result['min'] = -1;
        result['way'] = [];
        var bestTrans;
        tryit.push(departure);
        var min = -1;
        $.each(processed_data[departure], function (key, val) {
            var current_result = [];
            current_result['min'] = -1;
            current_result['way'] = [];
            if (jQuery.inArray(key, tryit) == -1) {
                if (val.bus && (min > val.bus[type] || min == -1)) {
                    bestTrans = 'bus';
                    min = val.bus[type];
                }
                if (val.train && (min > val.train[type] || min == -1)) {
                    bestTrans = 'train';
                    min = val.bus[type];
                }
                if (val.car && (min > val.car[type] || min == -1)) {
                    bestTrans = 'car';
                    min = val.bus[type];
                }
                current_result['way'].push(val[bestTrans]['key']);
                min = val[bestTrans][type];
                current_result['min'] = min;
                if (key == arrival && (current_result['min'] < result['min'] || result['min'] == -1)) {
                    result = current_result;
                    return false;
                } else {
                    var result_all = get_the_trip(key, arrival, type, tryit);
                    if (result_all !== undefined) {
                        current_result['min'] += result_all['min'];
                        current_result['way'].push.apply(current_result['way'], result_all['way']);
                    }
                    if (current_result['min'] < result['min'] || result['min'] == -1) {
                        result = current_result;
                    }
                }
            }
        });
        return result;
    }

    $(document).on('click', '#reset', function () {
        $('#myForm').show(300);
        $('#result').hide(300);
        $('#result').html('');
    });
    $(document).on('click', '#search', function () {
        var departure = $('#departure').val();
        var arrival = $('#arrival').val();
        if (departure == '' || arrival == '' || departure == arrival) {
            alert('Please Check your data');
            return false;
        }
        var type = $('[name="type"]').val();

        $('#myForm').hide(300);
        $('#result').show(300);
        var final = get_the_trip(departure, arrival, type);
        var currency = all_data.currency;
        var totalCost = 0;
        var TotalTime = 0
        $.each(final['way'], function (k, v) {
            var cost = all_data.deals[v]['cost'] - (all_data.deals[v]['cost'] * all_data.deals[v]['discount'] / 100);
            totalCost += cost;
            TotalTime += parseInt(all_data.deals[v]['duration']['m']) + (parseInt(all_data.deals[v]['duration']['h']) * 60);
            var way = '<div class="way col-lg-12">' +
                    '<div class="from-to col-lg-9">' + all_data.deals[v]['departure'] + ' <span>></span> ' + all_data.deals[v]['arrival'] + '</div>' +
                    '<div class="price col-lg-3">' + cost + ' ' + currency+'</div>' +
                    '<div class="method col-lg-12"> <b>' + all_data.deals[v]['transport'] + '</b> ' + all_data.deals[v]['reference'] + ' For ' + all_data.deals[v]['duration']['h'] + 'h' + all_data.deals[v]['duration']['m'] + 'm</div>' +
                    '</div>';

            $('#result').append(way);
        });
        var h = Math.floor((TotalTime / 60)) + 'h';
        var m = (TotalTime % 60) + 'm';
        var summery = '<div class="way col-lg-12">' +
                '<div class="method col-lg-4"> <b>Total</b> </div><div class="method col-lg-4">' + h + m + ' </div> <div class="method col-lg-4">' + totalCost + ' ' + currency + ' </div>' +
                '</div>';

        $('#result').append(summery);
        $('#result').append('<a class="btn btn-success col-md-12" id="reset"><i class="fa fa-repeat "></i> Reset</a>');
    })

});