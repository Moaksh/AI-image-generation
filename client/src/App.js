import axios from "axios";
import {useState} from "react";

const App = () => {
    const [image, updateImage] = useState();
    const [prompt, updatePrompt] = useState();
    const [loading, updateLoading] = useState();

    const generate = async (prompt) => {
        updateLoading(true);
        const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`);
        updateImage(result.data);
        updateLoading(false);
    };

    return (
        <section className="justify-center p-6 pt-20">
            <h1 className="lg:text-6xl md:text-5xl sm:text-4xl text-4xl text-center font-mono font-bold text-white" >AI based image generator</h1>
            <div className="items-center p-10">
                <input value={prompt} onChange={e => updatePrompt(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 " placeholder="Prompt" required/>
                <button onClick={e => generate(prompt) } type="submit"
                        className="text-white mt-5  bg-green-500 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-400">Submit
                </button>
                <div className="flex justify-center p-5 ">

                {loading ?
                    <div role="status"
                         className="flex items-center justify-center h-56 w-full bg-gray-300 rounded-lg animate-pulse dark:bg-gray-600">
                        <span className="sr-only">Loading...</span>
                    </div>
                    :image ?<img src={`data:imgage/png; base64,${image}`} alt={prompt}/> : null}
                </div>
            </div>
        </section>
    );

}
export default App;
