/**
 * Created by zenit1 on 03/07/2016.
 */


var developerServices = new(require('../../src/core/DeveloperServices'))();


developerServices.createDeveloper('huy',function(error,payload){
    if(!error){
        console.log(payload);
    }
    else{
        console.error(error);
    }
});