module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        username: {
            type : DataTypes.STRING,
        },
        password : {
            type : DataTypes.STRING,
        },
        name : {
            type : DataTypes.STRING,
        }
        
    },{
        tableName: "users",
        timestamps: false,
    }
    
    );

    return User;
}