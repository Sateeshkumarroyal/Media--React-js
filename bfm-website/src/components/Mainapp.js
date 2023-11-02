import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiService from '../services/api';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
//assets Import
import TweetImg from '../../src/imagetweet.png';
import MPhone from '../../src/Microphone.png';

class MainApp extends React.Component {
    constructor(props) {
        super(props);

        // State properties here
        this.state = {
            data: {},
            isLoading: true,
            error: null,
            newsData: {},
            latestBFM: {},
            bfmPodcast: {},
            trending: {},
            trendingDetails: {},
            currentIndex: 0,
            cardsPerPage: 4, // Number of cards to display per page
            isPlaying: false,
            currentlyPlayingAudio: null,
        };
    }



    // Component methods here
    // Function to handle next button click
    handleNextClick = () => {
        const { currentIndex, cardsPerPage, bfmPodcast } = this.state;
        const totalCards = bfmPodcast.length;
        const nextIndex = currentIndex + cardsPerPage;
        const endIndex = Math.min(nextIndex, totalCards);
        let newStartIndex = currentIndex;

        // If there are more than 2 new cards to display, shift the start index
        if (endIndex - currentIndex > 2) {
            newStartIndex = endIndex - 2;
        }

        this.setState({ currentIndex: newStartIndex });
    };

    // Function to handle previous button click
    handlePrevClick = () => {
        const { currentIndex, cardsPerPage } = this.state;
        let newStartIndex = currentIndex - cardsPerPage;

        // Ensure the new start index doesn't go below zero
        newStartIndex = Math.max(newStartIndex, 0);

        this.setState({ currentIndex: newStartIndex });

    };

    handlePlayClick = (index) => {
        const { currentlyPlayingAudio } = this.state;
        const audio = document.getElementById(`audio-${index}`);

        // If there's a currently playing audio and its the same as the clicked index, pause it
        if (currentlyPlayingAudio && currentlyPlayingAudio === audio) {
            currentlyPlayingAudio.pause();
            this.setState({ currentlyPlayingAudio: null });
        } else {
            // If there's a currently playing audio, pause it
            if (currentlyPlayingAudio) {
                currentlyPlayingAudio.pause();
            }

            // Toggle play and pause based on the current state
            if (audio) {
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
                this.setState({ currentlyPlayingAudio: audio });
            }
        }
    };


    handleCardClick = (index) => {
        const { bfmPodcast } = this.state;
        const podcast = bfmPodcast[index];

        // Check if the podcast has a web link type
        if (podcast.assets[2].content_link.type === 'web_link') {
            const url = podcast.assets[2].content_link.url;

            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer';

            anchor.click();
        }
    };


    handleInstaTrending = (index) => {
        const { trending } = this.state;
        const trendingUrl = trending[index];



        const url = trendingUrl.url;

        // Create an anchor element
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';

        anchor.click();

    };




    componentDidMount() {
        apiService
            .get('')
            .then((response) => {
                console.log("trendingDetails", response.data.socmed_section[0]); // Log the response to check its structure
                this.setState({ data: response.data.hero[0].content, isLoading: false, newsData: response.data.hero[0], latestBFM: response.data.latest[0], bfmPodcast: response.data.latest[0].podcasts, trending: response.data.socmed_section[0].posts, trendingDetails: response.data.socmed_section[0] });
            })
            .catch((error) => {
                this.setState({ error, isLoading: false });
            });
    }



