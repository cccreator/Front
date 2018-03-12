/*$(function(){
		pageInit();
	});
	function pageInit(){*/
		var openDialog4Adding=function(){
			alert("add Demo");
		};
		var openDialog4Updating=function(){
			alert("update Demo");
		};
		var openDialog4Deleting=function(){
			alert("delete Demo");
		}
		$("#list").jqGrid({
			url:'data/JSONData.json',//jqGrid控件通过这个参数得到需要显示的数据，具体的返回值可以是xml也可以是Json
			datatype:"json",//这个参数用于设定将要得到需要显示的数据，类型包括：json、xml、xmlstring、loca
			//colNames用于指定各列的题头文本，与列的顺序相对应
			colNames:['id','name','age'],
			//colMoel用于指定各列参数
			colModel:[
			          {name:'id',index:'id',width:200},
			          {name:'name',index:'invdate',width:200},
			          {name:'age',index:'name',width:300}
			],
			rowNum:10,//用于设置Grid中一次显示的行数
			rowList:[10,20,30,40],//用于设置Grid可以接受的rowNum值
			pager:"#pager",//用于定义页码控制条
			sortname:'id',//指定默认的排序列，可以是列名也可以是数字。此参数会用于传递到server端
			sortorder:'desc',
			mtype:"post",
			viewrecords:true,//设置是否在Pager Bar显示所有记录的总数。
			caption:"jqGrid_demo",
			recordpos:'right',
		});
		$("#list").jqGrid('navGrid','#pager',{
			add:true,
			del:true,
			edit:true,
			position:'left',
			addfunc:openDialog4Adding,
			editfunc:openDialog4Updating,
			delfunc:openDialog4Deleting,
			alerttext:"请选择需要操作的数据行！"
		});
	//}