// import _ from 'lodash'
import a from './components/a'
import b from './components/b'

import "./style/normalize.scss"
import "./style/index.scss"

a()

// console.log(_.Chunk([5,4,6,7,8,5],2));

// 测试es6
// import from from '@babel/runtime/core-js/array/from'
// console.log(Array.form({
//     '0': 'a',
//     '1': 'b',
//     '2': 'c',
//     length: 3
// }))

//测试第三方库，jquery
// $(".img").addClass("active")

$.get('/api/comments/show',{
    id:'4193586758833502',
    page: 1
},function (param) { 
    console.log(param)
 })
 console.log("fff")