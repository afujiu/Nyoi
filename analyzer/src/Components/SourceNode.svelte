<script>
    import { createEventDispatcher } from "svelte"
    import SourceClass from "../class/node/SourceClass.js"
    /**
     * ソースノード
     */
    const dispatch = createEventDispatcher()
    /** member　*/
    let newNode = new SourceClass()
    export let app =null
    export let node = null

    /**
     * ノード作成
     */
    function addNode(){
        newNode.columns = JSON.parse(newNode.columns)
        app.frameWork.addSourceNode(newNode.name,newNode.columns)
        newNode =  new SourceClass()
    }
    /**
     * ノード削除
     * @param node
     */
    function deleteNode(node){
        app.frameWork.deleteSourceNode(node.uniKey)
    }

    /**
     * レコード追加
     * @param node
     */
     function addRecord(node){
        node.addRecord(node.templete)
    }
</script>
<div>
    {#if node==null}
    <!-- 新規ノード作成カード-->
    <div class="new-node">
        <div>
            <input type="text" bind:value={newNode.name}>
        </div>
        <div>
            <textarea bind:value={newNode.columns}></textarea>
        </div>
        <div>
            <button on:click={addNode}>ノード作成</button>
        </div>
    </div>
    {:else}
     <!-- ノードカード-->
     <div class="table-border">
        <div>{node.name}</div>
        <button on:click={node.getRecord(node)}>更新</button>
        <table>
            <tr>
                {#each node.columnsNoPrimary as key}
                <th  class="table-border">{key}</th>
                {/each}
            </tr>
            {#each node.records as tableData, tableIdx}
            <tr>
                {#each node.columnsNoPrimary as key}
                <td  class="table-border">
                    {tableData[key]}
                </td>
                {/each}
            </tr>
            {/each}
        </table>
        <button on:click={addRecord(node)}>レコード追加</button>
        <button on:click={deleteNode(node)}>ノード削除</button>
    </div>
    {/if}
</div>
<style>
.new-node{
    margin:1em;
    display:block;
    background:white;
    border:solid;
}
.table-border{
    margin:1em;
    border:solid 1px;
}
</style>
