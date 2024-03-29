<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/webpage/include/taglib.jsp"%>
<html>
<head>
	<title>文章分类管理管理</title>
	<meta name="decorator" content="ani"/>
	<script type="text/javascript">
	var isIE = /msie/i.test(navigator.userAgent) && !window.opera; 
	function checkImg(target){
		var fileSize = 0;         
        if (isIE && !target.files) {     
          var filePath = target.value;     
          var fileSystem = new ActiveXObject("Scripting.FileSystemObject");        
          var file = fileSystem.GetFile (filePath);     
          fileSize = file.Size;    
        } else {    
         fileSize = target.files[0].size;     
         }   
         var size = fileSize / 1024;
         if(size>2000){  
          alert("图片不能大于2M");
          target.value="";
          return false
         }
         var name=target.value;
         var fileName = name.substring(name.lastIndexOf(".")+1).toLowerCase();
         if(fileName !="jpg" && fileName !="gif" && fileName !="png"){
             alert("请选择jpg、gif、png格式上传！");
             target.value="";
             return false
         }
        return true;
	}



	  function changIdCardFrontImg(target,e){   
	    	//判断图片格式、大小
		if(!checkImg(target)){
		    		return;
		    	}   
		        for (var i = 0; i < e.target.files.length; i++) {    
		            var file = e.target.files.item(i);    
		            //实例化FileReader API    
		            var freader = new FileReader();    
		            freader.readAsDataURL(file);    
		            freader.onload = function(e) {    
		                $("#idCardFrontImg").attr("src",e.target.result);    //显示加载图片
		            }    
		        }    
		    }
	
		$(document).ready(function() {
			$("#inputForm").validate({
				submitHandler: function(form){
					jp.loading();
					form.submit();
				},
				errorContainer: "#messageBox",
				errorPlacement: function(error, element) {
					$("#messageBox").text("输入有误，请先更正。");
					if (element.is(":checkbox")||element.is(":radio")||element.parent().is(".input-append")){
						error.appendTo(element.parent().parent());
					} else {
						error.insertAfter(element);
					}
				}
			});
			
		});
	</script>
</head>
<body>
<div class="wrapper wrapper-content">				
<div class="row">
	<div class="col-md-12">
	<div class="panel panel-primary">
		<div class="panel-heading">
			<h3 class="panel-title"> 
				<a class="panelButton" href="${ctx}/sys/comArticleCategory"><i class="ti-angle-left"></i> 返回</a>
			</h3>
		</div>
		<div class="panel-body">
		<form:form id="inputForm" modelAttribute="comArticleCategory" enctype="multipart/form-data"  action="${ctx}/sys/comArticleCategory/save" method="post" class="form-horizontal">
		<form:hidden path="id"/>
		<sys:message content="${message}"/>	
				<div class="form-group">
					<label class="col-sm-1 control-label">分类标题：</label>
					<div class="col-sm-2">
						<form:input path="title" htmlEscape="false"    class="form-control "/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label" style="position:relative; left: -77px; top: 2px;">分类图片：</label>
					<div class="col-sm-5"  style="position:relative; left: -77px; top: 2px;">
 					<img alt="暂无图片" id="idCardFrontImg" src="${comArticleCategory.img}" height="100px",width="100px"/>    
					<input style="width:300px"  accept="image/jpg, image/png, image/gif, image/jpeg" onchange="changIdCardFrontImg(this,event)" 
					id="imageFrontFile"	name="imageFrontFile" htmlEscape="false" type="file"
					/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-1 control-label">准备:</label>
					<div class="col-sm-2">
					<form:select path="status"  class="form-control m-b">
						<form:option value="" label="--请选择以下--"/>
						<form:option value="1" label="启用"/>
						<form:option value="2" label="禁用"/>
					</form:select>
					</div>
				</div>
		<c:if test="${fns:hasPermission('sys:comArticleCategory:edit') || isAdd}">
				<div class="col-lg-3"></div>
		        <div class="col-lg-6">
		             <div class="form-group text-center">
		                 <div>
		                     <button class="btn btn-primary btn-block btn-lg btn-parsley" data-loading-text="正在提交...">提 交</button>
		                 </div>
		             </div>
		        </div>
		</c:if>
		</form:form>
		</div>				
	</div>
	</div>
</div>
</div>
</body>
</html>