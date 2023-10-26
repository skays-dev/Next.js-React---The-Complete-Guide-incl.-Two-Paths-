import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === "POST") {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes("@")) {
            res.status(422).json({ message: "Invalid email address." });
            return;
        }

        try {
            const client = await MongoClient.connect("mongodb+srv://skaysdev:YPdipmqvS1XVx3K6@cluster0.vjstus1.mongodb.net/");
            const db = client.db("newsletter");

            await db.collection("emails").insertOne({ email: userEmail });

            client.close();

            res.status(201).json({ message: "success!" });
        } catch (error) {
            res.status(500).json({ message: "Failed to connect to database." });
        }
    }
}

export default handler;
