import express from "express";



const app = express();
const port = 3000;
app.use(express.json())

let userData = [];
let nextId = 1;


// add a new User

app.post("/users", (req, res) => {
    const { name, age } = req.body;
    const newUser = { id: nextId++, name, age };
    userData.push(newUser);
    res
        .status(200)
        .send(newUser)
})

// get all users

app.get("/users", (req, res) => {
    res
        .status(200)
        .send(userData)
})

// get user by id

app.get("/user/:id", (req, res) => {
    const { id } = req.params;
    const data = userData.find(user => user.id === parseInt(id));
    if (!data) {
        return res
            .status(404)
            .send("User not Found")
    }
    res
        .status(200)
        .send(data)

})

// update userdata

app.put("/user/:id", (req, res) => {
    const { id } = req.params;
    const updateData = userData.find(user => user.id === parseInt(id));
    if (!updateData) {
        return res
            .status(404)
            .send("User not Found")
    }
    const { name, age } = req.body;
    updateData.name = name;
    updateData.age = age;
    res
        .status(200)
        .send(updateData)

})

// delete user

app.delete("/user/:id", (req, res) => {
    const { id } = req.params;
    const deleteUser = userData.findIndex(user => user.id === parseInt(id))
    if (deleteUser === -1) {
        res
            .status(404)
            .send("User not Found")
    }
    userData.splice(deleteUser, 1)
    res
        .status(200)
        .send("User Deleted")

})


app.listen(port, () => {
    console.log(`Express listening at port:${port}...`);
})