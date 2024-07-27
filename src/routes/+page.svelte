<script lang="ts">
	import Menu from "$lib/components/Menu.svelte"
	import Confirm from "$lib/components/Confirm.svelte"
	import Popup from "$lib/components/Popup.svelte"
	import Settings from "$lib/components/Settings.svelte"
	import { toast } from "@jill64/svelte-toast"
	import { X } from "lucide-svelte"

	type Stream = {
		id: number
		username: string
	}

	let streams = $state<Stream[]>([])
	let selectedStreams = $state<Stream[]>([])
	let appState = $state<"addStream" | "removeStream" | "settings" | null>(null)

	function addStream() {
		appState = "addStream"
	}

	function closeStream() {
		appState = null
		selectedStreams = []
	}

	function addStreamItem(username: string) {
		appState = null

		if (username.includes(",")) {
			username = username.replaceAll(" ", "")

			const usernames: string[] = username.split(",")

			usernames.map((usernamesItem: string) => {
				if (streams.length == 24 || usernamesItem == "") return

				streams.push({
					id: streams.length == 0 ? 1 : streams[streams.length - 1].id + 1,
					username: usernamesItem
				})
			})
		} else if (username.length > 0) {
			if (streams.length == 24 || username == "") return

			streams.push({ id: streams.length == 0 ? 1 : streams[streams.length - 1].id + 1, username })
		}
	}

	function removeStreams() {
		if (streams.length > 0) {
			appState = "removeStream"
		} else {
			$toast.error("No streams to remove")
		}
	}

	function toggleSelected(id: number, username: string) {
		const found = selectedStreams.findIndex((value) => $state.is(value.id, id))

		if (found == -1) {
			selectedStreams.push({
				id,
				username
			})
		} else {
			selectedStreams = selectedStreams.filter((value) => value.id != id)
		}
	}

	function confirmDelete() {
		const streamAmount: number = selectedStreams.length

		selectedStreams.map((selectedStream) => {
			streams = streams.filter((stream) => stream.id != selectedStream.id)
		})

		selectedStreams = []
		appState = null
		$toast.success(`Successfully removed ${streamAmount} streams`)
	}

	function toggleSettings() {
		appState = appState == "settings" ? null : "settings"
	}

	let columns = $state<string>("1")

	$effect(() => {
		document.documentElement.style.setProperty("--columns", columns)

		document.documentElement.style.setProperty(
			"--rows",
			String(Math.ceil(streams.length / Number(columns)))
		)
	})
</script>

<svelte:head>
	<title>TwitchTiles - Multiple Streams At Once</title>
</svelte:head>

{#if streams}
	<div class="streams">
		{#each streams as { id, username }}
			<div class="streamItem">
				{#if appState == "removeStream"}
					<button onclick={() => toggleSelected(id, username)}>
						{#if selectedStreams.findIndex((value) => $state.is(value.id, id)) != -1}
							<X />
						{/if}
					</button>
				{/if}
				<iframe
					title={username}
					src="https://player.twitch.tv/?channel={username}&parent=twitchtiles.vercel.app&muted=true"
					allowfullscreen
				>
				</iframe>
			</div>
		{/each}
	</div>
{/if}

{#if appState == "settings"}
	<Settings bind:appState bind:columns />
{/if}

{#if selectedStreams.length > 0 && appState == "removeStream"}
	<Confirm {confirmDelete} {selectedStreams} />
{/if}

<Menu {addStream} {removeStreams} {appState} {closeStream} {toggleSettings} />

{#if appState == "addStream"}
	<Popup bind:appState {addStreamItem} />
{/if}
