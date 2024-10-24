<!--
    画面全体でポインター操作を行う
-->
<script>
    import { createEventDispatcher } from "svelte"
    export let app
    class InterfaceClass{
        constructor(app){
            this.isPointerMode=false
        }

    }
    app.interface = new InterfaceClass(app)
</script>
{#if app.interface.isPointerMode}
<div id="interface-field"
    on:pointerdown={app.interface.isPointerMode=false}
>

</div>
{/if}
<style>
    #interface-field{
        z-index:800;
        position:fixed;
        left:0;
        top:0;
        width:100vw;
        height:100vh;
        background:red;
    }
</style>
