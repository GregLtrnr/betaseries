export default function Logout(){
    localStorage.removeItem('token');
    window.location.href = 'http://localhost:3000/';
    return(
        <div>
            <h1>Logout</h1>
        </div>
    )
}