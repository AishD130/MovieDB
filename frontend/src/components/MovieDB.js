import React, { useEffect, useRef, useState } from "react";
import "./css/MovieDB.css";
import axios from "axios";
import ReactPlayer from "react-player/lazy";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { IconButton } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

function MovieDB() {
  const videoRef = useRef(null);

  const [movies, setMovies] = useState([]);
  const [paginated, setPaginated] = useState([]);
  useEffect(() => {
    axios.get("/api/movie").then((res) => {
      setMovies(res.data.reverse());
    });
  }, []);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const useStyles = makeStyles((theme) => ({
   
    root: {},
    ul: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      padding: 0,
      margin: 0,
      listStyle: "none",
      color: "#ddd",
    },
  }));

  const classes = useStyles();
  const [page, setPage] = useState(1);
  const handleChange = (e, value) => {
    setPage(value);
    setPaginated(movies.slice(page * 6, page * 6 + 6));
  };
  
  return (
    <div className="movie">
      <div className="movie-container">
        <h1>Your Collections</h1>
        <Pagination
          className={classes.ul}
          count={
            movies.length % 6 === 0
              ? Math.floor(movies.length / 6)
              : Math.floor(movies.length / 6) + 1
          }
          defaultPage={1}
          defaultValue={1}
          shape="rounded"
          variant="outlined"
          color="primary"
          page={page}
          onChange={(e, value) => handleChange(e, value)}
        />
        <div className="movie-contents">
          {paginated.length === 0 ? (
            <>
              {movies.slice(0, 6).map((movie) => {
                return (
                  <div
                    style={{
                      position: "relative",
                    }}
                    id="movie-data"
                    key={movie._id}
                    className="movie-content"
                  >
                    <ReactPlayer
                      ref={videoRef}
                      url={movie.movieUrl}
                      playing={true}
                      controls={true}
                      light={movie.thumbnailUrl.filePath}
                      volume={0.5}
                      muted={false}
                      playIcon={
                        <IconButton className="play-button">
                          <PlayCircleFilledIcon />
                        </IconButton>
                      }
                    />
                    {}
                    <h3>{movie.name}</h3>
                    <p>
                      <span>{movie.language}</span> |
                      <span>
                        {" "}
                        {movie.yearReleased}
                        <br />
                        <span
                          style={{
                            color: "#666",
                            fontSize: "small",
                          }}
                        >
                          <i>Uploaded on </i>
                          {new Date(movie.uploaded).getDate() +
                            " " +
                            months[new Date(movie.uploaded).getMonth()] +
                            " " +
                            new Date(movie.uploaded).getFullYear()}{" "}
                          at {new Date(movie.uploaded).getHours()} :{" "}
                          {new Date(movie.uploaded).getMinutes()} hrs
                        </span>
                      </span>
                    </p>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {paginated.map((movie) => (
                <div
                  style={{
                    position: "relative",
                  }}
                  id="movie-data"
                  key={movie._id}
                  className="movie-content"
                >
                  <ReactPlayer
                    ref={videoRef}
                    url={movie.movieUrl}
                    playing={true}
                    controls={true}
                    light={movie.thumbnailUrl.filePath}
                    volume={0.5}
                    muted={false}
                    playIcon={
                      <IconButton className="play-button">
                        <PlayCircleFilledIcon />
                      </IconButton>
                    }
                  />
                  {}
                  <h3>{movie.name}</h3>
                  <p>
                    <span>{movie.language}</span> |
                    <span>
                      {" "}
                      {movie.yearReleased}
                      <br />
                      <span
                        style={{
                          color: "#666",
                          fontSize: "small",
                        }}
                      >
                        <i>Uploaded on </i>
                        {new Date(movie.uploaded).getDate() +
                          " " +
                          months[new Date(movie.uploaded).getMonth()] +
                          " " +
                          new Date(movie.uploaded).getFullYear()}{" "}
                        at {new Date(movie.uploaded).getHours()} :{" "}
                        {new Date(movie.uploaded).getMinutes()} hrs
                      </span>
                    </span>
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDB;
