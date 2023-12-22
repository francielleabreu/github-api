import React, { useState, useEffect } from 'react';
import './GitHub.css';
import axios from 'axios';

const GitHub = () => {
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);

    const loadDefaultUser = async () => {
        console.log(process.env)
        try {
            const clientId = process.env.REACT_APP_CLIENT_ID;
            const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
            const userLogin = process.env.REACT_APP_USER_LOGIN;
            const apiUrl = `https://api.github.com/users/${userLogin}?client_id=${clientId}&client_secret=${clientSecret}&sort=created`;
            const response = await axios.get(apiUrl);
            setUser(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const loadRepo = async () => {
        try {
            const clientId = process.env.REACT_APP_CLIENT_ID;
            const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
            const userLogin = process.env.REACT_APP_USER_LOGIN;
            const apiUrl = `https://api.github.com/users/${userLogin}/repos?client_id=${clientId}&client_secret=${clientSecret}&sort=created`;
            const response = await axios.get(apiUrl);
            setRepos(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        loadDefaultUser();
        loadRepo();
    }, []);


    return (
        <div>
            <div className="github-profile">
                <img src={user.avatar_url} alt="Avatar" />
                <div className="userInfo">
                    <p><strong>{`Fullname:`}</strong> {user.name}</p>
                    <p><strong>{`Username:`}</strong> {user.login}</p>
                    <p><strong>{`Location:`}</strong> {user.location}</p>
                    <p><strong>{`E-mail:`}</strong> {user.email}</p>
                    <p>
                        <strong>{`GitHub:`}</strong> <a href={user.html_url}>{user.html_url}</a>
                    </p>
                </div>
            </div>
            <hr />
            <div className="github-repos">
                <h3>User Repositories:</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name:</th>
                            <th>Description:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repos.map(repo => (
                            <tr key={repo.id}>
                                <td>
                                    <a href={repo.html_url}>
                                        {repo.name}
                                    </a>
                                </td>
                                <td>{repo.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GitHub;