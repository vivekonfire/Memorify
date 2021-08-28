module.exports = (req,res,next) => {
    const token = req.header('x-auth-token');
    const id = req.header('x-auth-id');

    if(!token){
        return res.status(401).json({msg:"No token, authorization denied"});
    }
    if(!id){
        return res.status(401).json({msg:"No Id"});
    }
    try {
        req.id = id;
        next();
    } catch (err) {
        res.status(401).json({msg:"Invalid Token"})
    }
}