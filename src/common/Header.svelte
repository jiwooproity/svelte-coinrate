<script lang="ts">
    import { link } from "svelte-spa-router";

    interface MenuIF {
        label: string;
        path: string;
    }

    export const menu: MenuIF[] = [{label: "HOME", path: "/"}, {label: "RATE", path: "/rate"}];
</script>

<div class="header-container">
    <div class="header-wrapper">
        <h1 class="header-logo">
            <a href="/" use:link>COINRATE</a>
        </h1>
        <ul class="header-menu">
            {#each menu as list}
                <li class="header-list">
                    <a href={list.path} use:link>{list.label}</a>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style lang="scss">
    @import "../assets/header.scss";
</style>