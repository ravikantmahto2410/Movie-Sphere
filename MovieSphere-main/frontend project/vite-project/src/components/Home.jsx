import { useState, useEffect } from "react";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import axios from "../utils/axios";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Loading from "./Loading";
// import Dropdown from "./templates/Dropdown";

const Home = () => {
    const [wallpaper, setWallpaper] = useState(null);
    const [trending, setTrending] = useState(null);
    // const [category, setCategory] = useState("all");

    const GetHeaderWallpaper = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`);
            let randomData = data.results[Math.floor(Math.random() * data.results.length)];
            setWallpaper(randomData);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`);
            setTrending(data.results);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    useEffect(() => {
        document.title = "Homepage";
        GetTrending();
        if (!wallpaper) {
            GetHeaderWallpaper();
        }
    }, [wallpaper]);

    return wallpaper && trending ? (
        <>
            <Sidenav />
            <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
                <Topnav />
                <Header data={wallpaper} />
                <div className="flex justify-between p-5">
                    <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
                    {/* <Dropdown
                        title="Filter"
                        options={["tv", "movie", "all"]}
                        func={(e) => setCategory(e.target.value)}
                    /> */}
                </div>
                <HorizontalCards data={trending} />
            </div>
        </>
    ) : (
        <Loading/>
    );
};

export default Home;
