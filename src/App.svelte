<script lang="ts">
	import { Router, Route } from "svelte-navigator";

	import { Header } from "./common";
	import { CoinsList, CoinDetail } from "./components";
</script>

<main>
	<Router>
		<Header />
		<Route path="/" component={CoinsList} />
		<Route path="/:id" component={CoinDetail}/>
	</Router>
</main>