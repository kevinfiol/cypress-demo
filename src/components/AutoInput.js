import { h } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import Etto from 'etto';

const AutoInput = ({ config, choices, value, onValue }) => {
    const ettoContainer = useRef(null);
    const etto = useRef(null);

    // on mount, initialize Etto
    useEffect(() => {
        if (ettoContainer.current && !etto.current) {
            etto.current = new Etto(
                ettoContainer.current,
                Object.assign(config || {}, { onValue }),
                choices || undefined
            );

            // initial value
            if (value && value.trim()) etto.current.value = value;
        }

        return () => {
            delete etto.current;
            delete ettoContainer.current;
        };
    }, []);

    return (
        <div ref={ettoContainer} />
    );
};

export default AutoInput;