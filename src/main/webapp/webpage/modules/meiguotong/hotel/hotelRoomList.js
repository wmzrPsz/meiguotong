<%@ page contentType="text/html;charset=UTF-8" %>
<script>
$(document).ready(function() {
	$('#hotelRoomTable').bootstrapTable({
		 
		  //请求方法
               method: 'get',
               //类型json
               dataType: "json",
               //显示刷新按钮
               showRefresh: true,
               //显示切换手机试图按钮
               showToggle: true,
               //显示 内容列下拉框
    	       showColumns: true,
    	       //显示到处按钮
    	       showExport: true,
    	       //显示切换分页按钮
    	       showPaginationSwitch: true,
    	       //最低显示2行
    	       minimumCountColumns: 2,
               //是否显示行间隔色
               striped: true,
               //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）     
               cache: false,    
               //是否显示分页（*）  
               pagination: true,   
                //排序方式 
               sortOrder: "asc",  
               //初始化加载第一页，默认第一页
               pageNumber:1,   
               //每页的记录行数（*）   
               pageSize: 10,  
               //可供选择的每页的行数（*）    
               pageList: [10, 25, 50, 100],
               //这个接口需要处理bootstrap table传递的固定参数,并返回特定格式的json数据  
               url: "${ctx}/meiguotong/hotel/hotelRoom/data",
               //默认值为 'limit',传给服务端的参数为：limit, offset, search, sort, order Else
               //queryParamsType:'',   
               ////查询参数,每次调用是会带上这个参数，可自定义                         
               queryParams : function(params) {
               	var searchParam = $("#searchForm").serializeJSON();
               	searchParam.pageNo = params.limit === undefined? "1" :params.offset/params.limit+1;
               	searchParam.pageSize = params.limit === undefined? -1 : params.limit;
               	searchParam.orderBy = params.sort === undefined? "" : params.sort+ " "+  params.order;
                   return searchParam;
               },
               //分页方式：client客户端分页，server服务端分页（*）
               sidePagination: "server",
               contextMenuTrigger:"right",//pc端 按右键弹出菜单
               contextMenuTriggerMobile:"press",//手机端 弹出菜单，click：单击， press：长按。
               contextMenu: '#context-menu',
               onContextMenuItem: function(row, $el){
                   if($el.data("item") == "edit"){
                   	window.location = "${ctx}/meiguotong/hotel/hotelRoom/form?id=" + row.id;
                   } else if($el.data("item") == "delete"){
                        jp.confirm('确认要删除该酒店管理记录吗？', function(){
                       	jp.loading();
                       	jp.get("${ctx}/meiguotong/hotel/hotelRoom/delete?id="+row.id, function(data){
                   	  		if(data.success){
                   	  			$('#hotelRoomTable').bootstrapTable('refresh');
                   	  			jp.success(data.msg);
                   	  		}else{
                   	  			jp.error(data.msg);
                   	  		}
                   	  	})
                   	   
                   	});
                      
                   } 
               },
              
               onClickRow: function(row, $el){
               },
               columns: [{
		        checkbox: true
		       
		    }
               ,{
            	   field: 'hoteRoomNo',
            	   title: '编号',
            	   sortable: true
               }
			,{
		        field: 'roomName',
		        title: '酒店房间名称',
		        sortable: true
		    }
			,{
				field: 'cityName',
				title: '城市',
				sortable: true
			}
			,{
				field: 'level',
				title: '酒店星级',
				sortable: true,
		        formatter:function(value, row , index){
		        	 if(value==1) return '★';
			    	 if(value==2) return '★★';
			    	 if(value==3) return '★★★';
			         if(value==4) return '★★★★★';
			         if(value==5) return '★★★★★';
		        }
			}
			,{
		        field: 'name',
		        title: '酒店名称',
		        sortable: true
		       
		    }
			,{
		        field: 'status',
		        title: '状态',
		        sortable: true,
		        formatter:function(value, row , index){
		        	 if(value==1) return '<button type="button" class="btn btn-success">申请中</button>';
			    	 if(value==2) return '<button type="button" class="btn btn-secondary">已拒绝</button>';
			    	 if(value==3) return '<button type="button" class="btn btn-primary">正常</button>';
			         if(value==4) return '<button type="button" class="btn btn-danger">禁用</button>';
		        }
		    },
		    {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: {
                	'click .1': function (e, value, row, index) {
                		updateStatus(e, value, row, index ,3);
                	},
      		        'click .2': function (e, value, row, index) {
      		        	updateStatus(e, value, row, index ,2);
      		        },
      		        'click .3': function (e, value, row, index) {
      		        	reviewed(e, value, row, index ,3);
      		        },
      		        'click .4': function (e, value, row, index) {
      		        	reviewed(e, value, row, index ,4);
      		        },
    		    },
                formatter:  function operateFormatter(value, row, index) {
    		        return [
    		        <shiro:hasPermission name=" meiguotong:hotel:hotelRoom:edit"> 
						'<a href="${ctx}/meiguotong/hotel/hotelRoom/form?id='+row.id+'"  class="view" title="查看" ><i class="fa fa-eye btn btn-primary btn-xs">查看</i> </a>',
					</shiro:hasPermission>
					<shiro:hasPermission name="meiguotong:hotel:hotelRoom:reviewed"> 
					row.status==3?'<a href="#" class="4" title="禁用"><i class="fa fa-edit btn btn-danger btn-xs">禁用</i> </a>':'',
					row.status==4?'<a href="#" class="3" title="启用"><i class="fa fa-edit btn btn-warning btn-xs">启用</i> </a>':'',
					</shiro:hasPermission>
					<shiro:hasPermission name="meiguotong:hotel:hotelRoom:updateStatus"> 
					(${userType==1} && row.status==1)?'<a href="#" class="2" title="拒绝"><i class="fa fa-edit btn btn-danger btn-xs">拒绝</i> </a>':'',
					(${userType==1} && row.status==1)?'<a href="#" class="1" title="通过"><i class="fa fa-edit btn btn-warning btn-xs">通过</i> </a>':'',
					</shiro:hasPermission>
    		        ].join('');
    		    }
            }
		     ]
		
		});
		
	function updateStatus(e, value, row, index,status) {
      	jp.confirm('是否更改状态?', function(){
      		jp.loading();
      		jp.get("${ctx}/meiguotong/hotel/hotelRoom/updateStatus?status="+status+"&id="+row.id, function(data){
      			if(data.success){
      				$('#hotelRoomTable').bootstrapTable('refresh');
      				jp.success(data.msg);
      			}else{
      				jp.error(data.msg);
      			}
      		})
      		
      	});
      }
	
	
	function reviewed(e, value, row, index,status) {
		jp.confirm('是否更改状态?', function(){
			jp.loading();
			jp.get("${ctx}/meiguotong/hotel/hotelRoom/reviewed?status="+status+"&id="+row.id, function(data){
				if(data.success){
					$('#hotelRoomTable').bootstrapTable('refresh');
					jp.success(data.msg);
				}else{
					jp.error(data.msg);
				}
			})
			
		});
	}
	
	
		  
	  if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){//如果是移动端

		 
		  $('#hotelRoomTable').bootstrapTable("toggleView");
		}
	  
	  $('#hotelRoomTable').on('check.bs.table uncheck.bs.table load-success.bs.table ' +
                'check-all.bs.table uncheck-all.bs.table', function () {
            $('#remove').prop('disabled', ! $('#hotelRoomTable').bootstrapTable('getSelections').length);
            $('#edit').prop('disabled', $('#hotelRoomTable').bootstrapTable('getSelections').length!=1);
        });
		  
		$("#btnImport").click(function(){
			jp.open({
			    type: 1, 
			    area: [500, 300],
			    title:"导入数据",
			    content:$("#importBox").html() ,
			    btn: ['下载模板','确定', '关闭'],
				    btn1: function(index, layero){
					  window.location='${ctx}/meiguotong/hotel/hotelRoom/import/template';
				  },
			    btn2: function(index, layero){
				        var inputForm =top.$("#importForm");
				        var top_iframe = top.getActiveTab().attr("name");//获取当前active的tab的iframe 
				        inputForm.attr("target",top_iframe);//表单提交成功后，从服务器返回的url在当前tab中展示
				        inputForm.onsubmit = function(){
				        	jp.loading('  正在导入，请稍等...');
				        }
				        inputForm.submit();
					    jp.close(index);
				  },
				 
				  btn3: function(index){ 
					  jp.close(index);
	    	       }
			}); 
		});
		    
	  $("#search").click("click", function() {// 绑定查询按扭
		  $('#hotelRoomTable').bootstrapTable('refresh');
		});
	 
	 $("#reset").click("click", function() {// 绑定查询按扭
		  $("#searchForm  input").val("");
		  $("#searchForm  select").val("");
		  $("#searchForm  .select-item").html("");
		  $('#hotelRoomTable').bootstrapTable('refresh');
		});
		
		
	});
		
  function getIdSelections() {
        return $.map($("#hotelRoomTable").bootstrapTable('getSelections'), function (row) {
            return row.id
        });
    }
  
  function deleteAll(){

		jp.confirm('确认要删除该酒店管理记录吗？', function(){
			jp.loading();  	
			jp.get("${ctx}/meiguotong/hotel/hotelRoom/deleteAll?ids=" + getIdSelections(), function(data){
         	  		if(data.success){
         	  			$('#hotelRoomTable').bootstrapTable('refresh');
         	  			jp.success(data.msg);
         	  		}else{
         	  			jp.error(data.msg);
         	  		}
         	  	})
          	   
		})
  }
  function edit(){
	  window.location = "${ctx}/meiguotong/hotel/hotelRoom/form?id=" + getIdSelections();
  }
  
</script>