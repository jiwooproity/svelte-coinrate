<script lang="ts">
    interface MenuIF {
        label: string;
    }
    export const menu: MenuIF[] = [{label: "HOME"}, {label: "RATE"}];
</script>

<div class="header-container">
    <div class="header-wrapper">
        <h1 class="header-logo">COINRATE</h1>
        <ul class="header-menu">
            {#each menu as list}
                <li class="header-list">{list.label}</li>
            {/each}
        </ul>
    </div>
</div>

<style lang="scss">
    @import "../assets/header.scss";
</style>