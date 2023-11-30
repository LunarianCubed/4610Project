import "./App.css";
export default function NavBar(){
    return( <nav className="nav">
        <a href = "/" className="Home">Tiger Tutors</a>
        <ul>
            <CustomLink href="/Article List">Article List</CustomLink>
            <CustomLink href="/Tags">Tags</CustomLink>
            <CustomLink href="/Search">Search</CustomLink>
            <CustomLink href="/Comments">Comments</CustomLink>
            <CustomLink href="/Login">Login</CustomLink>
        </ul>
    </nav>
    )
}

function CustomLink({href, children, ...props}){
    const path = window.location.pathname
    return(
        <li className = {path === href ? "active" : ""}>
            <a href={href} {...props}>
                {children}</a>
        </li>
    )

}