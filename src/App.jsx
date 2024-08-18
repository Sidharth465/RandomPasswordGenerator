import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [toggleText,setToggleText] = useState(false)

  // ref Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+=-~`'";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [charAllowed, numAllowed, length]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    

  }, [password]);

  function toggleButtonText(){
    setToggleText(true)
    setTimeout(()=>{
      setToggleText(false)
      window.getSelection().empty()

    },3000)
  }

  useEffect(() => {
    passwordGenerator();
  }, [charAllowed, numAllowed, length]);

  return (
    <>
      <div className="w-full   flex-col  max-w-md mx-auto my-5 shadow-md rounded-lg px-4 text-orange-500 font-semibold bg-gray-800">
        <h1 className="text-center text-white">Password Generator</h1>
        <div className="flex flex-row shadow rounded-lg  overflow-hidden my-3">
          <input
            ref={passwordRef}
            className="outline-none w-full py-1 px-3 "
            placeholder="Password"
            type="text"
            readOnly
            value={password}
          />
          <button
            onClick={()=>{
              copyPasswordToClipboard(),toggleButtonText()
            }}
            className="outline-none bg-blue-700 text-white px-3 py-1 shrink-0"
          >
         {toggleText ? "Copied":"Copy"}
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-2">
            <input
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer "
              la
              type="range"
              min={6}
              max={50}
              value={length}
              name=""
              id=""
            />
            <label>Lenght: {length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
