<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>TripSorter - Islam Zedan</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <!-- Font awesome CSS -->
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        <!-- Page CSS -->
        <link rel="stylesheet" href="css/style.css" />
    </head>
    <body>
        <div class="container">
            <h3 class="text-center">Trip Sorter</h3>
            <div class="row col-md-4 result-div">
                <form id="myForm" onsubmit="return false;">
                    <div class="form-group">
                        <select class="form-control" name="departure" id="departure">
                            <option value="">From</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select class="form-control" name="arrival" id="arrival">
                            <option value="">To</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <div id="radioBtn" class="btn-group col-md-12">
                            <a class="btn btn-primary btn-sm col-md-6 active" data-toggle="type" data-title="duration">Fastest <i class="fa fa-fast-forward"></i></a>
                            <a class="btn btn-primary btn-sm col-md-6 notActive" data-toggle="type" data-title="cost">Cheapest <i class="fa fa-money"></i></a>
                        </div>
                        <input type="hidden" name="type" id="type" value="duration">
                    </div>  

                    <a class="btn btn-success col-md-12" id="search"><i class="fa fa-search"></i> Search</a>
                </form>
                <div id="result" class="result-div">

                </div>
            </div>
        </div>
        <!-- jQuery library -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <!-- Latest compiled JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <!-- Page JavaScript -->
        <script src="js/page.js"></script>
    </body>

</html>