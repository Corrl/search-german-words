<script>
    import '@picocss/pico/css/pico.min.css'
    import './app.css'
    import {base} from "$app/paths";

    let form
    let prefix = ""
    let part = ""
    let suffix = ""
    let caseSensitive = true
    let hoveredWord = ""

    let words = []
    let filteredWords = []
    let maxCount = 100

    async function loadWords() {
        const response = await fetch(`${base}/wordlist-german.txt`)
        const txt = await response.text()
        words = txt.split('\n')
        filteredWords = words
    }

    let timer

    function handleInput() {
        clearTimeout(timer)
        timer = setTimeout(() => filter(prefix, part, suffix), 100)
    }

    function filter(prefix, part, suffix) {
        const r = new RegExp(`^${prefix}.*${part}.*${suffix}$`, caseSensitive ? "" : "i")
        filteredWords = words.filter(word => r.test(word))
    }

    function reset() {
        prefix = ""
        part = ""
        suffix = ""
        form.dispatchEvent(new Event('input'))
    }

    async function loadInfo(word) {
        const response = await fetch(`https://www.dwds.de/wb/${word}`)
        console.log(response)
    }

</script>

<main class="">

    {#await loadWords()}
        <div id="loading">
            <h1>
                Loading words...
            </h1>
            <p style="font-size: .8em">
                ~6&hairsp;MB gzipped (&thinsp;~30&hairsp;MB unzipped&thinsp;)
            </p>
        </div>
    {:then _}

        <div id="search">

            <h1>
                Search German words
            </h1>

            <form id="inputs"
                  on:input="{handleInput}"
                  bind:this={form}
            >
                <div class="input">
                    <label for="prefix">Starts with</label>
                    <input id="prefix" type="text" bind:value={prefix} placeholder="prefix">
                </div>
                <div class="input">
                    <label for="contains">Includes</label>
                    <input id="contains" type="text" bind:value={part} placeholder="part">
                </div>
                <div class="input">
                    <label for="suffix">Ends with</label>
                    <input id="suffix" type="text" bind:value={suffix} placeholder="suffix">
                </div>

                <div style="display: flex;">
                    <input id="case-sensitive" type="checkbox" bind:checked={caseSensitive}>
                    <label for="case-sensitive">Case sensitive</label>
                </div>

                <button on:click={reset}>
                    reset
                </button>


            </form>

            <section>
                <p><b>{words.length.toLocaleString()}</b> words searched - <b>{filteredWords.length.toLocaleString()}</b>
                    results</p>
                <p><i>Only the first  <input id="word-count" type="number" bind:value={maxCount}> results are shown</i></p>
                <p>source: <a href="https://github.com/enz/german-wordlist">https://github.com/enz/german-wordlist</a>
                </p>
            </section>
        </div>

        <div id="results">

            <table>
                {#each filteredWords.slice(0, maxCount) as word}
                    <tr on:click={() => hoveredWord = word}>
                        <td>
                            {word}
                        </td>
                    </tr>
                {/each}
            </table>

        </div>

        <div id="word-info">

            <iframe id="dwds-lookup"
                    title="DWDS entry for word"
                    width="100%"
                    height="100%"
                    src={`https://www.dwds.de/wb/${hoveredWord}`}>
            </iframe>

        </div>

    {/await}
</main>

<style>

    main {
        height: 100%;
        display: grid;
        grid-template-columns: 2fr 1fr 3fr;
        grid-template-rows: 100%;

        --form-element-spacing-vertical: 3px;
        --form-element-spacing-horizontal: 8px;
    }

    #loading {
        grid-column: 1/4;
        place-self: center;
    }

    #search {
        padding: 4rem 2.5rem;
        /*border: 1px solid purple;*/
    }

    h1 {
        margin-bottom: 1.5rem;
        --font-size: 1.8rem;
    }

    #inputs {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: .5rem;
        /*border: 1px solid teal;*/
    }

    label {
        font-size: .7rem;
    }

    input {
        font-size: .9rem;
    }

    section {
        --font-size: .8em;
        --typography-spacing-vertical: .5rem;
    }

    #word-count {
        display: inline;
        width: 3rem;
        height: revert;
        margin: 0;
        padding: 0 0 0 4px;
        font-size: .95em;
    }

    #results {
        min-width: 22ch;
        border-left: var(--border-width) solid var(--table-border-color);
        overflow-y: scroll;
    }

    td {
        cursor: pointer;
    }

</style>