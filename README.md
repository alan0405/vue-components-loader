<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">		
	</head>
	<body>
		<h2>关于此插件</h2>
		<p>目的：让vue组件运行在浏览器中(无es6支持的情况下)</p>
		<p>方式：通过js请求获得vue文件，通过js加载到vue中</p>
		<p>完备性：鉴于作者水平有限，完全无法保证在任何场景中可用</p>
		<p>一些说明</p>
		<ul>
			<li>以插件形式存在</li>
			<li>包装了new vue，通过Vue.create({})函数作为入口</li>
			<li>去掉所有es6语法
				<ul>
					<li>脚本部分作为一个实例对象只用{}包围即可</li>							
				</ul>
			</li>
			<li>components使用数组表示，使用相对于根目录的路径表示插件位置，无需扩展名</li>
				<ul>
					<li><small>like：components:['components/file',
'components/toolsbar',
'components/favbar',
'components/contextmenu',
'components/selectorbar',
'components/dialogs',
'components/clipbar',
'components/accessbar'
		]</small>
					</li>
				</ul>
			<li>style部分 加独立前缀以区别组件之间的css类型</li>
			<li>Vue.CptsLoader.isSaveTemplateToLocalStorage 属性标示是否将加载的组件文件(.vue)保存到LocalStorage中</li>
			<li>Vue.CptsLoader.ProjectVersion 属性标示当前版本号，版本号变更则忽略保存属性</li>
			<li>欢迎改正改进，共同进步</li>
		</ul>
	</body>
</html>
