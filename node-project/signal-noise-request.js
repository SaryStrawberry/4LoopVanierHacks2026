import {Buffer} from "buffer";

const res = await fetch("http://ctf26.vanierhacks.net/cryptography/signalNoise", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " +
            Buffer.from(
                "dgdtr:62c65c58-9928-4822-af74-789c1ee2dbf5",
                "ascii"
            ).toString("base64")
    },
    body: JSON.stringify({
        verificationCode: "4f2a9c7e-8b1d-4c3a-9f72-1e6d8a0b5c91"
    })
});