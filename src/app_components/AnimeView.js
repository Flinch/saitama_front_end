import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Discovery.css";
import AOS from "aos";
import youtube from "../api/youtube";
import loader from "../Loading";
import error from "../img/error.png";

const AnimeView = ({ anime, userID }) => {
    const [animeDetail, setAnimeDetail] = useState({});
    const [trailerURL, setTrailerURL] = useState("");
    const [genreArry, setgenreArry] = useState([]);
    const [hide, setHide] = useState(0);
    const [status, setStatus] = useState({
        notice: "Add to List",
        statusColor: "",
    });

    const API_URL = "https://saitama-back.herokuapp.com/";

    useEffect(() => {
        setTrailerURL(null);
        setHide(0);
        setgenreArry([]);
        setStatus({
            notice: "Add to List",
            statusColor: "",
        });

        AOS.init({});

        try {
            axios.get(`https://api.jikan.moe/v3/anime/${anime}`).then((res) => {
                setAnimeDetail(res.data);

                youtube
                    .get("/search", {
                        params: {
                            q: `${res.data.title} trailer anime`,
                        },
                    })
                    .then((res) => {
                        setTrailerURL(
                            `https://www.youtube.com/embed/${res.data.items[0].id.videoId}`
                        );
                    })
                    .catch((error) => {
                        console.error(
                            "onRejected function called: " + error.message
                        );
                        if (res.data.trailer_url != null) {
                            setTrailerURL(
                                res.data.trailer_url.replace(
                                    "autoplay=1",
                                    "autoplay=0"
                                )
                            );
                        } else {
                            setHide(1);
                        }
                    });

                res.data.genres.map((g) => {
                    setgenreArry((genreArry) => genreArry.concat(g.name));
                });
            });
        } catch (err) {
            console.log(err);
        }
    }, [anime]);

    const onAnimeSelected = () => {
        fetch(
            `${API_URL}getanime?anime=${animeDetail.mal_id}&userID=${userID}`,
            {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.notice.toString() === "Mal has already been taken") {
                    setStatus({
                        notice: "Already Added to List",
                        statusColor: "yellow",
                    });
                } else {
                    setStatus(data);
                }
            })
            .catch((error) => {
                if (error.response) {
                    setStatus({
                        notice: "Something Went Wrong. Try again",
                        statusColor: "red",
                    });
                }
            });
    };

    const removeAutoplay = (url) => {
        var src = url.replace("autoplay=1", "autoplay=0");
        return src;
    };

    return (
        <div
            className="ui three column grid anime-view"
            style={{ fontFamily: "QuickSand" }}
        >
            <div className="column stats" data-aos="fade-right">
                <h1 className="hot-p">
                    {" "}
                    {animeDetail.score == null
                        ? "No Score Yet"
                        : animeDetail.score}{" "}
                </h1>
                <p>
                    {" "}
                    Genres:
                    {genreArry.map((gen) => `  ${gen},`)}
                </p>
                <p> Episodes : {animeDetail.episodes} </p>
                <p>
                    {" "}
                    Popularity :{" "}
                    <span className="hot-p">{animeDetail.popularity}</span>{" "}
                </p>
                <p>
                    {" "}
                    Rank:{" "}
                    <span className="hot-p">
                        {animeDetail.rank == null ? "None" : animeDetail.rank}{" "}
                    </span>
                </p>
                <p> Status: {animeDetail.status} </p>
                <p> Premiered: {animeDetail.premiered} </p>
                <button
                    className={`ui ${status.statusColor} button hotp-back align center`}
                    onClick={() => {
                        onAnimeSelected();
                    }}
                >
                    {" "}
                    {status.notice}{" "}
                </button>
            </div>
            <div className={hide ? "column title mt-180" : "column title"}>
                <h2 style={{ fontFamily: "Orbitron" }}>
                    {" "}
                    {animeDetail.title} <br />{" "}
                    <span style={{ fontSize: "15px" }} className="hot-p">
                        {animeDetail.title_japanese}
                    </span>
                </h2>

                <div className={hide ? "hideDice" : "ui embed"}>
                    <iframe title="video player" src={trailerURL} />
                </div>
            </div>
            <div className="column synopsis-col">
                <div className=" synopsis-title">
                    <h2 style={{ fontFamily: "Orbitron" }}> Synopsis </h2>
                </div>
                <div className="synopsis">
                    <p style={{ lineHeight: "2" }}> {animeDetail.synopsis} </p>
                </div>
            </div>
        </div>
    );
};

export default AnimeView;
