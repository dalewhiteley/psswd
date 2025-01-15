import { one } from "nouns";
import adj from "adjectives";

export function generatePassword(): string {
    return `${randomAdjective()}${capitilise(randomAdjective())}${capitilise(randomNoun())}`
}

function randomAdjective(): string {
    return adj[Math.round(Math.random() * adj.length)];
}

function randomNoun(): string {
    return one();
}

function capitilise(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}