import { Buffer } from "buffer";
async function main() {
    const res = await fetch("http://ctf26.vanierhacks.net/dataHandling/creditCards", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " +
                Buffer.from(
                    "dgdtr:62c65c58-9928-4822-af74-789c1ee2dbf5",
                    "ascii"
                ).toString("base64")
        }
    });

    const data = await res.json();

    console.log(data[0]);
}

main();

