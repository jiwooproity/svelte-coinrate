<script lang="ts">
	import { Link } from "svelte-navigator";

    interface MenuIF {
        label: string;
        path: string;
    }

    export const menu: MenuIF[] = [{label: "HOME", path: "/"}, {label: "RATE", path: "/rate"}];
</script>

<div class="header-container">
    <div class="header-wrapper">
        <h1 class="header-logo">
            <Link to="/">COINRATE</Link>
        </h1>
        <ul class="header-menu">
            {#each menu as list}
                <li class="header-list">
                    <Link to={list.path}>{list.label}</Link>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style lang="scss">
    @import "../assets/header.scss";
</style>