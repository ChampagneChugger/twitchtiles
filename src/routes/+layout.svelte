<script lang="ts">
	import "$lib/css/main.css"
	import { Toaster } from "@jill64/svelte-toast"

	let { children } = $props()
</script>

<main>
	{@render children()}
</main>

<Toaster position="bottom-right" />
