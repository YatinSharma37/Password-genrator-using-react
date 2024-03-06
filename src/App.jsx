import { useCallback, useState, useEffect ,useRef} from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [noAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef=useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (noAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*_~+=-*/<>?';
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, noAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, noAllowed, charAllowed, passwordGenerator]);

  const handleCopy = () => {
    passwordRef.current?.select()
    navigator.clipboard.writeText(password);
    alert("Successfully copied the text")
  };

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center py-8 text-lg underline font-bold '>
          PASSWORD GENERATOR
        </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3 my-4 rounded-lg'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button
            className='bg-red-500 text-black outline-none w-20 mx-2 my-4 rounded-lg'
            onClick={handleCopy} // Add onClick event handler
          >
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length:{length}</label>
          </div>
          <input
            type='checkbox'
            defaultChecked={noAllowed}
            id='numberInput'
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor='numberInput'>NUMBERS</label>
          <input
            type='checkbox'
            defaultChecked={charAllowed}
            id='characterInput'
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor='characterInput'>Special Symbols</label>
        </div>
      </div>
    </>
  );
}

export default App;
