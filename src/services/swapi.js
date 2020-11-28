const swapi = {
    controller: null,

    async searchCharacters(query) {
        if (this.controller) this.controller.abort();
        this.controller = new AbortController();

        try {

            const res = await fetch(`https://swapi.dev/api/people/?search=${query}`, {
                signal: this.controller.signal
            });

            this.controller = null;
            const json = await res.json();
            return json.results || [];
        } catch(e) {
            throw Error('Unable to retrieve characters: ', e);
        }
    }
};

export default swapi;