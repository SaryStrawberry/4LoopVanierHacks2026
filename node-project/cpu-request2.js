import { Buffer } from "buffer";
import fs from "fs";


function simulateChallenge(instructions, input) {
    const registers = new Array(8).fill(0);
    const inputQueue = [...input];
    const output = [];

    let pc = 0;

    while (pc < instructions.length) {
        const instr = instructions[pc];
        const opcode = (instr >> 8) & 0b11;

        if (opcode === 0b00) {
            // Load Immediate → R0
            const value = instr & 0xFF;
            registers[0] = value;

        } else if (opcode === 0b01) {
            // Move
            const src = (instr >> 4) & 0b1111;
            const dest = instr & 0b1111;

            let value;

            if (src === 8) {
                value = inputQueue.shift() ?? 0;
            } else {
                value = registers[src];
            }

            if (dest === 8) {
                output.push(value);
            } else {
                registers[dest] = value;
            }
        }

        pc++;
    }

    return output;
}

function solve(data) {
    return {
        submissionId: data.submissionId,
        output: data.challenges.map(ch =>
            simulateChallenge(ch.instructions, ch.input)
        )
    };
}


async function main() {

    const res = await fetch("http://ctf26.vanierhacks.net/ALSS/cpu2", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + Buffer.from("SCPOX:ddb10385-1b0d-4e00-9c7b-0dd3d8f2f6e7", "ascii").toString("base64")
        }
    });
    const data = await res.json();

    // fs.writeFileSync("data.json", JSON.stringify(data, null, 2))
    // console.log("Data saved to data.json")

    const result = solve(data);

    const answer = await fetch("http://ctf26.vanierhacks.net/ALSS/cpu2", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + Buffer.from("SCPOX:ddb10385-1b0d-4e00-9c7b-0dd3d8f2f6e7", "ascii").toString("base64")
        },
        body: JSON.stringify(result)
    });

    console.log(await answer.json());

    fs.writeFileSync("expected.json", JSON.stringify(answer, null, 2))
    console.log("Data saved to expected.json")






}

main();