    render() {

        // Destructure state properties

        const { data, newsData, latestBFM, bfmPodcast, trending, trendingDetails, currentIndex, cardsPerPage } = this.state;
        if (!data || !data.images || data.images.length === 0) {
            return null;
        }

        // Chunk the images into groups of 4 for each carousel slide
        const startIndex = currentIndex;
        const endIndex = Math.min(currentIndex + cardsPerPage, bfmPodcast.length);

        // Calculate totalCards based on the length of bfmPodcast
        const totalCards = bfmPodcast.length;



        // JSX rendering here
        return (
            <div className="container">

                {/* Top New And Breaking news */}

                <div className="row mb-4">
                    {data.images.map((image, index) => (
                        <div className="col-md-8 col-12 mb-3 position-relative" key={index}>
                            <div className='newsTitle'>{newsData.title}</div>
                            <img
                                onClick={() => this.handleCardClick(1)}
                                src={image.sources[0].url} 
                                alt={image.title}
                                width="108"
                                height="48"
                                className="img-fluid d-inline-block align-text-top custom-image image-container"
                            />
                            <div className="audio-controls">
                                <img
                                    // src="/assets/Microphone Icon.png" 
                                    src={MPhone}
                                    alt="Play"
                                    className="play-button"
                                    onClick={() => this.handlePlayClick(1)} 
                                />
                                <audio
                                    id={`audio-${index}`}
                                    controls
                                    style={{ display: 'none' }} 
                                >
                                    <source src={data.assets[0].content_link.url} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                                <span className="overlay-text">{data.title}</span>
                            </div>
                        </div>
                    ))}
                    <div className="col-md-4 col-12">
                        <div className='newsTitle'>Breaking News</div>
                        <div className="image-container align-text-top">
                            <TwitterTweetEmbed
                                tweetId="1593512195081785344" 
                            />
                        </div>
                    </div>
                </div>

                {/* Latest news with Podcast audio Controls & slider cursuoel & cards  */}


                <div className="row mb-4 latestContainer">
                    <div className="col-12">
                        <div className='newsTitle'>{latestBFM.title}</div>
                        <div className="row mb-4">
                            {bfmPodcast.slice(startIndex, endIndex).map((podcast, index) => (
                                <div className={`col-md-3 col-lg-3 col-sm-3 ${index === 0 ? 'first-card' : index === 3 ? 'fourth-card' : ''}`} key={index}>
                                    <div className="card">
                                        {/* Previous button for the first card */}
                                        {index === 0 && (
                                            <button className="prev-button" onClick={this.handlePrevClick} disabled={startIndex === 0}>
                                                <FontAwesomeIcon icon={faChevronLeft} className="fa-2x" />
                                            </button>
                                        )}

                                        {/* Next button for the fourth card */}
                                        {index === 3 && (
                                            <button className="next-button" onClick={this.handleNextClick} disabled={endIndex >= totalCards}>
                                                <FontAwesomeIcon icon={faChevronRight} className="fa-2x" />
                                            </button>
                                        )}
                                        <img onClick={() => this.handleCardClick(index)}
                                            src={podcast.images[0].sources[1].url}
                                            alt={podcast.title}
                                            width="108"
                                            height="48"
                                            className="img-fluid d-inline-block card-img-top with-left-border"
                                        />
                                        <div className="card-body">
                                            <div className="audio-controls">
                                                <img
                                                    src={MPhone}
                                                    alt="Play"
                                                    className="play-button"
                                                    onClick={() => this.handlePlayClick(index)} 
                                                />
                                                <audio
                                                    id={`audio-${index}`}
                                                    controls
                                                    style={{ display: 'none' }} 
                                                >
                                                    <source src={podcast.assets[0].content_link.url} type="audio/mpeg" />
                                                    Your browser does not support the audio element.
                                                </audio>
                                                <span className='insideText'>Inside Story - 20 Oct 2022 - 1h listen</span>
                                            </div>
                                            <h5 className="card-title">{podcast.title}</h5>
                                            <p className="card-text">{podcast.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="d-flex justify-content-center mb-4">
                        <a
                            className="navbar-brand"
                            href={latestBFM.button_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {latestBFM.button ? (
                                <button className="btnYellow" type="button">
                                    {latestBFM.button}
                                </button>
                            ) : (
                                latestBFM.button
                            )}
                        </a>
                    </div>
                </div>

                {/* Trending News */}

                <div className="row trendingContainer mt-4">
                    <div className="col-12">
                        <div className='newsTitle'>Trending on Social Media</div>

                        <div className="row mb-3">
                            {trending.map((image, index) => (
                                <div className="col-md-3 col-lg-3 col-sm-3" key={index}>
                                    <img onClick={() => this.handleInstaTrending(index)}
                                        // src="/assets/imagetweet.png" 
                                        src={TweetImg}
                                        alt="instagram"
                                        width="108"
                                        height="48"
                                        className="img-fluid d-inline-block align-text-top trending-image image-container"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="d-flex justify-content-center mb-4">
                            <a
                                className="navbar-brand"
                                href={trendingDetails.button_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {trendingDetails.button ? (
                                    <button className="btnYellowInsta" type="button">
                                        View on Instagram
                                    </button>
                                ) : (
                                    trendingDetails.button
                                )}
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        );

    }
}
export default MainApp;
