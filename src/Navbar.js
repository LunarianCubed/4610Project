export default function NavBar(){
    return( <nav className="nav">
        <a href = "/" className="Home">🌕^3</a>
        <ul>
            <CustomLink href="/articleList">Article List</CustomLink>
            <CustomLink href="/tags">Tags</CustomLink>
            <CustomLink href="/search">Search</CustomLink>
            <CustomLink href="/comments">Comments</CustomLink>
            <CustomLink href="/login">Login</CustomLink>
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