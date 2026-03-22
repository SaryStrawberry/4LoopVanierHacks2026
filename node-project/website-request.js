import { Buffer } from "buffer";
async function main() {

    const res = await fetch("http://ctf26.vanierhacks.net/mistakes/juniorsWebsite", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + Buffer.from("SCPOX:ddb10385-1b0d-4e00-9c7b-0dd3d8f2f6e7", "ascii").toString("base64")
        },
        body: JSON.stringify({
            verificationCode: "97f7ccc4-ee19-4fc2-9c9c-f4cca88f86ee"
        })
    });

    console.log(await res.json());
}

main();