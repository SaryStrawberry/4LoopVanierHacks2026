import {Buffer} from "buffer";

const res = await fetch("http://ctf26.vanierhacks.net/cryptography/signalNoise", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " +
            Buffer.from(
                "SCPOX:ddb10385-1b0d-4e00-9c7b-0dd3d8f2f6e7",
                "ascii"
            ).toString("base64")
    }
});


// const res = await fetch("http://ctf26.vanierhacks.net/cryptography/signalNoise", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//         Authorization: "Basic " +
//             Buffer.from(
//                 "SCPOX:ddb10385-1b0d-4e00-9c7b-0dd3d8f2f6e7",
//                 "ascii"
//             ).toString("base64")
//     },
//     body: JSON.stringify({
//         verificationCode: "4f2a9c7e-8b1d-4c3a-9f72-1e6d8a0b5c91"
//     })
// });