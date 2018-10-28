
exports.delElByIndex=function(arr,index){
    let sliced = arr.slice(index+1);//将需要删除元素后续的元素截取出来保存
    arr.length=index;//将需要删除的元素以及后续的所有元素删除
    //arr.push(sliced);
    arr.push.apply(arr,sliced);//将sliced中的元素复制回原数组arr中
};