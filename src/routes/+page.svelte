<script>
    import '@picocss/pico/css/pico.min.css'
    import './app.css'

    let form
    let prefix = ""
    let part = ""
    let suffix = ""

    let words = []
    let filteredWords = []
    let maxCount = 500

    async function loadWords() {
        const response = await fetch('/wordlist-german.txt')
        const txt = await response.text()
        words = txt.split('\n')
        filteredWords = words.slice(0, maxCount)
    }

    let timer

    function handleInput() {
        clearTimeout(timer)
        timer = setTimeout(() => filter(prefix, part, suffix), 100)
    }

    function filter(prefix, part, suffix) {
        const r = new RegExp(`^${prefix}.*${part}.*${suffix}$`)
        filteredWords = words.filter(word => r.test(word)).slice(0, maxCount)
    }

    function reset() {
        prefix = ""
        part = ""
        suffix = ""
        form.dispatchEvent(new Event('input'))
    }

</script>

<main class="">

    {#await loadWords()}
        <div id="loading"
             style="grid-column: 1/3; place-self: center"
        >
            <h1>
                Loading words...
            </h1>
            <p>
                ~30MB
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
                <button on:click={reset}>
                    reset
                </button>
            </form>

            <section>
                <p><b>{words.length.toLocaleString()}</b> words searched</p>
                <p>source: <a href="https://github.com/enz/german-wordlist">https://github.com/enz/german-wordlist</a>
                </p>
                <p><i>Only the first 500 results are shown</i></p>
            </section>
        </div>

        <div id="results">


            <table>
                {#each filteredWords as word}
                    <tr>
                        <td>
                            {word}
                        </td>
                    </tr>
                {/each}
            </table>

        </div>

    {/await}
</main>

<style>

    main {
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 100%;
        overflow-y: scroll;
    }

    #search {
        justify-self: flex-end;
        position: sticky;
        top: 0;
        padding: 4rem 2rem 0 0;
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
        max-width: 30rem;
        font-size: .8em;
        /*border: 1px solid teal;*/
    }

    button {
        grid-column: 2;
    }

    section {
        --font-size: .8em;
        --typography-spacing-vertical: .5rem;
    }

    #results {
        width: 100%;
        border-left: var(--border-width) solid var(--table-border-color);
    }

</style>