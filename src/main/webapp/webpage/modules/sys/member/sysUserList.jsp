<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/webpage/include/taglib.jsp"%>
<html>
<head>
	<title>供应商管理管理</title>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8">
	<meta name="decorator" content="ani"/>
	<%@ include file="/webpage/include/bootstraptable.jsp"%>
	<%@include file="/webpage/include/treeview.jsp" %>
	<%@include file="sysUserList.js" %>
</head>
<body>
	<div class="wrapper wrapper-content">
	<div class="panel panel-primary">
	<div class="panel-heading">
		<h3 class="panel-title">供应商管理列表</h3>
	</div>
	<div class="panel-body">
		<sys:message content="${message}"/>
	
	<!-- 搜索 -->
	<div class="accordion-group">
	<div id="collapseTwo" class="accordion-body collapse">
		<div class="accordion-inner">
			<form:form id="searchForm" modelAttribute="sysUser" class="form form-horizontal well clearfix">
			 <div class="col-xs-12 col-sm-6 col-md-4">
				<label class="label-item single-overflow pull-left" title="是否可登录：">供应商状态：</label>
				<form:select path="loginFlag"  class="form-control m-b">
					<form:option value=""  label="全部" selected="selected"/>
					<form:option value="1"  label="正常"/>
					<form:option value="0"  label="禁用"/>
				</form:select>
			</div>
			 <div class="col-xs-12 col-sm-6 col-md-4">
				<label class="label-item single-overflow pull-left" title="是否可登录：">供应商类型：</label>
				<form:select path="companyType"  class="form-control m-b">
					<form:option value=""  label="全部" selected="selected"/>
					<form:option value="1"  label="租车管理"/>
					<form:option value="2"  label="常规路线"/>
					<form:option value="3"  label="当地路线"/>
					<form:option value="4"  label="游轮管理"/>
					<form:option value="5"  label="景点门票管理"/>
					<form:option value="6"  label="酒店管理"/>
					<form:option value="7"  label="保险管理"/>
				</form:select>
				
			</div>
			 <div class="col-xs-12 col-sm-6 col-md-4">
				<label class="label-item single-overflow pull-left" title="登录名：">供应商账号：</label>
				<form:input path="loginName" htmlEscape="false" maxlength="100"  class=" form-control"/>
			</div>
		 <div class="col-xs-12 col-sm-6 col-md-4">
			<div style="margin-top:26px">
			  <a  id="search" class="btn btn-primary btn-rounded  btn-bordered btn-sm"><i class="fa fa-search"></i> 查询</a>
			  <a  id="reset" class="btn btn-primary btn-rounded  btn-bordered btn-sm" ><i class="fa fa-refresh"></i> 重置</a>
			 </div>
	    </div>	
	</form:form>
	</div>
	</div>
	</div>
	
	<!-- 工具栏 -->
	<div id="toolbar">
			<shiro:hasPermission name="sys:sysUser:add">
				<a id="add" class="btn btn-primary" href="${ctx}/sys/sysUser/form2" title="供应商管理"><i class="glyphicon glyphicon-plus"></i> 新建</a>
			</shiro:hasPermission>
			<shiro:hasPermission name="sys:member:sysUser:edit">
			    <button id="edit" class="btn btn-success" disabled onclick="edit()">
	            	<i class="glyphicon glyphicon-edit"></i> 修改
	        	</button>
			</shiro:hasPermission>
			<shiro:hasPermission name="sys:member:sysUser:del">
				<button id="remove" class="btn btn-danger" disabled onclick="deleteAll()">
	            	<i class="glyphicon glyphicon-remove"></i> 删除
	        	</button>
			</shiro:hasPermission>
			<shiro:hasPermission name="sys:member:sysUser:import">
				<button id="btnImport" class="btn btn-info"><i class="fa fa-folder-open-o"></i> 导入</button>
				<div id="importBox" class="hide">
						<form id="importForm" action="${ctx}/sys/member/sysUser/import" method="post" enctype="multipart/form-data"
							 style="padding-left:20px;text-align:center;" ><br/>
							<input id="uploadFile" name="file" type="file" style="width:330px"/>导入文件不能超过5M，仅允许导入“xls”或“xlsx”格式文件！<br/>　　
							
							
						</form>
				</div>
			</shiro:hasPermission>
	        	<a class="accordion-toggle btn btn-default" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">
					<i class="fa fa-search"></i> 检索
				</a>
		    </div>
		
	<!-- 表格 -->
	<table id="sysUserTable"   data-toolbar="#toolbar"></table>

    <!-- context menu -->
    <ul id="context-menu" class="dropdown-menu">
    	<shiro:hasPermission name="sys:member:sysUser:edit">
        <li data-item="edit"><a>编辑</a></li>
        </shiro:hasPermission>
        <shiro:hasPermission name="sys:member:sysUser:del">
        <li data-item="delete"><a>删除</a></li>
        </shiro:hasPermission>
        <li data-item="action1"><a>取消</a></li>
    </ul>  
	</div>
	</div>
	</div>
</body>
</html>