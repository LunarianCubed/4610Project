import './Home.css';
import React from 'react';
import './alignPages.css';
import Cube from './Cube.js';

export default function NotFound(){
    const L =`
            　　,-､　　　　　　　 　　,.-､
　　　　　　　 ./:::::＼　　　　　 　 ／::::ヽ
　　　　　　　/::::::::;ゝ--──-- ､._/:::::::::|
　　　　　　 /,.-‐''"´ 　　　　　　　　 ＼::::|
　　　　　／　 　　　　　　　　　　　　ヽ､::|
　　　　/　　　　●　　　 　 　 　 　 　 　 ヽ|
　　 　 l　　　､､､　　 　 　 　 　 　 ●　　 　 l
　　　 .|　　　 　　　　(_人__丿　　　､､､　　|
　 　 　l　　　　　　　　　　　　　　　　 　 l
　　　　\` ､　　　　　　　　 　 　 　　 　 　 /
　　　　　　\`ｰ ､__　　　 　 　 　　　 　／
　　　　　　　　　/\`'''ｰ‐‐──‐‐‐┬--- ／
    `

    return (
        <div className = "Home">
            <h1>404: The page you are looking for doesn't exist</h1>
            <div>
                <pre>
                <React.Fragment>{L}</React.Fragment>
                </pre>
                {/*<Cube />*/}
            </div>
        </div>
    )
}



