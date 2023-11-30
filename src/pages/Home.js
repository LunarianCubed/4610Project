import './Home.css';
import React from 'react';
import './alignPages.css';
import Cube from './Cube.js';

export default function Home(){
    const L =`
    LLLLLLLLLLL                                                                                     iiii                                            ^^^        333333333333333b
    L:::::::::L                                                                                    i::::i                                          ^:::^      3:::::::::::::::33
    L:::::::::L                                                                                     iiii                                          ^:::::^     3::::::33333::::::3
    LL:::::::LL                                                                                                                                  ^:::::::^    3333333     3:::::3
    L:::::L               uuuuuu    uuuuuunnnn  nnnnnnnn      aaaaaaaaaaaaa  rrrrr   rrrrrrrrr  iiiiiii   aaaaaaaaaaaaa  nnnn  nnnnnnnn       ^:::::::::^               3:::::3
    L:::::L               u::::u    u::::un:::nn::::::::nn    a::::::::::::a r::::rrr:::::::::r i:::::i   a::::::::::::a n:::nn::::::::nn    ^:::::^:::::^              3:::::3
    L:::::L               u::::u    u::::un::::::::::::::nn   aaaaaaaaa:::::ar:::::::::::::::::r i::::i   aaaaaaaaa:::::an::::::::::::::nn  ^:::::^ ^:::::^     33333333:::::3
    L:::::L               u::::u    u::::unn:::::::::::::::n           a::::arr::::::rrrrr::::::ri::::i            a::::ann:::::::::::::::n^^^^^^^   ^^^^^^^    3:::::::::::3
    L:::::L               u::::u    u::::u  n:::::nnnn:::::n    aaaaaaa:::::a r:::::r     r:::::ri::::i     aaaaaaa:::::a  n:::::nnnn:::::n                     33333333:::::3
    L:::::L               u::::u    u::::u  n::::n    n::::n  aa::::::::::::a r:::::r     rrrrrrri::::i   aa::::::::::::a  n::::n    n::::n                             3:::::3
    L:::::L               u::::u    u::::u  n::::n    n::::n a::::aaaa::::::a r:::::r            i::::i  a::::aaaa::::::a  n::::n    n::::n                             3:::::3
    L:::::L         LLLLLLu:::::uuuu:::::u  n::::n    n::::na::::a    a:::::a r:::::r            i::::i a::::a    a:::::a  n::::n    n::::n                             3:::::3
    LL:::::::LLLLLLLLL:::::Lu:::::::::::::::uun::::n    n::::na::::a    a:::::a r:::::r           i::::::ia::::a    a:::::a  n::::n    n::::n                 3333333     3:::::3
    L::::::::::::::::::::::L u:::::::::::::::un::::n    n::::na:::::aaaa::::::a r:::::r           i::::::ia:::::aaaa::::::a  n::::n    n::::n                 3::::::33333::::::3
    L::::::::::::::::::::::L  uu::::::::uu:::un::::n    n::::n a::::::::::aa:::ar:::::r           i::::::i a::::::::::aa:::a n::::n    n::::n                 3:::::::::::::::33
    LLLLLLLLLLLLLLLLLLLLLLLL    uuuuuuuu  uuuunnnnnn    nnnnnn  aaaaaaaaaa  aaaarrrrrrr           iiiiiiii  aaaaaaaaaa  aaaa nnnnnn    nnnnnn                  333333333333333
    `

    return (
        <div className = "Home">
            <div>
                <pre>
                <React.Fragment>{L}</React.Fragment>
                <Cube />
                </pre>
            </div>
        </div>
    )
}

