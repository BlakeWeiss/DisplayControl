//新增数据集
function addNewChart() {
    $.ajax({
        type: "get",
        url: URL + "/DisplayPageChart/AddNewItem",
        contentType: "application/json; charset=utf-8",
        data: $("#newChartForm").serialize(),
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
            switch (data.result) {
                case 1:
                    alertModal('操作成功', '添加成功');
                    $('#newChartPanel').hide();
                    $('#newChartForm')[0].reset()
                    break;
                case -1:
                    location.href = "/Home/Index?flag=-1";
                    break;
                default:
                    alertModal('操作失败', data.data);
                    console.log(data);
                    break;
            }
            $('#jstree-default').jstree(true).refresh();

        },
        error: function (a, b, c) {
            console.log(a);
        }
    });
}

//读取信息
function viewChartDetails(PAGE_CHART_ID) {
    $.ajax({
        type: "get",
        url: URL + "/DisplayPageChart/ViewDetails",
        contentType: "application/json; charset=utf-8",
        data: {PAGE_CHART_ID: PAGE_CHART_ID},
        dataType: "jsonp",
        success: function (data) {
            switch (data.result) {
                case 1:
                    let detailsArray = new Array("PAGE_CHART_ID", "PAGE_ID", "CHART_ID", "SORT", "STYLE", "LINKED_STYLE","REFRESH_RATE");

                    for (let i = 0; i < detailsArray.length; i++) {
                        $("#MODIFY-CHART-" + detailsArray[i]).val(data.data[detailsArray[i].toString()]);
                    }
                    $('#modifyChartPanel').show().siblings().hide();
                    break;
                case -1:
                    location.href = "/Home/Index?flag=-1";
                    break;
                default:
                    alertModal('读取失败', data.data);
                    console.log(data);
                    break;
            }
        },
        error: function (a, b, c) {
            console.log(a);
        }
    })
}

//修改
function modifyChart() {
    $.ajax({
        type: "get",
        url: URL + "/DisplayPageChart/ModifyItem",
        contentType: "application/json; charset=utf-8",
        data: $("#modifyChartForm").serialize(),
        dataType: "jsonp",
        success: function (data) {
            switch (data.result) {
                case 1:
                    alertModal('操作成功', '修改成功');
                    //$('#modifyChartPanel').hide();
                    //$("#modifyChartForm")[0].reset();
                    break;
                case -1:
                    location.href = "/Home/Index?flag=-1";
                    break;
                default:
                    // alertModal('操作失败', data.data);
                    alert(data.data);
                    console.log(data);
                    break;
            }
            $('#jstree-default').jstree(true).refresh();
        },
        error: function (a, b, c) {
            console.log(a);
        }
    })
}


//删除数据集
function deleteChartConfirm(PAGE_ID, CHART_ID) {
    confirmModal('确认删除', '确认要删除该报表？', 'deleteChart(' + CHART_ID + ')');
}

function deleteChart(PAGE_CHART_ID) {
    $.ajax({
        type: "get",
        url: URL + "/DisplayPageChart/DeleteItem",
        contentType: "application/json; charset=utf-8",
        data: {PAGE_CHART_ID: PAGE_CHART_ID},
        dataType: "jsonp",
        success: function (data) {
            switch (data.result) {
                case 1:
                    alertModal('操作成功', '删除成功');
                    $('#modifyChartPanel').hide();
                    break;
                case -1:
                    location.href = "/Home/Index?flag=-1";
                    break;
                default:
                    alertModal('操作失败', data.data);
                    console.log(data);
                    break;
            }
            $('#jstree-default').jstree(true).refresh();
        },
        error: function (a, b, c) {
            console.log(a);
        }
    })
}