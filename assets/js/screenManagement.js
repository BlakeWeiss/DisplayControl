//初始化tree
$.when(
    $.getScript('assets/plugins/jstree/dist/jstree.min.js'),
    $.Deferred(function (deferred) {
        $(deferred.resolve);
    })
).done(function () {
    $("#jstree-default").jstree({
        "core": {
            "themes": {
                "responsive": false
            },
            "check_callback": true,
            'data': {
                'url': URL + '/ScreenManagement/GetTreeView',
                "dataType": "json",
            }
        },
        "types": {
            "SCREEN": {
                "icon": "fa fa-tv"
            },
            "PAGE": {
                "icon": "fa fa-columns"
            },
            "CHART": {
                "icon": "fa fa-chart-bar"
            }
        },
        'state': {
            "opened": true,
        },
        "plugins": ["contextmenu", "state", "types"],
        "contextmenu": {
            "items": customMenu
        },
    });

    $('#jstree-default').bind("activate_node.jstree", function (obj, e) {
        var currentNode = e.node;
        console.log(currentNode);
        if (currentNode.type == "CHART") {
            // viewChartDetails(currentNode.parent.split('_')[1], currentNode.id.split('|')[1]);
            viewChartDetails(currentNode.id.split('|')[1]);
        } else if (currentNode.type == "PAGE") {
            viewPageDetails(currentNode.parent, currentNode.id.split('_')[1]);
        } else if (currentNode.type == "SCREEN") {
            viewScreenDetails(currentNode.id);
        }
    });

});

$(function () {
    getAllCharts();
})

//自定义tree右键菜单
function customMenu(node) {
    let items = {
        'newPage': {
            'label': '添加页面',
            'action': function (data) {
                let inst = jQuery.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                $("#PAGE-SCREEN_ID").val(obj.id);
                $("#newPagePanel").show().siblings().hide();
                $("#newPageForm")[0].reset();
                changeExample();
                //$("#modifyScreenChartPanel").hide();
            },
            'icon': 'fa fa-plus'
        },
        'newChart': {
            'label': '添加图表',
            'action': function (data) {
                let inst = jQuery.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                $("#CHART-PAGE_ID").val(obj.id.split('_')[1]);
                $("#newChartPanel").show().siblings().hide();
                $("#newChartForm")[0].reset();
                //$("#modifyScreenChartPanel").hide();
            },
            'icon': 'fa fa-plus'
        },
        'deletePage': {
            'label': '删除页面',
            'action': function (data) {
                let inst = jQuery.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                deletePageConfirm(obj.parent, obj.id.split('_')[1]);
            },
            'icon': 'fa fa-trash-alt'
        },
        'deleteChart': {
            'label': '删除图表',
            'action': function (data) {
                let inst = jQuery.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                deleteChartConfirm(obj.parent.split('_')[1], obj.id.split('|')[1]);
            },
            'icon': 'fa fa-trash-alt'
        },
        'newScreen': {
            'label': '添加屏幕',
            'action': function (data) {
                let inst = jQuery.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                $("#newScreenPanel").show().siblings().hide();
                $("#newScreenForm")[0].reset();
                //$("#modifyScreenChartPanel").hide();
            },
            'icon': 'fa fa-plus'
        },
        'deleteScreen': {
            'label': '删除屏幕',
            'action': function (data) {
                let inst = jQuery.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                deleteScreenConfirm(obj.id);
            },
            'icon': 'fa fa-trash-alt'
        },
    }
    console.log(node.type);

    if (node.type == 'SCREEN') {
        delete items.deletePage;
        delete items.newChart;
        delete items.deleteChart;
    } else if (node.type == 'PAGE') {
        delete items.newPage;
        delete items.deleteChart;
        delete items.newScreen;
        delete items.deleteScreen;
    } else if (node.type == 'CHART') {
        delete items.newPage;
        delete items.deletePage;
        delete items.newPage;
        delete items.newScreen;
        delete items.deleteScreen;
    }

    return items;
}

//获取全部报表
function getAllCharts() {
    $.ajax({
        type: "get",
        url: URL + "/ChartProduction/GetAllCharts",
        contentType: "application/json; charset=utf-8",
        data: null,
        dataType: "jsonp",
        success: function (data) {
            switch (data.result) {
                case 1:
                    console.log(data.data);
                    reportsArray = data.data;
                    let HTML = '';
                    for (x in data.data) {
                        HTML += '<option value="' + data.data[x].CHART_ID + '">' + data.data[x].CHART_NAME + '</option>';
                    }
                    console.log(HTML);
                    $("#CHART-CHART_ID").html(HTML);
                    $("#MODIFY-CHART-CHART_ID").html(HTML);
                    break;
                case -1:
                    location.href = "/Home/Index?flag=-1";
                    break;
                default:
                    alertModal('初始化数据集下拉列表失败', data.data);
                    console.log(data);
                    break;
            }
        },
        error: function (a, b, c) {
            console.log(a);
        }
    })
}


