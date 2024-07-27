<script lang="ts">
	import { fade } from "svelte/transition"
	let { confirmDelete, selectedStreams }: { selectedStreams: any[]; confirmDelete: any } = $props()
</script>

<button class="removeStreams" transition:fade={{ duration: 100 }} onclick={confirmDelete}
	>Remove {selectedStreams.length} selected {selectedStreams.length == 1
		? "stream"
		: "streams"}</button
>
