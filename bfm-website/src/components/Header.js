
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiService from '../services/api';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoading: true,
            error: null,
        };
    }

    componentDidMount() {
        apiService
            .get('')
            .then((response) => {
                console.log(response.data.navbar); 
                this.setState({ data: response.data.navbar, isLoading: false });
            })
            .catch((error) => {
                this.setState({ error, isLoading: false });
            });
    }

    render() {
        const { data, isLoading, error } = this.state;
        console.log("data", data)
        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        return (
            <nav className="navbar navbar-light bg-black">
                <div className="container-fluid">
                    {data.map((item, index) => (
                        <a
                            key={index}
                            className="navbar-brand"
                            href={item.home?.url || item.live_stream?.button_url} 
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {item.live_stream?.button ? ( 
                                <button
                                    className="btnYellow" 
                                    type="button"
                                >
                                    {item.home?.icon ? (
                                        <img
                                            src={item.home.icon}
                                            alt=""
                                            width="108"
                                            height="48"
                                            className="d-inline-block align-text-top"
                                        />
                                    ) : (
                                        item.live_stream.button
                                    )}
                                </button>
                            ) : (
                                <img
                                    src={item.home?.icon || item.live_stream?.icon} 
                                    alt=""
                                    width="108"
                                    height="48"
                                    className="d-inline-block align-text-top"
                                />
                            )}
                        </a>
                    ))}
                </div>
            </nav>
        );

    }
}

export default Header;
