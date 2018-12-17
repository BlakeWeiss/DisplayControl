//新增数据集
function addNewPage() {
    $.ajax({
        type: "get",
        url: URL + "/DisplayPage/AddNewItem",
        contentType: "application/json; charset=utf-8",
        data: $("#newPageForm").serialize(),
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
            switch (data.result) {
                case 1:
                    alertModal('操作成功', '添加成功');
                    $('#newPagePanel').hide();
                    $('#newPageForm')[0].reset()
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
function viewPageDetails(SCREEN_ID, PAGE_ID) {
    $.ajax({
        type: "get",
        url: URL + "/DisplayPage/ViewDetails",
        contentType: "application/json; charset=utf-8",
        data: {SCREEN_ID: SCREEN_ID, PAGE_ID: PAGE_ID},
        dataType: "jsonp",
        success: function (data) {
            switch (data.result) {
                case 1:
                    let detailsArray = new Array("SCREEN_PAGE_ID", "SCREEN_ID", "PAGE_ID", "SORT");

                    for (let i = 0; i < detailsArray.length; i++) {
                        $("#MODIFY-PAGE-" + detailsArray[i]).val(data.data[detailsArray[i].toString()]);
                    }

                    let detailsArray2 = new Array("PAGE_NAME", "ROWS", "ROW1_COLUMNS", "ROW2_COLUMNS", "ROW3_COLUMNS");

                    for (let i = 0; i < detailsArray2.length; i++) {
                        $("#MODIFY-PAGE-" + detailsArray2[i]).val(data.data2[detailsArray2[i].toString()]);
                    }

                    $('#modifyPagePanel').show().siblings().hide();
                    //$('#newPagePanel').hide();

                    changeExampleForModified();
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
function modifyPage() {
    $.ajax({
        type: "get",
        url: URL + "/DisplayPage/ModifyItem",
        contentType: "application/json; charset=utf-8",
        data: $("#modifyPageForm").serialize(),
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
function deletePageConfirm(SCREEN_ID, PAGE_ID) {
    confirmModal('确认删除', '确认要删除该页面？', 'deletePage(' + SCREEN_ID + ', ' + PAGE_ID + ')');
}

function deletePage(SCREEN_ID, PAGE_ID) {
    $.ajax({
        type: "get",
        url: URL + "/DisplayPage/DeleteItem",
        contentType: "application/json; charset=utf-8",
        data: {SCREEN_ID: SCREEN_ID, PAGE_ID: PAGE_ID},
        dataType: "jsonp",
        success: function (data) {
            switch (data.result) {
                case 1:
                    alertModal('操作成功', '删除成功');
                    $('#modifyPagePanel').hide();
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