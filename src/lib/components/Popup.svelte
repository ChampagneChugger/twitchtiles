<script lang="ts">
	import { fade } from "svelte/transition"
	import { Forward } from "lucide-svelte"

	let { appState = $bindable(), addStreamItem }: { appState: any; addStreamItem: any } = $props()
	let inputValue = $state("")

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
<div class="popup-wrapper" transition:fade={{ duration: 300 }} onclick={self(() => close())}>
	<div class="popup">
		<div class="input-group">
			<input
				type="text"
				placeholder="Twitch username"
				onkeyup={(e: KeyboardEvent) => {
					if (e.key == "Enter") addStreamItem(inputValue)
				}}
				bind:value={inputValue}
			/>
			<button onclick={() => addStreamItem(inputValue)}>
				<Forward />
				Enter
			</button>
		</div>
		<p>Note: You can enter multiple usernames and separate them with a comma</p>
	</div>
</div>
