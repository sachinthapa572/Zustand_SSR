import { memo, useState, useRef, useEffect } from 'react';

export default function MyApp() {
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    return (
        <>
            <label>
                Name{': '}
                <input
                    type="text"
                    placeholder="Enter your name"
                    className="border border-gray-300 rounded p-1"
                    value={name}
                    onBlur={() => console.log('Input lost focus')}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
            </label>
            <label>
                Address{': '}
                <input
                    type="text"
                    placeholder="Enter your address"
                    className="border border-gray-300 rounded p-1"
                    value={address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                />
            </label>
            <Greeting name={name} />
            <NGreeting name={name} />
        </>
    );
}

// Define props type for Greeting component
interface GreetingProps {
    name: string;
}
// Memoized functional component
const Greeting = memo(({ name }: GreetingProps) => {
    const renderCount = useRef(0);
    renderCount.current += 1;

    useEffect(() => {
        console.log('Greeting was rendered', renderCount.current, 'times');
    });

    return (
        <h3 className="text-lg font-semibold text-blue-500 mt-3 border-5 border-green-300 rounded p-3">
            Hello{name && ', '}
            {name}!<h4>Greeting was rendered {renderCount.current} times</h4>
        </h3>
    );
});

const NGreeting = ({ name }: GreetingProps) => {
    const renderCount = useRef(0);
    renderCount.current += 1;

    return (
        <h3 className="text-lg font-semibold text-red-500 border-3 border-red-300 rounded p-2 mt-3">
            Hello{name && ', '}
            {name}!<h4> this component dont use the memo and render {renderCount.current} times</h4>
        </h3>
    );
};
