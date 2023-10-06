import { InfinitySpin } from 'react-loader-spinner';
import css from "./loader.module.css";

export default function Loader() {
    return <div className={css.container}>
        <InfinitySpin 
        width='200'
        color="#ffd52d"
/></div>
}