<script>
	import { onMount } from "svelte"
	// Classes
	import FrameWork from "./class/FrameWorkClass.js"
	// Components
	import DeepField from "./Fields/MainField.svelte"
	import MainField from "./Fields/MainField.svelte"
	import InterfaceField from "./Fields/InterfaceField.svelte"
/*****************************************************************************
 * AppClass
 * プロジェクトすべての要素はこのクラスが集約
 * app = appで強制画面の強制リロードを実行している
 *****************************************************************************/
	class AppClass {
		constructor(reloadFunc) {
			this.reloadFunc = reloadFunc
			this.isShow = false
			this.frameWork = new FrameWork()
			this.interface =null
		}
		reload() {
			this.reloadFunc()
		}
		async init() {
			this.isShow = true
			this.reloadFunc()
			return
		}
	}
	export let app = new AppClass(() => {
		app = app
	})

	onMount(() => {
		setTimeout(async () => {
			await app.init()
		}, 1000)
	})
	const animationFrameFunc = ()=>{
		app.reload()
		window.requestAnimationFrame(animationFrameFunc)
	}
	window.requestAnimationFrame(animationFrameFunc)
/******************************************************************************/
</script>

<main>
	{#if app.isShow}
	<MainField  bind:app/>
	{/if}
</main>

<!----------------------------------------------------------------------------
	css
------------------------------------------------------------------------------>
<style>
</style>
