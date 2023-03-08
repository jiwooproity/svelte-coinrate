<script lang="ts">
    import { onMount } from "svelte";
    import API from "../apis/api";
    import type { CoinsDetail, CoinsResponseIF } from "../typescript/coins";

    interface routeIF { id: string };
    export let params: routeIF;

    let coinDetail: CoinsDetail;

    const onLoadPaprika = async ({ id }: routeIF) => {
        const { data }: CoinsResponseIF<CoinsDetail> = await API.getCoinDetail({ id });
        coinDetail = data;
    }

    onMount(() => {
        onLoadPaprika({id: params.id});
    })
</script>

<div></div>

<style></style>