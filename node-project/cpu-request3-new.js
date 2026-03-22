import { Buffer } from "buffer";
import fs from "fs";

function load(instr, registers) {
    const value = instr & 0xFF;
    registers[0] = value & 0xFF;
}

function move(instr, registers, inputQueue, output) {
    const src = (instr >> 4) & 0b1111;
    const dest = instr & 0b1111;

    let value;

    // Get value
    if (src === 8) {
        value = inputQueue.length > 0 ? inputQueue.shift() : 0;
    } else {
        value = registers[src];
    }

    value = value & 0xFF; // 🔥 ensure 8-bit

    // Send value
    if (dest === 8) {
        output.push(value);
    } else {
        registers[dest] = value & 0xFF; // 🔥 ensure 8-bit
    }
}

function alu(instr, registers) {
    const op = (instr >> 4) & 0b111; // ✅ FIXED (3 bits only)

    const a = registers[1] & 0xFF;
    const b = registers[2] & 0xFF;
    let result = 0;

    switch (op) {
        case 0: result = a + b; break;
        case 1: result = a - b; break;
        case 2: result = a & b; break;
        case 3: result = a | b; break;
        case 4: result = a ^ b; break;
        case 5: result = ~(a | b); break;
        case 6: result = a << b; break;
        case 7: result = a >> b; break;
    }

    registers[3] = result & 0xFF;
}

function simulateChallenge(instructions, input) {
    const registers = new Array(8).fill(0);
    const inputQueue = [...input];
    const output = [];

    let pc = 0;

    while (pc < instructions.length) {
        const instr = instructions[pc];
        const opcode = (instr >> 8) & 0b11;

        if (opcode === 0b00) {
            load(instr, registers);
        } else if (opcode === 0b01) {
            move(instr, registers, inputQueue, output);
        } else if (opcode === 0b10) {
            alu(instr, registers);
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
    const res = await fetch("http://ctf26.vanierhacks.net/ALSS/cpu3", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Basic " +
                Buffer.from(
                    "SCPOX:ddb10385-1b0d-4e00-9c7b-0dd3d8f2f6e7",
                    "ascii"
                ).toString("base64"),
        },
    });

    const data = await res.json();

    const result = solve(data);

    const answer = await fetch("http://ctf26.vanierhacks.net/ALSS/cpu3", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Basic " +
                Buffer.from(
                    "SCPOX:ddb10385-1b0d-4e00-9c7b-0dd3d8f2f6e7",
                    "ascii"
                ).toString("base64"),
        },
        body: JSON.stringify(result),
    });

    console.log(await answer.json());
}

main();