import { Buffer } from "buffer";
async function main() {
    const res = await fetch("http://ctf26.vanierhacks.net/mistakes/juniorsWebsite", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " +
                Buffer.from(
                    "dgdtr:62c65c58-9928-4822-af74-789c1ee2dbf5",
                    "ascii"
                ).toString("base64"),
            body: JSON.stringify({
                verificationCode: "ca2bbca1-182a-41c7-ac58-aeabca7cf5da"
            })
        }
    });

    console.log(await res.json());
}

main();