<script lang="ts">
	import { tilt } from "$lib/functions/tilt"
	import { Plus, Minus, MoveDown, MoveUp, X, Settings } from "lucide-svelte"

	let menuOpen = $state<boolean>(false)
	let menuUp = $state<HTMLButtonElement>()
	let {
		addStream,
		removeStreams,
		appState,
		closeStream,
		toggleSettings
	}: {
		addStream: any
		removeStreams: any
		appState: "addStream" | "removeStream" | "settings" | null
		closeStream: any
		toggleSettings: any
	} = $props()

	function menuToggle() {
		menuOpen = !menuOpen

		if (menuUp?.classList.contains("menuUpDown")) {
			menuUp?.classList.remove("menuUpDown")
		} else {
			menuUp?.classList.add("menuUpDown")
		}
	}
</script>

<div class="menu" use:tilt={{ max: 3, glare: true, "max-glare": 0.05 }} class:menuHidden={menuOpen}>
	{#if appState == "removeStream"}
		<button onclick={closeStream}>
			<X />
		</button>
	{:else}
		<button onclick={removeStreams}>
			<Minus />
		</button>
	{/if}
	<div class="button-group">
		<button onclick={menuToggle}>
			<MoveDown />
		</button>
		{#if appState == "settings"}
			<button onclick={toggleSettings}>
				<X />
			</button>
		{:else}
			<button onclick={toggleSettings}>
				<Settings />
			</button>
		{/if}
	</div>
	{#if appState == "addStream"}
		<button onclick={closeStream}>
			<X />
		</button>
	{:else}
		<button onclick={addStream}>
			<Plus />
		</button>
	{/if}
</div>
<button class="menuUp menuUpDown" onclick={menuToggle} bind:this={menuUp}>
	<MoveUp />
</button>
