const Auth = (req,res,next)=>{
    console.log("access granted...");
    next();
}

export {
    Auth,
}