<script>
    import '@picocss/pico/css/pico.min.css'
    import './app.css'
    import {base} from "$app/paths";

    let form
    let prefix = ""
    let part = ""
    let suffix = ""
    let caseSensitive = true
    let markSerch = true
    let currentWord = ""

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
        timer = setTimeout(() => filter(prefix, part, suffix), 150)
    }

    function filter(prefix, part, suffix) {
        let r
        const flag = caseSensitive ? "" : "i"
        if (prefix.length > 0 && suffix.length > 0) {
            r = new RegExp(`^${prefix}.*${part}.*${suffix}$`, flag)
        } else if (prefix.length === 0 && suffix.length > 0) {
            r = new RegExp(`^.+${part}.*${suffix}$`, flag)
        } else if (prefix.length > 0 && suffix.length === 0) {
            r = new RegExp(`^${prefix}.*${part}.+$`, flag)
        } else if (prefix.length === 0 && suffix.length === 0) {
            r = new RegExp(`^.+${part}.+$`, flag)
        }
        // const r = new RegExp(`^${prefix}.*[^^]${part}[^$].*${suffix}$`, caseSensitive ? "" : "i")
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

    function markSearchTerm(word) {
        const pref = word.slice(0, prefix.length)
        const suffixStart = word.length - suffix.length
        const suf = word.slice(suffixStart)
        const middlePart = word.slice(prefix.length, suffixStart)
        const partIndex = middlePart.indexOf(part)
        const _1 = middlePart.slice(0, partIndex)
        const p = middlePart.slice(partIndex, partIndex + part.length)
        const _2 = middlePart.slice(partIndex + part.length)
        return `<span class=\"mark\">${pref}</span>`
            + `${_1}`
            + `<span class=\"mark\">${p}</span>`
            + `${_2}`
            + `<span class=\"mark\">${suf}</span>`
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

                <div style="display: flex;">
                    <input id="mark-search" type="checkbox" bind:checked={markSerch}>
                    <label for="mark-search">Mark search terms</label>
                </div>

                <button on:click={reset}>
                    reset
                </button>
            </form>

            <section>
                <p><b>{words.length.toLocaleString()}</b> words searched -
                    <b>{filteredWords.length.toLocaleString()}</b>
                    results</p>
                <p><i>Only the first <input id="word-count" type="number" bind:value={maxCount}> results are shown</i>
                </p>
            </section>

            <section>
                <p>Words from&nbsp;&thinsp;<a href="https://github.com/enz/german-wordlist">https://github.com/enz/german-wordlist</a>
                </p>
                <p>Project repo&nbsp;&thinsp;<a href="https://github.com/Corrl/search-german-words">https://github.com/Corrl/search-german-words</a>
                </p>
            </section>

        </div>

        <div id="results">

            <table>
                {#each filteredWords.slice(0, maxCount) as word}
                    <tr on:click={() => currentWord = word}
                        class:current-word={currentWord === word}
                    >
                        <td>
                            {#if markSerch}
                                {@html markSearchTerm(word)}
                                <!--                                <span class="mark">{pref}</span>{_1}<span class="mark">{p}</span>{_2}<span class="mark">{suf}</span>-->
                            {:else}
                                {word}
                            {/if}
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
                    src={`https://www.dwds.de/wb/${currentWord}`}>
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
        user-select: none;
    }

    input {
        font-size: .9rem;
    }

    ::placeholder {
      font-weight: normal;
        color: #b3b3b3;
    }

    section {
        --font-size: .8em;
        --typography-spacing-vertical: .3rem;
        --block-spacing-vertical: 1rem;
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
        min-width: 16ch;
        border-left: 2px solid var(--table-border-color);
        overflow-y: scroll;
    }

    tr {
        cursor: pointer;
        transition: box-shadow 200ms;
    }

    tr:hover,
    .current-word {
        background: rgba(245, 245, 245, 0.99);
    }

    .current-word {
        box-shadow: inset 4px 0 0 var(--primary);
    }

    /*noinspection CssUnusedSymbol*/
    #results :global(.mark) {
        font-weight: bold;
        color: var(--primary);
        filter: brightness(.95);
    }

    @media (max-width: 1000px) {
        main {
            grid-template-rows: max-content 1fr;
            grid-template-columns: 100%;
        }

        #search {
            padding: 2rem 1rem;
        }

        #results {
            border-top: 3px solid var(--table-border-color);
        }

        iframe {
            display: none;
        }
    }

</style>