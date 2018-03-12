    $("#consoleDlg").dialog({    
        autoOpen: false,        
        modal: true,    // 设置对话框为模态（modal）对话框    
        resizable: true,        
        width: 480,    
        buttons: {  // 为对话框添加按钮    
            "取消": function() {$("#consoleDlg").dialog("close")},    
            "添加": addEmployee,    
            "保存": updateEmployee,    
            "删除": deleteEmployee    
        }    
    });    
  
var openDialog4Adding = function() {    
        var consoleDlg = $("#consoleDlg");    
        var dialogButtonPanel = consoleDlg.siblings(".ui-dialog-buttonpane");    
        consoleDlg.find("input").removeAttr("disabled").val("");    
        dialogButtonPanel.find("button:not(:contains('取消'))").hide();    
        dialogButtonPanel.find("button:contains('添加')").show();    
        consoleDlg.dialog("option", "title", "添加员工信息 ").dialog("open");    
    };    
    var openDialog4Updating = function() {    
        var consoleDlg = $("#consoleDlg");    
        var dialogButtonPanel = consoleDlg.siblings(".ui-dialog-buttonpane");    
            
        consoleDlg.find("input").removeAttr("disabled");    
        dialogButtonPanel.find("button:not(:contains('取消'))").hide();    
        dialogButtonPanel.find("button:contains('保存')").show();    
        consoleDlg.dialog("option", "title", "修改员工信息");    
            
        loadSelectedRowData();    
    }    
    var openDialog4Deleting = function() {    
        var consoleDlg = $("#consoleDlg");    
        var dialogButtonPanel = consoleDlg.siblings(".ui-dialog-buttonpane");    
            
        consoleDlg.find("input").attr("disabled", true);    
        dialogButtonPanel.find("button:not(:contains('取消'))").hide();    
        dialogButtonPanel.find("button:contains('删除')").show();    
        consoleDlg.dialog("option", "title", "删除员工");    
            
        loadSelectedRowData();    
    }    
                    
     var loadSelectedRowData = function() {  
            var selectedRowId = $("#gridTable").jqGrid("getGridParam", "selrow");  
            if (!selectedRowId) {  
                hiAlert("请先选择需要编辑的行!");  
                return false;  
            } else {  
                var params = {  
                    "employee.eid" : selectedRowId  
                };  
                // 从Server读取对应ID的JSON数据  
                $.ajax( {  
                    url : "employee_find.action",  
                    data : params,  
                    dataType : "json",  
                    cache : false,  
                    error : function(textStatus, errorThrown) {  
                        hiAlert("系统ajax交互错误: " + textStatus);  
                    },  
                    success : function(data, textStatus) {  
                        // 如果读取结果成功，则将信息载入到对话框中                   
                      var rowData = data.person;    
                      var consoleDlg = $("#consoleDlg");    
                        
                      consoleDlg.find("#selectId").val(rowData.id);    
                      consoleDlg.find("#ename").val(rowData.ename);    
                      consoleDlg.find("#esex").val(rowData.esex);    
                      consoleDlg.find("#birthday").val(rowData.birthday);    
                      consoleDlg.find("#department").val(rowData.department);    
                      consoleDlg.find("#eremark").val(rowData.eremark);    
                    // 根据新载入的数据将表格中的对应数据行一并更新一下  
                     var  dataRow = {    
                                 id : data.employee.eid,   // 从Server端得到系统分配的id    
                                 ename :ename,    
                                 esex : esex,  
                                 birthday: birthday,  
                                 department: department,  
                                 eremark:eremark   
                             };  
          
                    $("#gridTable").jqGrid("setRowData", data.employee.eid, dataRow);  
          
                    // 打开对话框  
                    consoleDlg.dialog("open");  
                }  
                });  
          
            }  
        };              
  //数据更新   
   function updateEmployee() {   
                 var consoleDlg = $("#consoleDlg");        
                     
                 var eid = $.trim(consoleDlg.find("#selectId").val());    
                 var eanme = $.trim(consoleDlg.find("#eanme").val());    
                 var esex = $.trim(consoleDlg.find("#esex").val());    
                 var birthday = $.trim(consoleDlg.find("#birthday").val());   
                 var department = $.trim(consoleDlg.find("#department").val());   
                 var eremark = $.trim(consoleDlg.find("#eremark").val());      
                 var params = {    
                         "employee.eid" : eid,  
                         "employee.ename" : ename,    
                         "employee.esex" : esex,  
                         "employee.birthday" : birthday,    
                         "employee.department" : department,  
                         "employee.eremark" : eremark     
                 };    
                 var actionUrl = "employee_update.action";    
                 $.ajax( {    
                     url : actionUrl,    
                     data : params,    
                     dataType : "json",    
                     cache : false,    
                     error : function(textStatus, errorThrown) {    
                         alert("系统ajax交互错误: " + textStatus);    
                     },    
                     success : function(data, textStatus) {    
                         if (data.ajaxResult == "success") {    
                             var dataRow = {    
                                 id : data.employee.eid,   // 从Server端得到系统分配的id    
                                 ename :ename,    
                                 esex : esex,  
                                 birthday: birthday,  
                                 department: department,  
                                 eremark:eremark   
                             };    
                             alert("联系人信息更新成功!");    
                             consoleDlg.dialog("close");    
                             $("#gridTable").jqGrid("setRowData", data.employee.eid, dataRow);    
                         } else {    
                             alert("修改操作失败!");    
                         }    
                     }    
                 });    
            };  
          
