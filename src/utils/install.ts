import Vue from 'vue'
import vueFilter from '@/utils/filter'
import vueDirective from '@/utils/directive'

// 添加 filter
vueFilter.forEach(v => {
  Vue.filter(v.name, v.func)
})

// 添加 directive
vueDirective.forEach(v => {
  Vue.directive(v.name, v.func)
})
