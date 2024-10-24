<script>
    import { createEventDispatcher } from "svelte";
    /**
     * ボタン
     */
    const dispatch = createEventDispatcher();
    /** member　*/
    //サイズ
    export let size = "w1 h1";
    export let exclass = "";
    export let longtap = 350;
    let myTimerId;
    let myEvent;
    /** event　*/
    /**
     * 押す
     */
    function down(e) {
        myTimerId = setTimeout(() => {
            clearTimeout(myTimerId);
            altdown(e);
        }, longtap);
        myEvent = e;
        dispatch("down", { e: e });
    }

    /**
     * 離す
     * @param e
     */
    function up(e) {
        clearTimeout(myTimerId);
        dispatch("up", { e: e });
    }
    /**
     * 長押し
     */
    function altdown(e) {
        dispatch("alt", { e: myEvent });
    }
    function dbclick(e) {
        clearTimeout(myTimerId);
        dispatch("alt", { e: e });
    }
</script>

<div
    class="btn {size} {exclass}"
    on:pointerdown={down}
    on:pointerup={up}
    on:dblclick={dbclick}
>
    <div class="inner-box">
        <slot class="slot" />
    </div>
</div>

<style>
    .btn {
        overflow: hidden;
        display: inline-block;
        padding: 0;
        margin: 0;
        cursor: pointer;
        touch-action: none;
    }
    .btn:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    .btn:active {
        background: rgba(255, 255, 255, 0.2);
        opacity: 0.5;
    }
    .inner-box {
        touch-action: none;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
