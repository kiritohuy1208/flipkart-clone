export default (query) => {
  
    if(query){
      
        const queryString = query.split('?')[1] //cid=60fe20721bacc91a581dfb36&type=product
        if(queryString){
            const params = queryString.split('&') // params = ["cid=60fe20721bacc91a581dfb36","type=product"]
            const paramsObj = {}
            params.forEach(param =>{ // param = "cid=60fe20721bacc91a581dfb36" , "type=product"
                const keyValue = param.split('=') // keyValue = ['cid','60fe20721bacc91a581dfb36']
                paramsObj[keyValue[0]] = keyValue[1] //  paramsObj[keyValue[0]]= cid ; keyValue[1]= '60fe20721bacc91a581dfb36'
            })
            return paramsObj
        }
      
    }
    return {}
}