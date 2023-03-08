<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import { link } from "svelte-spa-router";
    import { dndzone, type DndEvent } from "svelte-dnd-action"
    import { flip } from "svelte/animate";
    
    import API from "../apis/api";
    import { Loading } from "../common";
    import type { CoinIF, CoinsResponseIF } from "../typescript";

    interface ScrollDataIF {
        scrollTop: number;
        scrollHeight: number;
        clientHeight: number;
    };

    let coinPage: Writable<number[]> = writable<number[]>([0, 100]);
    let coinList: CoinIF[] = []
    let loading: boolean = false;

    // Drag and Drop
    let flipDurationMs: number = 200;
    let dropTargetStyle: Record<string, string> = { outline: "none" };

    const getSymbolImage = async(value: CoinIF): Promise<CoinIF> => {
        const symbolIcon: string = `https://coinicons-api.vercel.app/api/icon/${value.symbol.toLowerCase()}`;
        // let img = new Image();
        // const base64Encode = new Promise((resolve) => {
        //     img.onload = () => {
        //         const canvas = document.createElement("canvas");
        //         canvas.width = img.width;
        //         canvas.height = img.height;

        //         const context = canvas.getContext("2d");
        //         context.drawImage(img, 0, 0, canvas.width, canvas.height);

        //         const symbolRgba = context.getImageData(20, 20, canvas.width, canvas.height);

        //         resolve(base64Encode);
        //     }
        // })
        // img.src = symbolIcon;
        return {
            ...value,
            symbol: symbolIcon,
        }
    };

    const getWritablePage = (): number[] => {
        let coinPageArr: number[] = [];
        coinPage.subscribe((page: number[]) => coinPageArr = [page[0], page[1]]);
        return coinPageArr;
    };

    const onLoadPaprika = async() => {
        const coinPageArr: number[] = getWritablePage();
        const { data }: CoinsResponseIF<CoinIF[]> = await API.getAllCoin();
        const inData: CoinIF[] = await Promise.all(data.slice(...coinPageArr).map<Promise<CoinIF>>(getSymbolImage));
        coinList = coinList.concat(inData);
        loading = true;
    };
  
    onMount(() => {
        onLoadPaprika();
    });

    coinPage.subscribe((page: number[]) => {
        if(page[0] !== 0 && page[1] !== 52) {
            onLoadPaprika();
        }
    });

    const onHandleSort = (e: CustomEvent<DndEvent<CoinIF>>) => {
        const array: CoinIF[] = [...e.detail.items];
        coinList = array;
    };

    const onHandleScroll = (e: Event) => {
        const { scrollTop, scrollHeight, clientHeight }: ScrollDataIF = document.documentElement;
        
        if(scrollHeight === scrollTop + clientHeight) {
            const coinPageArr: number[] = getWritablePage();
            coinPage.update((): number[] => [coinPageArr[1], coinPageArr[1] + 100]);
        }
    };

    // Infinity Scroll addEventListener
    onDestroy(() => {
        document.removeEventListener("scroll", onHandleScroll);
    });

    document.addEventListener("scroll", onHandleScroll);
</script>

<div class="coin-list-container">
    <div class="coin-list-wrapper" use:dndzone={{items: coinList, flipDurationMs, dropTargetStyle}} on:consider={onHandleSort} on:finalize={onHandleSort}> 
        {#if loading}
            {#each coinList as coin(coin.id)}
            <div class="coin-info-box" animate:flip={{duration:flipDurationMs}}>
                <a href={`/rate/${coin.id}`} use:link>
                    <div class="coin-info">
                        <div class="coin-symbol-image-wrapper">
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <img class="coin-symbol-image" src={coin.symbol} />
                        </div>
                        <div class="coin-status-wrapper">
                            <span class="coin-status-title">
                                {coin.name}
                            </span>
                            <span class="coin-status-rank">
                                {coin.rank}
                            </span>
                        </div>
                    </div>
                </a>
            </div>
        {/each}
        {:else}
            <Loading />
        {/if}
    </div>
</div>

<style lang="scss">
    @import "../assets/coinsList.scss";
</style>