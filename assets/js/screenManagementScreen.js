//新增屏幕
function addNewScreen() {
    $.ajax({
        type: "get",
        url: URL + "/DisplayScreen/AddNewItem",
        contentType: "application/json; charset=utf-8",
        data: $("#newScreenForm").serialize(),
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
            switch (data.result) {
                case 1:
                    alertModal('操作成功', '添加成功');
                    $('#newScreenPanel').hide();
                    $('#newScreenForm')[0].reset()
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
function viewScreenDetails(SCREEN_ID) {
    $.ajax({
        type: "get",
        url: URL + "/DisplayScreen/ViewDetails",
        contentType: "application/json; charset=utf-8",
        data: {SCREEN_ID: SCREEN_ID},
        dataType: "jsonp",
        success: function (data) {
            switch (data.result) {
                case 1:
                    let detailsArray = new Array("SCREEN_ID", "SCREEN_NAME", "GAP");

                    for (let i = 0; i < detailsArray.length; i++) {
                        $("#MODIFY-SCREEN-" + detailsArray[i]).val(data.data[detailsArray[i].toString()]);
                    }

                    $('#modifyScreenPanel').show().siblings().hide();
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
function modifyScreen() {
    $.ajax({
        type: "get",
        url: URL + "/DisplayScreen/ModifyItem",
        contentType: "application/json; charset=utf-8",
        data: $("#modifyScreenForm").serialize(),
        dataType: "jsonp",
        success: function (data) {
            switch (data.result) {
                case 1:
                    alertModal('操作成功', '修改成功');
                    //$('#modifyScreenChartPanel').hide();
                    //$("#modifyPageForm")[0].reset();
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


//删除数据集
function deleteScreenConfirm(SCREEN_ID) {
    confirmModal('确认删除', '确认要删除该屏幕？', 'deleteScreen(' + SCREEN_ID + ')');
}

function deleteScreen(SCREEN_ID) {
    $.ajax({
        type: "get",
        url: URL + "/DisplayScreen/DeleteItem",
        contentType: "application/json; charset=utf-8",
        data: {SCREEN_ID: SCREEN_ID},
        dataType: "jsonp",
        success: function (data) {
            switch (data.result) {
                case 1:
                    alertModal('操作成功', '删除成功');
                    $('#modifyScreenPanel').hide();
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