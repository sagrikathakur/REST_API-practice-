import express from "express";
const app = express();

app.use(express.json());

const PORT = 3000;

let users = [
    { id: 1, name: "Momo" },
    { id: 2, name: "Alex" }
];

app.get("/users", (req, res) => {
    res.json(users);
});

app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

app.post("/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name;
    res.json(user);
});

app.delete("/users/:id", (req, res) => {
    const exists = users.some(u => u.id == req.params.id);

    if (!exists) {
        return res.status(404).json({ message: "User not found" });
    }

    users = users.filter(u => u.id != req.params.id);
    res.json({ message: "User deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});