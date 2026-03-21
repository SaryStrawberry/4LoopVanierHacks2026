import { Buffer } from "buffer";
async function main() {
    const res = await fetch("http://ctf26.vanierhacks.net/reverseEngineering/peekInsideTheSatelite", {
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
            verificationCode: "55e5fb54-f0c5-4c27-817f-4bf1348bead2"
        })
    });


    console.log(await res.text());

    // const fs = require('node:fs');
    //
    // const content = await res.text();
    //
    // fs.writeFile('~/test.txt', content, err => {
    //     if (err) {
    //         console.log("error2")
    //         console.error(err);
    //     } else {
    //         console.log("yes")
    //         // file written successfully
    //     }
    // });
}

main();

