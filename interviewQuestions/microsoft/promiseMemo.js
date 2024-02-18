// https://gist.github.com/lilpolymath/aa00db6d7dfea6d929d0c1759a438f3a

class User {
    constructor(name, age, gender, id) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

const Users = {
    "1": new User("Sanju", "34", "M"),
    "2": new User("Kusum", "30", "F"),
    "3": new User("Chotu", "22", "M")
}

const getUserDetailsService = async(userId)=>{
    console.log("service layer hit");
    return Users[userId] || {};
}

let cachedResults = {};

const getUserDetails =  async (userId) => {
    try{
        if(cachedResults[userId]) {
            console.log("cached result returned");
            return cachedResults[userId];
        } else {
            const user = await getUserDetailsService(userId);
            cachedResults[userId] = user;
            return user;
        }
    } catch (err) {
        throw(err);
    }
}

getUserDetails("1").then((user)=>{
    console.log(user);
    return getUserDetails("2")
}).then((user)=>{
    console.log(user);
    return getUserDetails("1")
}).then(console.log);
