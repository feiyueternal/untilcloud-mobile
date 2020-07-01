import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
// import Changecode from '../views/Changecode'
import Register from '../views/Register'
import test from '../views/test'
import Tabbar from '../views/Tabbar'
import TeacherTabbar from '../views/TeacherTabbar'
import TeacherCourse from '../views/TeacherCourse'
import CreateCourse from '../views/CreateCourse'
import TeacherInfo from '../views/TeacherInfo'
import TeaCourseTabbar from '../views/TeaCourseTabbar'
import CourseStu from '../views/teaAdmin/CourseStu'
import TeaCourseEdit from '../views/teaAdmin/TeaCourseEdit'
import TeaSign from '../views/teaAdmin/TeaSign'
import stuTabbar from '../views/stuTabbar'
import message from '../views/stuCourse/message'
import otherStu from '../views/stuCourse/otherStu'
import stuSign from '../views/stuCourse/stuSign'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component:resolve => require(['@/views/Login.vue'],resolve)
  },
  {
      path: '/about',
      name: 'About',
      component:resolve => require(['@/views/About.vue'],resolve), 
  },
  {
    path: '/ForgetPassword',
    name: 'ForgetPassword',
    component:resolve => require(['@/views/ForgetPassword.vue'],resolve), 
},
{
  path: '/Register',
  name: 'Register',
  component:resolve => require(['@/views/Register.vue'],resolve), 
},
{
  path:'/admin',
    name: 'Admin',
    component: Tabbar,
    children:[
      {
        path:'/Home',
        name:'Home',
        component:resolve => require(['@/views/Home.vue'],resolve),
        
      },
      {
        path: '/test',
        name: 'test',
        component:resolve => require(['@/views/test.vue'],resolve), 
      },
      
      {
        path:'/Myinfo',
        name:'Myinfo',
        component:resolve => require(['@/views/MyInfo/Myinfo.vue'],resolve),
      },
      {
          path:'/ChangeMyinfo',
          name:"ChangeMyinfo",
          component:resolve => require(['@/views/MyInfo/ChangeMyinfo.vue'],resolve),
        }
    ]
    
},
{
  path:'/TeacherTabbar',
    name: 'TeacherTabbar',
    component: TeacherTabbar,
    children:[
      {
        path:'/TeacherCourse',
        name:'TeacherCourse',
        component:resolve => require(['@/views/TeacherCourse.vue'],resolve),
        
      },
      {
        path: '/CreateCourse',
        name: 'CreateCourse',
        component:resolve => require(['@/views/CreateCourse.vue'],resolve), 
      },
      
      {
        path:'/TeacherInfo',
        name:'TeacherInfo',
        component:resolve => require(['@/views/TeacherInfo.vue'],resolve),
      },
      {
        path:'/ChangeTeaInfo',
        name:'ChangeTeaInfo',
        component:resolve => require(['@/views/ChangeTeaInfo.vue'],resolve),
      }
    ]
    
},
{
  path:'/TeaCourseTabbar',
    name: 'TeaCourseTabbar',
    component: TeaCourseTabbar,
    children:[
      {
        path:'/TeaCourseEdit',
        name:'TeaCourseEdit',
        component:resolve => require(['@/views/teaAdmin/TeaCourseEdit.vue'],resolve),
      },
      {
        path:'/TeaSign',
        name:'TeaSign',
        component:resolve => require(['@/views/teaAdmin/TeaSign.vue'],resolve),
      },
      {
        path:'/CourseStu',
        name:'CourseStu',
        component:resolve => require(['@/views/teaAdmin/CourseStu.vue'],resolve),
      },
      {
        path:'/TeaTimeSign',
        name:'TeaTimeSign',
        component:resolve => require(['@/views/teaAdmin/TeaTimeSign.vue'],resolve)
      },
      {
        path:'/Teatmp',
        name:'Teatmp',
        component:resolve => require(['@/views/teaAdmin/Teatmp.vue'],resolve)
      },
      {
        path:'/TeaHistorySign',
        name:'TeaHistorySign',
        component:resolve => require(['@/views/teaAdmin/TeaHistorySign.vue'],resolve)
      }
    ]
},
{
  path:'/stuTabbar',
    name: 'stuTabbar',
    component: stuTabbar,
    children:[
      {
        path:'/message',
        name:'message',
        component:resolve => require(['@/views/stuCourse/message.vue'],resolve),
      },
      {
        path:'/otherStu',
        name:'otherStu',
        component:resolve => require(['@/views/stuCourse/otherStu.vue'],resolve),
      },
      {
        path:'/stuSign',
        name:'stuSign',
        component:resolve => require(['@/views/stuCourse/stuSign.vue'],resolve),
      },
      {
        path:'/stuTimeSign',
        name:'stuTimeSign',
        component:resolve => require(['@/views/stuCourse/stuTimeSign.vue'],resolve)
      },{
        path:'/stuHistorySign',
        name:'stuHistorySign',
        component:resolve => require(['@/views/stuCourse/stuHistorySign.vue'],resolve)
      }
    ]
}
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

export default router