var addEmployee = function() {    
    var consoleDlg = $("#consoleDlg");    
            
    var eanme = $.trim(consoleDlg.find("#eanme").val());    
    var esex = $.trim(consoleDlg.find("#esex").val());    
    var birthday = $.trim(consoleDlg.find("#birthday").val());   
    var department = $.trim(consoleDlg.find("#department").val());   
    var eremark = $.trim(consoleDlg.find("#eremark").val());    
        
    var params = {    
        "employee.ename" : ename,    
        "employee.esex" : esex,  
        "employee.birthday" : birthday,    
        "employee.department" : department,  
        "employee.eremark" : eremark     
    };    
        
     var actionUrl = "employee_add.action";  
        
    $.ajax( {    
        url : actionUrl,    
        data : params,    
        dataType : "json",    
        cache : false,    
        error : function(textStatus, errorThrown) {    
            alert("系统ajax交互错误: " + textStatus);    
        },    
        success : function(data, textStatus) {    
            if(data.ajaxResult == "success") {    
                var dataRow = {    
                   id : data.employee.eid,   // 从Server端得到系统分配的id    
                                 ename :ename,    
                                 esex : esex,  
                                 birthday: birthday,  
                                 department: department,  
                                 eremark:eremark   
                };    
                    
                var srcrowid = $("#gridTable").jqGrid("getGridParam", "selrow");    
                    
                if(srcrowid) {    
                    $("#gridTable").jqGrid("addRowData", data.employee.eid, dataRow, "before", srcrowid);  
                        
                } else {    
                    $("#gridTable").jqGrid("addRowData", data.employee.eid, dataRow, "first");    
                }    
                consoleDlg.dialog("close");    
                    
                alert("联系人添加操作成功!");    
                    
            } else {    
                alert("添加操作失败!");    
            }    
        }    
    });    
};    
  
//数据删除  
      var deleteEmployee = function() {    
            var consoleDlg = $("#consoleDlg");    
                
            var pId = $.trim(consoleDlg.find("#selectId").val());    
            var params = {    
                "employee.eid" : pId    
            };    
            var actionUrl = "employee_delete.action";    
            $.ajax({    
                url : actionUrl,    
                data : params,    
                dataType : "json",    
                cache : false,    
                error : function(textStatus, errorThrown) {    
                    alert("系统ajax交互错误: " + textStatus);    
                },    
                success : function(data, textStatus) {    
                    if (data.ajaxResult == "success") {    
                        $("#gridTable").jqGrid("delRowData", pId);    
                        consoleDlg.dialog("close");    
                        alert("联系人删除成功!");    
                    } else {    
                        alert("删除操作失败!");    
                    }    
                }    
            });    
        };   