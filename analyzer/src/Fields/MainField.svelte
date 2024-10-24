<!--
    メイン操作画面
-->
<script>
    import { createEventDispatcher } from 'svelte'
    import SourceNode from "../Components/SourceNode.svelte"
    export let app


    function push(){
        app.frameWork.addSourceNode('test',['kintoneDate','kintoneText'])
    }

</script>
<div id="main-field">
    メイン操作
    <SourceNode bind:app ></SourceNode>
    <div>
    {#each app.frameWork.nodeList as node, key}
        <SourceNode bind:app bind:node></SourceNode>
    {/each}
    </div>

</div>
<style>
    #main-field{
        z-index:301;
        position:fixed;
        left:0;
        top:0;
        width:100vw;
        height:100vh;
    }
</style>
