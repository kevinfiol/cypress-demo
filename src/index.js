import './styles/index.css';

import { h, render } from 'preact';
import { State, Actions, useGlobalState } from './state';
import swapi from './services/swapi';
// import Counter from './components/Counter';
import AutoInput from './components/AutoInput';

const ettoConfig = {
    selectMode: true,
    selectPlaceholder: 'Try searching for Star Wars characters...',
    onSelect: choice => {
        console.log(choice.person);
    },
    source: async (query, done) => {
        try {
            const results = await swapi.searchCharacters(query.trim());
            done(results.map(person => ({ label: person.name, person })));
        } catch(e) {
            done([])
            if (e.name !== 'AbortError') { throw e; }
        }
    }
};

const App = () => {
    const [state, actions] = useGlobalState(Actions, State());

    return (
        <div>
            <h1>Star Wars Team Builder</h1>
            <p>Assemble your Star Wars Dream Team</p>
            <AutoInput config={ettoConfig} />
        </div>
    );
};

render(<App />, document.getElementById('app'));