<!--
    DOM操作が必要だが非表示にしたい処理を実施する場所
-->
<script>
    import { createEventDispatcher } from "svelte"
    export let app
</script>
<div id="deep-field">
</div>
<div id="deep-filter"></div>
<style>
    #deep-field{
        z-index:0;
        position:fixed;
        left:0;
        top:0;
        width:100vw;
        height:100vh;
    }
    #deep-filter{
        z-index:300;
        position:fixed;
        left:0;
        top:0;
        width:100vw;
        height:100vh;
        background:white;
    }
</style>
