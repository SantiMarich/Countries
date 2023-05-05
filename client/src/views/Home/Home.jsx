import Container from "../../components/Container/Container";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountries } from "../../redux/actions";

const Home = () => {

const dispatch = useDispatch();

    useEffect(()=>{
dispatch(getCountries())
    },[dispatch])

    return(
        <>
        <h1>Este es el Home</h1>
        <Container/>
        </>
    )
};

export default Home;