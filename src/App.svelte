<script lang="ts">
	import Router from "svelte-spa-router";

	import { Header } from "./common";
	import { CoinsList, CoinDetail } from "./components";

	const routes = {
		'/': CoinsList,
		'/rate/:id': CoinDetail,
	}
</script>

<main>
	<Header />
	<Router {routes}/>
</main>