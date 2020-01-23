// var hello = new Vue({
//     el: '#hello',
//     data:{
//         msg: 'Hallo Vue!',
//         peoples:[
//             {name:"Maria"},
//             {name:"Leandro"},
//             {name:"José"},
//             {name:"Thomas"},
//             {name:"EU mesmo"}
//         ],
//         newElement:'',
//         elements: [],
//         objectA:{
//             'font-size':'30px'
//         },
//         objectB:{
//             color:"red"
//         },
//         myListForm: [],
//         myForm:{
//             name:'',
//             email:''
//         }
//     },
//     methods:{
//         addElement: function(e){
//             let title = this.newElement.trim();
//             if (title) {
//                 this.elements.push({title:title});
//                 this.newElement = "";
//             }
//         },
//         removeElement: function(e, index) {
//             e.preventDefault();
//             this.elements.splice(index, 1);
//         },
//         addForm: function (){
//             this.myListForm.push({name: this.myForm.name, email: this.myForm.email});
//             this.myForm.name = "";
//             this.myForm.email = "";
//         }
//     }
// });