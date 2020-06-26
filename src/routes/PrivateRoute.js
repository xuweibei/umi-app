import router from 'umi/router';


export default ({ children, match, route }) => {
    alert(1)
    if (!localStorage.username && match.path !== '/login') {
        router.push('/login')
    }
    return children
}