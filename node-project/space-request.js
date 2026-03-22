import {Buffer} from "buffer";

const answer = await fetch("http://ctf26.vanierhacks.net/steganography/spaceNoises", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from("SCPOX:ddb10385-1b0d-4e00-9c7b-0dd3d8f2f6e7", "ascii").toString("base64")
    },
    body: JSON.stringify({
        verificationCode: "214357"
    })
});

console.log(await answer);