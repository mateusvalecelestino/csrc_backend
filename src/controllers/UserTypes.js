class UserTypes{
    get(req, res){
        res.status(200).json({
        status: true,
        message: "api running | getting all user-types"
    })
    }
}
export default new UserTypes; // exporta o objecto da classe