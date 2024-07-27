<script lang="ts">
	import { fade, fly } from "svelte/transition"

	let { appState = $bindable(), columns = $bindable() }: { appState: any; columns: string } =
		$props()

	function close() {
		appState = null
	}

	//@ts-ignore
	function self(callback) {
		//@ts-ignore
		return function (event) {
			//@ts-ignore
			if (event.currentTarget === event.target) callback.call(this, event)
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="settings-wrapper" transition:fade={{ duration: 300 }} onclick={self(() => close())}>
	<div class="settings" transition:fly={{ duration: 300, y: 30 }}>
		<h1>Settings</h1>
		<div class="options">
			<div class="option">
				Number of columns
				<div class="range-group">
					<input type="range" min="1" max="6" bind:value={columns} />
					{columns}
				</div>
			</div>
		</div>
	</div>
</div>
