import { writable, type Writable } from "svelte/store";
import type { CoinIF } from "../typescript/coins";

export let coinsWritable: Writable<CoinIF[]> = writable<CoinIF[]>([]);
export let coinPageWritable: Writable<number[]> = writable<number[]>([0, 100]);
