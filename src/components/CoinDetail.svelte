<script lang="ts">
    import { onMount } from "svelte";
    import { useParams } from "svelte-navigator";

    import API from "../apis/api";
    import { Loading } from "../common";
    import type { CoinsDetail, CoinsResponseIF } from "../typescript/coins";

    interface routeIF { id: string };
    const params = useParams();

    let coinDetail: CoinsDetail;
    let loading: boolean = false;

    const onLoadPaprika = async ({ id }: routeIF) => {
        const { data }: CoinsResponseIF<CoinsDetail> = await API.getCoinDetail({ id });
        coinDetail = data;
        loading = true;
    }

    onMount(() => {
        onLoadPaprika({ id: $params.id });
    })
</script>

<div class="coin-detail-list-container">
    <div class="coin-detail-list-wrapper">
        {#if loading}
            <div>{coinDetail.description}</div>
        {:else}
            <Loading />
        {/if}
    </div>
</div>

<style lang="scss">
    @import "../assets/coinDetail.scss";
</style>