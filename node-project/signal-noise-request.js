import {Buffer} from "buffer";
import fs from "fs";

async function main() {

    const answer = await fetch("http://ctf26.vanierhacks.net/cryptography/signalNoise", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + Buffer.from("SCPOX:ddb10385-1b0d-4e00-9c7b-0dd3d8f2f6e7", "ascii").toString("base64")
        },
        body: JSON.stringify( {
            verificationCode: "bb1adc8c-b6c8-4e41-aef2-b87581021ccc"
        })
    });

    console.log(await answer.json());

}

main();