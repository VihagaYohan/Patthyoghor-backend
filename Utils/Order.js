const getOrderTotal = payload =>{
    if(payload.length ==0){
        return 0 
    }else{
        let total = 0;
        payload.map(item => {
            let result = item.lineTotal
            total = total + result;
        })
        return total;
    }
}

module.exports = getOrderTotal;