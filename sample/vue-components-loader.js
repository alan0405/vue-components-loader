// vue插件引入
Vue.use({
	// 插件初始化函数
	install: function(Vue, options) {
		Vue.CptsLoader = {
			isSaveTemplateToLocalStorage: false,
			ProjectVersion: "1.0.0.0",
			checkVersion: function() {
				var ver = localStorage.getItem(window.location.href + 'ProjectVersion')
				if(!ver || this.ProjectVersion !== ver) {
					localStorage.clear()
					localStorage.setItem(window.location.href + 'ProjectVersion', this.ProjectVersion)
				}
			}
		}
		// 包装new Vue()
		Vue.create = function(options) {
			Vue.CptsLoader.checkVersion()
			// 加载options的components
			importCpts(options)
			var vm = new Vue(options)
			Vue.http.options.emulateJSON = true
			return vm
		}
		Vue.loadvue = function(options) {
			return loadVue(options)
		}
		//加载options的components
		importCpts = function(options) {
			//缓存components
			var cpts = options.components
			if(cpts !== null){ 
				//判断存在components列表并且是数组
				if(Array.isArray(cpts)) {					
					//建立一个缓存空对象
					var tmpcpts = null
					//循环加载每一项组件
					cpts.forEach((cptname) => {
						//加载Vue文件
						var newCpt = loadVue(cptname)
	
						if(newCpt) {
							if(!tmpcpts)
								tmpcpts = {}
							tmpcpts[newCpt.name] = newCpt
						}
					})
					//回填到options
					options.components = tmpcpts	
				}
			}
		}			
	
		loadVue = function(name) {
			//生成路径
			var url = window.location.href + name + ".vue"
			//读取本地存储
			var content = Vue.CptsLoader.isSaveTemplateToLocalStorage ? localStorage.getItem(url) : null
			if(!content) {
				RequestVue(url, (res) => {
					content = res
				})
			}
			//读取失败，返回空
			if(!content) return null

			Vue.CptsLoader.isSaveTemplateToLocalStorage && localStorage.setItem(url, content)

			//读取成功，解析
			
			//获取script
			var options
			try{
				 options = eval("(" + GetTagcontent('script', content) + ")")	
			}catch(ex){
				console.log(content)
			}
			
			
			//嵌套调用加载子组件
			options && options.components && importCpts(options)

			var temp = GetTagcontent('template', content)

			//加载css
			var css = GetTagcontent('style',content)
			
			if(css.trim().length>0 && !document.getElementById(options.name + "-style")){
				var newstyle = document.createElement('style')
				newstyle.id = options.name + "-style"
				newstyle.innerHTML =  css 
				document.head.appendChild(newstyle)
			}
			
			//加载模板
			options.template = temp 

			return options
		}
		
		GetTagcontent = function(tag, content) {
			var reg = new RegExp("<" + tag + ">([\\s\\S]*)<\/" + tag + ">")
			if(reg.test(content)) {
				return RegExp.$1
			}
			return ""
		}

		RequestVue = function(url, cb) {
			var request = new XMLHttpRequest()
			request.open('GET', url, false)
			request.send(null)
			request.status === 200 && cb(request.responseText)
		}
	}
})