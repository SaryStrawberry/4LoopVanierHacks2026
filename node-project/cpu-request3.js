import { Buffer } from "buffer";
import fs from "fs";


function simulateChallenge(instructions, input) {
    const registers = new Array(8).fill(0); // 8 registers, initially 0
    const inputQueue = [...input]; // Queue to pull values from
    const output = [];
    let pc = 0; // Program Counter

    while (pc < instructions.length) {
        const instr = instructions[pc];
        const opcode = (instr >> 8) & 0b11; // Extract opcode from the higher bits (adjust based on format)

        //Load immediate
        if (opcode === 0b00) {
            // Load Immediate → R0
            const value = instr & 0xFF;
            registers[0] = value;

        //Move
        } else if (opcode === 0b01) {
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
        //ALU
        } else if (opcode === 0b10) {
            const op = instr & 0b1111; // Lower 4 bits for the operation type

            const a = registers[1] & 0xFF; // Register 1 value
            const b = registers[2] & 0xFF; // Register 2 value
            let result = 0;

            switch (op) {
                case 0: result = a + b; break;
                case 1: result = a - b; break;
                case 2: result = a & b; break;
                case 3: result = a | b; break;
                case 4: result = a ^ b; break;
                case 5: result = ~(a | b) & 0xFF; break; // Bitwise NOR (flip OR result)
                case 6: result = (a << b) & 0xFF; break; // Shift left
                case 7: result = (a >>> b) & 0xFF; break; // Shift right (unsigned)
                default: result = 0; break;
            }
            registers[3] = result & 0xFF; // Store result in Register 3 (mask to 8 bits)
        }
        pc++; // Move to the next instruction
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

    const res = await fetch("http://ctf26.vanierhacks.net/ALSS/cpu3", {
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

    const answer = await fetch("http://ctf26.vanierhacks.net/ALSS/cpu3", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + Buffer.from("SCPOX:ddb10385-1b0d-4e00-9c7b-0dd3d8f2f6e7", "ascii").toString("base64")
        },
        body: JSON.stringify(result)
    });

    console.log(await answer.json());

    // fs.writeFileSync("expected.json", JSON.stringify(answer, null, 2))
    // console.log("Data saved to expected.json")






}

main();