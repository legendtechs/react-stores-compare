import { observable, autorun, action } from 'mobx';

 class appStore {
   @observable appInfo = {
     name: 'scott11',
     age: '2225'
   }
  @observable count = 0
  @observable timer = 100
  @observable diffCount = 0
  
  @action.bound
  add(count) {
     console.log('add ', this);
    //  this.diffCount += 1; 
    //  this.count += 10;
    this.diffCount += count;
   }

   @action.bound
   onAsyncAdd(count) {
     (async function sleep(ms){
       return await new Promise(resolve => {
         setTimeout(resolve, ms)
       })
     })(1000).then(r => {
       console.log('async r ');
       this.diffCount += count;
     })
   }
 }

 const store = new appStore();
 setInterval(() => {
  // store.diffCount += 1;
}, 1000);

autorun(() => {
  console.log("autorun: ", store.diffCount);
  // whyRun();
});

 export default store;